import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  GetQueueUrlCommand,
  Message,
} from '@aws-sdk/client-sqs';
import { IQueueService, QueueJobOptions, QueueJob } from './queue.interface';

/**
 * SQS Queue Service
 * Implementation of queue service using Amazon SQS
 * Works with both LocalStack (development) and AWS SQS (production)
 */
@Injectable()
export class SqsQueueService implements IQueueService, OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SqsQueueService.name);
  private readonly sqsClient: SQSClient;
  private queueUrl: string;
  private readonly queueName: string;
  private pollingInterval: NodeJS.Timeout | null = null;
  private isPolling = false;
  private readonly processors = new Map<
    string,
    (job: QueueJob<any>) => Promise<void>
  >();

  constructor(queueName: string) {
    this.queueName = queueName;

    // Configure SQS client for LocalStack (dev) or AWS (prod)
    const endpoint = process.env.AWS_ENDPOINT;

    this.sqsClient = new SQSClient({
      region: process.env.AWS_REGION || 'us-east-1',
      ...(endpoint && {
        endpoint,
        credentials: {
          accessKeyId: 'test',
          secretAccessKey: 'test',
        },
      }),
    });
  }

  async onModuleInit() {
    try {
      // Get queue URL
      const command = new GetQueueUrlCommand({ QueueName: this.queueName });
      const response = await this.sqsClient.send(command);
      this.queueUrl = response.QueueUrl!;

      this.logger.log(
        `SQS Queue initialized: ${this.queueName} (${this.queueUrl})`,
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Failed to initialize SQS queue ${this.queueName}: ${errorMessage}`,
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    // Stop polling
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this.isPolling = false;
    this.logger.log(`SQS Queue ${this.queueName} polling stopped`);
  }

  /**
   * Add a job to the SQS queue
   */
  async add<T>(
    jobName: string,
    data: T,
    options: QueueJobOptions = {},
  ): Promise<void> {
    try {
      const messageBody = JSON.stringify({
        jobName,
        data,
        options,
        timestamp: new Date().toISOString(),
      });

      const command = new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: messageBody,
        DelaySeconds: options.delay ? Math.floor(options.delay / 1000) : 0,
        MessageAttributes: {
          jobName: {
            DataType: 'String',
            StringValue: jobName,
          },
          attempts: {
            DataType: 'Number',
            StringValue: String(options.attempts || 3),
          },
        },
      });

      await this.sqsClient.send(command);

      this.logger.debug(`Job ${jobName} added to queue ${this.queueName}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to add job ${jobName} to queue ${this.queueName}: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  /**
   * Register a processor for a specific job type
   * Starts polling if not already polling
   */
  process<T>(
    jobName: string,
    handler: (job: QueueJob<T>) => Promise<void>,
  ): void {
    this.processors.set(jobName, handler);
    this.logger.log(`Registered processor for job type: ${jobName}`);

    // Start polling if not already started
    if (!this.isPolling) {
      this.startPolling();
    }
  }

  /**
   * Start polling SQS for messages
   */
  private startPolling(): void {
    if (this.isPolling) {
      return;
    }

    this.isPolling = true;
    this.logger.log(`Started polling queue: ${this.queueName}`);

    // Poll every 5 seconds (adjustable)
    this.pollingInterval = setInterval(() => {
      this.pollMessages();
    }, 5000);

    // Also poll immediately
    this.pollMessages();
  }

  /**
   * Poll messages from SQS
   */
  private async pollMessages(): Promise<void> {
    try {
      const command = new ReceiveMessageCommand({
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: 10, // Process up to 10 messages at once
        WaitTimeSeconds: 20, // Long polling
        MessageAttributeNames: ['All'],
        MessageSystemAttributeNames: ['All'], // Get message attributes like ApproximateReceiveCount
      });

      const response = await this.sqsClient.send(command);

      if (!response.Messages || response.Messages.length === 0) {
        return;
      }

      // Process messages in parallel
      await Promise.all(
        response.Messages.map((message) => this.processMessage(message)),
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to poll messages: ${errorMessage}`);
    }
  }

  /**
   * Process a single SQS message
   */
  private async processMessage(message: Message): Promise<void> {
    try {
      if (!message.Body) {
        this.logger.warn('Received message without body');
        return;
      }

      const parsedMessage = JSON.parse(message.Body);
      const { jobName, data, options } = parsedMessage;

      // Find processor for this job type
      const processor = this.processors.get(jobName);
      if (!processor) {
        this.logger.warn(`No processor registered for job type: ${jobName}`);
        // Delete message to avoid reprocessing
        await this.deleteMessage(message);
        return;
      }

      // Get attempt count
      const attemptsMade = message.Attributes
        ? parseInt(message.Attributes.ApproximateReceiveCount || '1', 10)
        : 1;

      // Create job object
      const job: QueueJob = {
        id: message.MessageId || 'unknown',
        data,
        attemptsMade,
      };

      this.logger.debug(
        `Processing job ${jobName} (attempt ${attemptsMade}/${options.attempts || 3})`,
      );

      // Execute processor
      await processor(job);

      // Delete message on success
      await this.deleteMessage(message);

      this.logger.debug(`Job ${jobName} completed successfully`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Failed to process message: ${errorMessage}`,
        errorStack,
      );

      // Check if we should retry
      const parsedMessage = JSON.parse(message.Body!);
      const { options } = parsedMessage;
      const attemptsMade = message.Attributes
        ? parseInt(message.Attributes.ApproximateReceiveCount || '1', 10)
        : 1;

      const maxAttempts = options?.attempts || 3;

      if (attemptsMade >= maxAttempts) {
        this.logger.error(
          `Job failed after ${attemptsMade} attempts, moving to DLQ`,
        );
        // SQS will automatically move to DLQ if configured
        await this.deleteMessage(message);
      } else {
        // Message will become visible again after visibility timeout
        // SQS handles exponential backoff via visibility timeout
        this.logger.warn(
          `Job failed (attempt ${attemptsMade}/${maxAttempts}), will retry`,
        );
      }
    }
  }

  /**
   * Delete message from queue
   */
  private async deleteMessage(message: Message): Promise<void> {
    if (!message.ReceiptHandle) {
      return;
    }

    try {
      const command = new DeleteMessageCommand({
        QueueUrl: this.queueUrl,
        ReceiptHandle: message.ReceiptHandle,
      });

      await this.sqsClient.send(command);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to delete message: ${errorMessage}`);
    }
  }

  /**
   * Get queue URL
   */
  getQueueUrl(): string {
    return this.queueUrl;
  }
}
