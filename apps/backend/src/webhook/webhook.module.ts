import { Module } from '@nestjs/common';
import { QueueModule } from '../common/queue/queue.module';
import { WebhookService } from './webhook.service';
import { WebhookProcessor } from './webhook.processor';
import { WebhookSubscriber } from './webhook.subscriber';

@Module({
  imports: [
    // Register SQS queue for webhooks
    QueueModule.register({ name: 'webhooks' }),
  ],
  providers: [
    WebhookService,
    WebhookProcessor,
    WebhookSubscriber,
  ],
  exports: [WebhookService, WebhookSubscriber],
})
export class WebhookModule {}
