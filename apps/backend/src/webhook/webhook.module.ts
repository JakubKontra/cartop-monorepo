import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { WebhookService } from './webhook.service';
import { WebhookProcessor } from './webhook.processor';
import { WebhookSubscriber } from './webhook.subscriber';

@Module({
  imports: [
    // Register Bull queue for webhooks
    BullModule.registerQueue({
      name: 'webhooks',
    }),
  ],
  providers: [
    WebhookService,
    WebhookProcessor,
    WebhookSubscriber,
  ],
  exports: [WebhookService],
})
export class WebhookModule {}
