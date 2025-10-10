import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { WebhookService } from './webhook.service';
import { WatchConfig, WebhookPayload } from '../common/interfaces/watch.interface';

interface WebhookJob {
  config: WatchConfig;
  payload: WebhookPayload;
}

/**
 * Webhook Queue Processor
 * Handles async processing of webhook HTTP requests
 */
@Processor('webhooks')
export class WebhookProcessor {
  private readonly logger = new Logger(WebhookProcessor.name);

  constructor(private readonly webhookService: WebhookService) {}

  @Process('send-webhook')
  async handleSendWebhook(job: Job<WebhookJob>) {
    const { config, payload } = job.data;

    try {
      this.logger.debug(
        `Processing webhook job ${job.id}: ${config.name} for ${payload.entityName}`,
      );

      await this.webhookService.sendWebhook(config, payload);

      this.logger.log(
        `Webhook job ${job.id} completed: ${config.name}`,
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Webhook job ${job.id} failed: ${errorMessage}`,
        errorStack,
      );
      throw error; // Re-throw to trigger retry
    }
  }
}
