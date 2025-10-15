import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { IQueueService, QueueJob } from '../common/queue/queue.interface';
import { WebhookService } from './webhook.service';
import { WatchConfig, WebhookPayload } from '../common/interfaces/watch.interface';

interface WebhookJobData {
  config: WatchConfig;
  payload: WebhookPayload;
}

/**
 * Webhook Queue Processor
 * Handles async processing of webhook HTTP requests
 */
@Injectable()
export class WebhookProcessor implements OnModuleInit {
  private readonly logger = new Logger(WebhookProcessor.name);

  constructor(
    @Inject('QUEUE_WEBHOOKS')
    private readonly webhookQueue: IQueueService,
    private readonly webhookService: WebhookService,
  ) {}

  onModuleInit() {
    // Register processor for send-webhook jobs
    this.webhookQueue.process<WebhookJobData>(
      'send-webhook',
      this.handleSendWebhook.bind(this),
    );
  }

  async handleSendWebhook(job: QueueJob<WebhookJobData>) {
    const { config, payload } = job.data;

    try {
      this.logger.debug(
        `Processing webhook job ${job.id}: ${config.name} for ${payload.entityName}`,
      );

      await this.webhookService.sendWebhook(config, payload);

      this.logger.log(
        `Webhook job ${job.id} completed: ${config.name}`,
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Webhook job ${job.id} failed: ${errorMessage}`,
        errorStack,
      );
      throw error; // Re-throw to trigger retry
    }
  }
}
