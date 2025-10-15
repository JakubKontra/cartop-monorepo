import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { IQueueService, QueueJob } from '../common/queue/queue.interface';
import { EmailService } from './email/email.service';
import { SendEmailJobData } from './notification.service';

/**
 * Notification Queue Processor
 * Handles async processing of notification jobs (emails, etc.)
 */
@Injectable()
export class NotificationProcessor implements OnModuleInit {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(
    @Inject('QUEUE_NOTIFICATIONS')
    private readonly notificationQueue: IQueueService,
    private readonly emailService: EmailService,
  ) {}

  onModuleInit() {
    // Register processor for send-email jobs
    this.notificationQueue.process<SendEmailJobData>(
      'send-email',
      this.handleSendEmail.bind(this),
    );
  }

  async handleSendEmail(job: QueueJob<SendEmailJobData>) {
    const { to, subject, template, data, userId, replyTo } = job.data;

    try {
      this.logger.debug(
        `Processing email job ${job.id}: ${template} to ${to}`,
      );

      await this.emailService.sendEmail({
        to,
        subject,
        template,
        data,
        userId,
        replyTo,
      });

      this.logger.log(
        `Email job ${job.id} completed: ${template} to ${to}`,
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Email job ${job.id} failed: ${errorMessage}`,
        errorStack,
      );
      throw error; // Re-throw to trigger retry
    }
  }
}
