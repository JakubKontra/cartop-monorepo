import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from '../common/queue/queue.module';
import { NotificationService } from './notification.service';
import { NotificationProcessor } from './notification.processor';
import { NotificationController } from './notification.controller';
import { EmailPreviewController } from './email-preview.controller';
import { EmailService } from './email/email.service';
import { MailgunProvider } from './email/providers/mailgun.provider';
import { SmtpProvider } from './email/providers/smtp.provider';
import { PreferenceService } from './preferences/preference.service';
import { UserNotificationPreference } from './preferences/user-notification-preference.entity';
import { NotificationLog } from './entities/notification-log.entity';
import { NotificationEvent } from './entities/notification-event.entity';

/**
 * Factory to determine which email provider to use based on environment
 * - Development: Use SMTP (Mailpit) if SMTP_HOST is configured
 * - Production: Use Mailgun
 */
const emailProviderFactory = {
  provide: 'EMAIL_PROVIDER',
  useFactory: () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasSmtpConfig = !!process.env.SMTP_HOST;

    if (isDevelopment && hasSmtpConfig) {
      return new SmtpProvider();
    }
    return new MailgunProvider();
  },
};

@Module({
  imports: [
    // Register SQS queue for notifications
    QueueModule.register({ name: 'notifications' }),
    // Register TypeORM entities
    TypeOrmModule.forFeature([
      UserNotificationPreference,
      NotificationLog,
      NotificationEvent,
    ]),
  ],
  controllers: [NotificationController, EmailPreviewController],
  providers: [
    NotificationService,
    NotificationProcessor,
    EmailService,
    emailProviderFactory,
    MailgunProvider,
    SmtpProvider,
    PreferenceService,
  ],
  exports: [
    NotificationService,
    EmailService,
    PreferenceService,
  ],
})
export class NotificationModule {}
