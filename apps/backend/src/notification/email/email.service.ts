import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { render } from '@react-email/render';
import { MailgunProvider } from './providers/mailgun.provider';
import { NotificationLog } from '../entities/notification-log.entity';
import { EmailSendParams } from './providers/email-provider.interface';

export interface EmailTemplateData {
  [key: string]: any;
}

/**
 * Email Service
 * Handles email template rendering and sending through configured provider
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly mailgunProvider: MailgunProvider,
    @InjectRepository(NotificationLog)
    private readonly notificationLogRepo: Repository<NotificationLog>,
  ) {}

  /**
   * Render a React Email template to HTML
   */
  private async renderTemplate(
    templateName: string,
    data: EmailTemplateData,
  ): Promise<string> {
    try {
      // Dynamic import of template based on name
      const templatePath = `./templates/${templateName}`;
      const templateModule = await import(templatePath);
      const TemplateComponent = templateModule.default;

      // Render React component to HTML
      const html = render(TemplateComponent(data));
      return html;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to render template ${templateName}: ${errorMessage}`,
        errorStack,
      );
      throw new Error(`Template rendering failed: ${templateName}`);
    }
  }

  /**
   * Send an email using the configured provider
   */
  async sendEmail(params: {
    to: string | string[];
    subject: string;
    template: string;
    data: EmailTemplateData;
    userId?: string;
    replyTo?: string;
  }): Promise<void> {
    let success = false;
    let messageId: string | undefined;
    let errorMessage: string | undefined;

    try {
      // Render template
      const html = await this.renderTemplate(params.template, params.data);

      // Send via provider
      const emailParams: EmailSendParams = {
        to: params.to,
        subject: params.subject,
        html,
        replyTo: params.replyTo,
        metadata: {
          template: params.template,
          userId: params.userId,
        },
      };

      const result = await this.mailgunProvider.send(emailParams);
      messageId = result.messageId;
      success = true;

      this.logger.log(
        `Email sent: ${params.template} to ${params.to} (${result.messageId})`,
      );
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to send email: ${params.template} to ${params.to}`,
        errorStack,
      );
      throw error;
    } finally {
      // Log the attempt (success or failure)
      await this.logEmail({
        recipient: Array.isArray(params.to) ? params.to[0] : params.to,
        userId: params.userId,
        template: params.template,
        provider: this.mailgunProvider.getName(),
        success,
        messageId,
        error: errorMessage,
        sentAt: new Date(),
      });
    }
  }

  /**
   * Log email send attempt to database
   */
  private async logEmail(log: {
    recipient: string;
    userId?: string;
    template: string;
    provider: string;
    success: boolean;
    messageId?: string;
    error?: string;
    sentAt: Date;
  }): Promise<void> {
    try {
      await this.notificationLogRepo.save({
        recipient: log.recipient,
        userId: log.userId,
        template: log.template,
        provider: log.provider,
        success: log.success,
        messageId: log.messageId,
        error: log.error,
        sentAt: log.sentAt,
        openCount: 0,
        clickCount: 0,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to log email notification: ${errorMessage}`,
        errorStack,
      );
      // Don't throw - logging failure shouldn't fail the email send
    }
  }

  /**
   * Health check - verify email provider is configured
   */
  async healthCheck(): Promise<boolean> {
    return this.mailgunProvider.healthCheck();
  }
}
