import { Injectable, Logger } from '@nestjs/common';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import {
  IEmailProvider,
  EmailSendParams,
  EmailSendResult,
} from './email-provider.interface';

/**
 * Mailgun Email Provider
 * Handles email sending through Mailgun API
 *
 * Configuration required in .env:
 * - MAILGUN_API_KEY
 * - MAILGUN_DOMAIN
 * - EMAIL_FROM
 */
@Injectable()
export class MailgunProvider implements IEmailProvider {
  private readonly logger = new Logger(MailgunProvider.name);
  private client: any;
  private readonly domain: string;
  private readonly from: string;

  constructor() {
    const apiKey = process.env.MAILGUN_API_KEY || '';
    this.domain = process.env.MAILGUN_DOMAIN || '';
    this.from = process.env.EMAIL_FROM || 'noreply@example.com';

    if (!apiKey || !this.domain) {
      this.logger.warn(
        'Mailgun not configured. Please set MAILGUN_API_KEY and MAILGUN_DOMAIN in .env',
      );
      return;
    }

    const mailgun = new Mailgun(FormData);
    this.client = mailgun.client({
      username: 'api',
      key: apiKey,
    });

    this.logger.log(`Mailgun provider initialized for domain: ${this.domain}`);
  }

  async send(params: EmailSendParams): Promise<EmailSendResult> {
    if (!this.client) {
      throw new Error('Mailgun client not initialized. Check API configuration.');
    }

    try {
      const result = await this.client.messages.create(this.domain, {
        from: this.from,
        to: Array.isArray(params.to) ? params.to : [params.to],
        subject: params.subject,
        html: params.html,
        text: params.text,
        'h:Reply-To': params.replyTo,
        'o:tracking': 'yes',           // Enable open/click tracking
        'o:tracking-clicks': 'yes',
        'o:tracking-opens': 'yes',
      });

      this.logger.log(`Email sent via Mailgun: ${result.id}`);

      return {
        messageId: result.id,
        provider: 'mailgun',
      };
    } catch (error) {
      this.logger.error(
        `Failed to send email via Mailgun: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  getName(): string {
    return 'mailgun';
  }

  async healthCheck(): Promise<boolean> {
    try {
      return !!(process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN);
    } catch {
      return false;
    }
  }
}
