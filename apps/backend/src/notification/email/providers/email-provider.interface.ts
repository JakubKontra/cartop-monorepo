/**
 * Email Provider Interface
 * Abstraction layer for email service providers (Mailgun, AWS SES, etc.)
 */

export interface EmailSendParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  metadata?: Record<string, any>;
}

export interface EmailSendResult {
  messageId: string;
  provider: string;
}

export interface IEmailProvider {
  /**
   * Send an email
   */
  send(params: EmailSendParams): Promise<EmailSendResult>;

  /**
   * Get provider name
   */
  getName(): string;

  /**
   * Check if provider is healthy and configured
   */
  healthCheck(): Promise<boolean>;
}
