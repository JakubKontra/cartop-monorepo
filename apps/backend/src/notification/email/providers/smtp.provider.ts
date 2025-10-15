import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  IEmailProvider,
  EmailSendParams,
  EmailSendResult,
} from './email-provider.interface';

/**
 * SMTP Email Provider
 * Handles email sending through SMTP (used for Mailpit in development)
 *
 * Configuration required in .env:
 * - SMTP_HOST (e.g., localhost for Mailpit)
 * - SMTP_PORT (e.g., 1025 for Mailpit)
 * - EMAIL_FROM
 *
 * Optional:
 * - SMTP_USER
 * - SMTP_PASSWORD
 * - SMTP_SECURE (true/false)
 */
@Injectable()
export class SmtpProvider implements IEmailProvider {
  private readonly logger = new Logger(SmtpProvider.name);
  private transporter: nodemailer.Transporter | null = null;
  private readonly from: string;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 1025;
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASSWORD;
    const secure = process.env.SMTP_SECURE === 'true';
    this.from = process.env.EMAIL_FROM || 'noreply@example.com';

    if (!host) {
      this.logger.warn(
        'SMTP not configured. Please set SMTP_HOST in .env',
      );
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user && password ? { user, pass: password } : undefined,
      // For development with Mailpit, accept self-signed certificates
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.logger.log(`SMTP provider initialized for ${host}:${port}`);
  }

  async send(params: EmailSendParams): Promise<EmailSendResult> {
    if (!this.transporter) {
      throw new Error('SMTP transporter not initialized. Check SMTP configuration.');
    }

    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: Array.isArray(params.to) ? params.to.join(', ') : params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
        replyTo: params.replyTo,
        headers: params.metadata
          ? Object.entries(params.metadata).reduce(
              (acc, [key, value]) => {
                acc[`X-Metadata-${key}`] = String(value);
                return acc;
              },
              {} as Record<string, string>,
            )
          : undefined,
      });

      this.logger.log(`Email sent via SMTP: ${info.messageId}`);

      return {
        messageId: info.messageId,
        provider: 'smtp',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to send email via SMTP: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  getName(): string {
    return 'smtp';
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.transporter) {
        return false;
      }
      await this.transporter.verify();
      return true;
    } catch (error) {
      this.logger.error('SMTP health check failed', error);
      return false;
    }
  }
}
