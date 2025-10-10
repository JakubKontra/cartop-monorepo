import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './notification.service';
import { NotificationProcessor } from './notification.processor';
import { NotificationController } from './notification.controller';
import { EmailService } from './email/email.service';
import { MailgunProvider } from './email/providers/mailgun.provider';
import { PreferenceService } from './preferences/preference.service';
import { UserNotificationPreference } from './preferences/user-notification-preference.entity';
import { NotificationLog } from './entities/notification-log.entity';
import { NotificationEvent } from './entities/notification-event.entity';

@Module({
  imports: [
    // Register Bull queue for notifications
    BullModule.registerQueue({
      name: 'notifications',
    }),
    // Register TypeORM entities
    TypeOrmModule.forFeature([
      UserNotificationPreference,
      NotificationLog,
      NotificationEvent,
    ]),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationProcessor,
    EmailService,
    MailgunProvider,
    PreferenceService,
  ],
  exports: [
    NotificationService,
    PreferenceService,
  ],
})
export class NotificationModule {}
