import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EmailService } from './email/email.service';
import { SendEmailJobData } from './notification.service';

/**
 * Notification Queue Processor
 * Handles async processing of notification jobs (emails, etc.)
 */
@Processor('notifications')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(private readonly emailService: EmailService) {}

  @Process('send-email')
  async handleSendEmail(job: Job<SendEmailJobData>) {
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
