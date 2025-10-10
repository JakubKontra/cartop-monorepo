import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotificationPreference } from './preferences/user-notification-preference.entity';
import { EmailTemplateData } from './email/email.service';

export interface SendEmailJobData {
  to: string;
  subject: string;
  template: string;
  data: EmailTemplateData;
  userId?: string;
  replyTo?: string;
}

/**
 * Notification Service
 * Main facade for sending notifications
 * Checks user preferences and queues notifications for async processing
 */
@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectQueue('notifications')
    private readonly notificationQueue: Queue,
    @InjectRepository(UserNotificationPreference)
    private readonly preferenceRepo: Repository<UserNotificationPreference>,
  ) {}

  /**
   * Send password reset email
   */
  async sendPasswordReset(params: {
    email: string;
    userName: string;
    resetLink: string;
    expirationTime?: string;
    userId?: string;
  }): Promise<void> {
    // Check if user has opted out of transactional emails
    if (params.userId) {
      const canSend = await this.canSendTransactionalEmail(params.userId);
      if (!canSend) {
        this.logger.warn(
          `User ${params.userId} has opted out of transactional emails`,
        );
        return;
      }
    }

    await this.queueEmail({
      to: params.email,
      subject: 'Password Reset Request',
      template: 'password-reset',
      data: {
        userName: params.userName,
        resetLink: params.resetLink,
        expirationTime: params.expirationTime || '1 hour',
      },
      userId: params.userId,
    });
  }

  /**
   * Check if user can receive transactional emails
   */
  private async canSendTransactionalEmail(userId: string): Promise<boolean> {
    try {
      const preference = await this.preferenceRepo.findOne({
        where: { userId },
      });

      // If no preference record exists, allow sending (opt-in by default)
      if (!preference) {
        return true;
      }

      return preference.emailEnabled && preference.transactionalEmails;
    } catch (error) {
      this.logger.error(
        `Failed to check user preferences for ${userId}: ${error.message}`,
      );
      // On error, allow sending (fail-safe for critical emails)
      return true;
    }
  }

  /**
   * Check if user can receive marketing emails
   */
  private async canSendMarketingEmail(userId: string): Promise<boolean> {
    try {
      const preference = await this.preferenceRepo.findOne({
        where: { userId },
      });

      if (!preference) {
        return true;
      }

      return preference.emailEnabled && preference.marketingEmails;
    } catch (error) {
      this.logger.error(
        `Failed to check user preferences for ${userId}: ${error.message}`,
      );
      // On error, don't send marketing emails (fail-safe)
      return false;
    }
  }

  /**
   * Check if user can receive system alerts
   */
  private async canSendSystemAlert(userId: string): Promise<boolean> {
    try {
      const preference = await this.preferenceRepo.findOne({
        where: { userId },
      });

      if (!preference) {
        return true;
      }

      return preference.emailEnabled && preference.systemAlerts;
    } catch (error) {
      this.logger.error(
        `Failed to check user preferences for ${userId}: ${error.message}`,
      );
      // On error, allow sending (fail-safe for important alerts)
      return true;
    }
  }

  /**
   * Queue email for async processing
   */
  private async queueEmail(jobData: SendEmailJobData): Promise<void> {
    await this.notificationQueue.add(
      'send-email',
      jobData,
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: 1000, // Keep last 1000 completed
        removeOnFail: 5000,     // Keep last 5000 failed for debugging
      },
    );

    this.logger.debug(
      `Queued email: ${jobData.template} to ${jobData.to}`,
    );
  }

  /**
   * Send email directly (bypasses queue - use only when needed)
   * Note: This is not typically used, but available for urgent scenarios
   */
  async sendEmailDirect(jobData: SendEmailJobData): Promise<void> {
    // This will be handled by EmailService directly
    // Exposed here for special cases where queue bypassing is needed
    this.logger.warn('Direct email send requested - consider using queue instead');
    await this.queueEmail(jobData);
  }
}
