import { Injectable, Logger, Inject } from '@nestjs/common';
import { IQueueService } from '../common/queue/queue.interface';
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
    @Inject('QUEUE_NOTIFICATIONS')
    private readonly notificationQueue: IQueueService,
    @InjectRepository(UserNotificationPreference)
    private readonly preferenceRepo: Repository<UserNotificationPreference>,
  ) {}

  /**
   * Send password reset email (forgotten password)
   */
  async sendPasswordReset(params: {
    email: string;
    resetPasswordLink: string;
    operatingSystem?: string;
    browserName?: string;
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
      subject: 'Obnovení hesla k účtu Cartop.cz',
      template: 'forgotten-password',
      data: {
        resetPasswordLink: params.resetPasswordLink,
        operatingSystem: params.operatingSystem || 'Unknown',
        browserName: params.browserName || 'Unknown',
      },
      userId: params.userId,
    });
  }

  /**
   * Send account verification email
   */
  async sendAccountVerification(params: {
    email: string;
    loginLink: string;
    urlLink?: string;
    userId?: string;
  }): Promise<void> {
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
      subject: 'Ověření účtu Cartop.cz',
      template: 'account-verify',
      data: {
        loginLink: params.loginLink,
        urlLink: params.urlLink || params.loginLink,
      },
      userId: params.userId,
    });
  }

  /**
   * Send password success notification
   */
  async sendPasswordSuccess(params: {
    email: string;
    userId?: string;
  }): Promise<void> {
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
      subject: 'Heslo bylo úspěšně změněno',
      template: 'password-success',
      data: {},
      userId: params.userId,
    });
  }

  /**
   * Send contact inquiry notification to admin
   */
  async sendContactInquiry(params: {
    adminEmail: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    message: string;
    replyTo?: string;
  }): Promise<void> {
    await this.queueEmail({
      to: params.adminEmail,
      subject: `Nová poptávka od ${params.customerName}`,
      template: 'contact-inquiry',
      data: {
        customerName: params.customerName,
        customerEmail: params.customerEmail,
        customerPhone: params.customerPhone,
        message: params.message,
      },
      replyTo: params.replyTo || params.customerEmail,
    });
  }

  /**
   * Send contact confirmation to customer
   */
  async sendContactConfirmation(params: {
    email: string;
    userId?: string;
  }): Promise<void> {
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
      subject: 'Děkujeme za Vaši poptávku',
      template: 'contact-confirmation',
      data: {},
      userId: params.userId,
    });
  }

  /**
   * Send documents complete notification
   */
  async sendDocumentsComplete(params: {
    email: string;
    items?: string[];
    offerLink?: string;
    userId?: string;
  }): Promise<void> {
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
      subject: 'Podklady kompletní - Speciální nabídka',
      template: 'documents-complete',
      data: {
        items: params.items || [
          'zimní pneumatiky',
          'zvýhodněné balíčky při objednávce společně s vozem',
        ],
        offerLink: params.offerLink,
      },
      userId: params.userId,
    });
  }

  /**
   * Send document incomplete notification
   */
  async sendDocumentIncomplete(params: {
    email: string;
    saleRepresentativeName?: string;
    comment?: string;
    userId?: string;
  }): Promise<void> {
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
      subject: 'Neúplné podklady - Akce potřebná',
      template: 'document-incomplete',
      data: {
        saleRepresentativeName: params.saleRepresentativeName || 'Prodejní zástupce',
        comment: params.comment || 'Je potřeba doložit chybějící dokumenty.',
      },
      userId: params.userId,
    });
  }

  /**
   * Send required documents notification
   */
  async sendRequiredDocuments(params: {
    email: string;
    items?: string[];
    userId?: string;
  }): Promise<void> {
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
      subject: 'Potřebné dokumenty pro Vaši žádost',
      template: 'required-documents',
      data: {
        items: params.items || ['Občanský průkaz', 'Výpis z účtu'],
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Failed to check user preferences for ${userId}: ${errorMessage}`,
      );
      // On error, allow sending (fail-safe for critical emails)
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
