import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { WebhookPayload, WatchConfig } from '../common/interfaces/watch.interface';

/**
 * Webhook Service
 * Handles sending HTTP requests to webhook URLs
 * Uses queue for async processing and retry logic
 */
@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  // Debounce timers: key = watchName:entityId, value = timeout
  private debounceTimers = new Map<string, NodeJS.Timeout>();

  constructor(
    @InjectQueue('webhooks')
    private readonly webhookQueue: Queue,
  ) {}

  /**
   * Trigger webhook(s) for entity change
   */
  async trigger(
    configs: WatchConfig[],
    entityName: string,
    entityId: string,
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    entity: any,
    changedProperties?: string[],
    oldValues?: Record<string, any>,
  ): Promise<void> {
    for (const config of configs) {
      try {
        // Build payload
        const payload = this.buildPayload(
          config,
          entityName,
          action,
          entity,
          changedProperties,
          oldValues,
        );

        // Check if debouncing is configured
        if (config.debounce) {
          await this.triggerWithDebounce(config, entityId, payload);
        } else {
          await this.queueWebhook(config, payload);
        }
      } catch (error) {
        this.logger.error(
          `Failed to trigger webhook ${config.name}: ${error.message}`,
          error.stack,
        );
      }
    }
  }

  /**
   * Trigger webhook with debouncing
   * Prevents too many requests for rapid changes
   */
  private async triggerWithDebounce(
    config: WatchConfig,
    entityId: string,
    payload: WebhookPayload,
  ): Promise<void> {
    const debounceKey = `${config.name}:${entityId}`;

    // Clear existing timer
    const existingTimer = this.debounceTimers.get(debounceKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new timer
    const timer = setTimeout(async () => {
      await this.queueWebhook(config, payload);
      this.debounceTimers.delete(debounceKey);
    }, config.debounce.delay);

    this.debounceTimers.set(debounceKey, timer);

    // Handle maxWait if configured
    if (config.debounce.maxWait) {
      setTimeout(async () => {
        const currentTimer = this.debounceTimers.get(debounceKey);
        if (currentTimer) {
          clearTimeout(currentTimer);
          await this.queueWebhook(config, payload);
          this.debounceTimers.delete(debounceKey);
        }
      }, config.debounce.maxWait);
    }
  }

  /**
   * Queue webhook for processing
   */
  private async queueWebhook(
    config: WatchConfig,
    payload: WebhookPayload,
  ): Promise<void> {
    const retryConfig = config.retry || {
      attempts: 3,
      delay: 2000,
      backoff: 'exponential' as const,
    };

    await this.webhookQueue.add(
      'send-webhook',
      {
        config,
        payload,
      },
      {
        attempts: retryConfig.attempts,
        backoff: {
          type: retryConfig.backoff || 'exponential',
          delay: retryConfig.delay || 2000,
        },
        removeOnComplete: 100, // Keep last 100 completed
        removeOnFail: 1000,    // Keep last 1000 failed
      },
    );

    this.logger.debug(
      `Queued webhook ${config.name} for ${payload.entityName}:${payload.data.id}`,
    );
  }

  /**
   * Build webhook payload
   */
  private buildPayload(
    config: WatchConfig,
    entityName: string,
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    entity: any,
    changedProperties?: string[],
    oldValues?: Record<string, any>,
  ): WebhookPayload {
    // Extract selected properties
    const data: Record<string, any> = {};
    const selection = config.selection || Object.keys(entity);

    for (const prop of selection) {
      if (entity[prop] !== undefined) {
        data[prop] = entity[prop];
      }
    }

    // Build payload
    const payload: WebhookPayload = {
      watchName: config.name,
      entityName,
      action,
      timestamp: new Date(),
      data,
    };

    // Add change information for UPDATE
    if (action === 'UPDATE' && changedProperties && changedProperties.length > 0) {
      payload.changedProperties = changedProperties;

      // Extract old/new values for changed properties
      if (oldValues) {
        payload.oldValues = {};
        payload.newValues = {};

        for (const prop of changedProperties) {
          if (config.watch.includes(prop)) {
            payload.oldValues[prop] = oldValues[prop];
            payload.newValues[prop] = entity[prop];
          }
        }
      }
    }

    return payload;
  }

  /**
   * Send HTTP request to webhook URL (used by processor)
   */
  async sendWebhook(config: WatchConfig, payload: WebhookPayload): Promise<void> {
    const method = config.method || 'POST';
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'CartOp-Webhook/1.0',
      ...config.headers,
    };

    this.logger.log(
      `Sending ${method} webhook to ${config.webhook} for ${payload.watchName}`,
    );

    try {
      const response = await fetch(config.webhook, {
        method,
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Webhook request failed: ${response.status} ${response.statusText}`,
        );
      }

      this.logger.log(
        `Webhook ${config.name} sent successfully (${response.status})`,
      );
    } catch (error) {
      this.logger.error(
        `Webhook ${config.name} failed: ${error.message}`,
        error.stack,
      );
      throw error; // Re-throw to trigger retry
    }
  }
}
