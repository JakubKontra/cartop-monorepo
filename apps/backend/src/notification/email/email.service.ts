import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { render } from '@react-email/render';
import { IEmailProvider } from './providers/email-provider.interface';
import { NotificationLog } from '../entities/notification-log.entity';
import { EmailSendParams } from './providers/email-provider.interface';
import { JSX } from 'react';
// Use dynamic import to support ESM package from CommonJS context
type EmailTemplatesModule = typeof import('@cartop/email-templates');

export interface EmailTemplateData {
  [key: string]: unknown;
}

// Template name mapping from kebab-case to component names
const TEMPLATE_MAP: Record<string, keyof EmailTemplatesModule> = {
  'account-verify': 'AccountVerifyTemplate',
  'change-password': 'ChangePasswordTemplate',
  'contact-confirmation': 'ContactConfirmationTemplate',
  'contact-inquiry': 'ContactInquiryTemplate',
  'document-incomplete': 'DocumentIncompleteTemplate',
  'documents-complete': 'DocumentsCompleteTemplate',
  'forgotten-password': 'LostPasswordTemplate',
  'password-reset': 'LostPasswordTemplate', // Alias for compatibility
  'password-success': 'PasswordSuccessTemplate',
  'reminder-missing-docs': 'ReminderMissingDocsTemplate',
  'required-documents': 'RequiredDocumentsTemplate',
  'single-leasing': 'SingleLeasingTemplate',
  'multiple-leasing': 'MultipleLeasingTemplate',
};

/**
 * Email Service
 * Handles email template rendering and sending through configured provider
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private emailTemplatesModule: EmailTemplatesModule | null = null;

  constructor(
    @Inject('EMAIL_PROVIDER')
    private readonly emailProvider: IEmailProvider,
    @InjectRepository(NotificationLog)
    private readonly notificationLogRepo: Repository<NotificationLog>,
  ) {}

  /**
   * Render a React Email template to HTML
   */
  private async renderTemplate(templateName: string, data: EmailTemplateData): Promise<string> {
    try {
      // Get template component name from mapping
      const componentName = TEMPLATE_MAP[templateName];

      if (!componentName) {
        throw new Error(
          `Unknown template: ${templateName}. Available templates: ${Object.keys(TEMPLATE_MAP).join(', ')}`,
        );
      }

      // Load templates module lazily to handle ESM in CJS
      if (!this.emailTemplatesModule) {
        this.emailTemplatesModule = await import('@cartop/email-templates');
      }

      // Get the template component
      const TemplateComponent = this.emailTemplatesModule[
        componentName as keyof EmailTemplatesModule
      ] as unknown as (props: unknown) => JSX.Element;

      if (!TemplateComponent) {
        throw new Error(
          `Template component ${String(componentName)} not found in @app/emails package`,
        );
      }

      // Render React component to HTML
      const html = await render(TemplateComponent(data));
      return html;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to render template ${templateName}: ${errorMessage}`, errorStack);
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

      const result = await this.emailProvider.send(emailParams);
      messageId = result.messageId;
      success = true;

      this.logger.log(`Email sent: ${params.template} to ${params.to} (${result.messageId})`);
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to send email: ${params.template} to ${params.to}`, errorStack);
      throw error;
    } finally {
      // Log the attempt (success or failure)
      await this.logEmail({
        recipient: Array.isArray(params.to) ? params.to[0] : params.to,
        userId: params.userId,
        template: params.template,
        provider: this.emailProvider.getName(),
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
      this.logger.error(`Failed to log email notification: ${errorMessage}`, errorStack);
      // Don't throw - logging failure shouldn't fail the email send
    }
  }

  /**
   * Health check - verify email provider is configured
   */
  async healthCheck(): Promise<boolean> {
    return this.emailProvider.healthCheck();
  }
}
