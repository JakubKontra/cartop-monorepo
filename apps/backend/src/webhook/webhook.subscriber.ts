import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import {
  hasWatchConfig,
  getTriggeredWatchConfigs,
} from '../common/decorators/watch/watch.decorator';

/**
 * Webhook Subscriber
 * Monitors entity changes and triggers webhooks based on @Watch decorator
 *
 * Works alongside AuditSubscriber but focuses on external notifications
 */
@Injectable()
@EventSubscriber()
export class WebhookSubscriber implements EntitySubscriberInterface {
  private readonly logger = new Logger(WebhookSubscriber.name);

  constructor(private readonly webhookService: WebhookService) {}

  /**
   * After entity is inserted
   */
  async afterInsert(event: InsertEvent<any>) {
    const entity = event.entity;

    if (!entity || !hasWatchConfig(entity)) {
      return;
    }

    try {
      // For INSERT, all watch configs should trigger
      const configs = getTriggeredWatchConfigs(entity, Object.keys(entity));

      if (configs.length === 0) {
        return;
      }

      await this.webhookService.trigger(
        configs,
        event.metadata.tableName,
        this.getEntityId(entity),
        'INSERT',
        entity,
      );

      this.logger.debug(
        `Triggered ${configs.length} webhook(s) for INSERT ${event.metadata.tableName}`,
      );
    } catch (error) {
      this.logger.error(
        `Webhook trigger failed for INSERT: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * After entity is updated
   */
  async afterUpdate(event: UpdateEvent<any>) {
    const entity = event.entity;

    if (!entity || !hasWatchConfig(entity)) {
      return;
    }

    try {
      const oldValue = event.databaseEntity;
      const newValue = entity;

      // Calculate which properties actually changed
      const changedProperties = this.getChangedProperties(oldValue, newValue);

      if (changedProperties.length === 0) {
        return; // No changes, no webhooks
      }

      // Get watch configs that should trigger for these changes
      const configs = getTriggeredWatchConfigs(entity, changedProperties);

      if (configs.length === 0) {
        return; // No matching watch configs
      }

      await this.webhookService.trigger(
        configs,
        event.metadata.tableName,
        this.getEntityId(entity),
        'UPDATE',
        entity,
        changedProperties,
        oldValue,
      );

      this.logger.debug(
        `Triggered ${configs.length} webhook(s) for UPDATE ${event.metadata.tableName} (changed: ${changedProperties.join(', ')})`,
      );
    } catch (error) {
      this.logger.error(
        `Webhook trigger failed for UPDATE: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * After entity is removed
   */
  async afterRemove(event: RemoveEvent<any>) {
    const entity = event.entity || event.databaseEntity;

    if (!entity || !hasWatchConfig(entity)) {
      return;
    }

    try {
      // For DELETE, all watch configs should trigger
      const configs = getTriggeredWatchConfigs(entity, Object.keys(entity));

      if (configs.length === 0) {
        return;
      }

      await this.webhookService.trigger(
        configs,
        event.metadata.tableName,
        this.getEntityId(entity),
        'DELETE',
        entity,
      );

      this.logger.debug(
        `Triggered ${configs.length} webhook(s) for DELETE ${event.metadata.tableName}`,
      );
    } catch (error) {
      this.logger.error(
        `Webhook trigger failed for DELETE: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Get changed properties by comparing old and new values
   */
  private getChangedProperties(oldValue: any, newValue: any): string[] {
    if (!oldValue || !newValue) {
      return [];
    }

    const changed: string[] = [];
    const allKeys = new Set([...Object.keys(oldValue), ...Object.keys(newValue)]);

    for (const key of allKeys) {
      // Skip metadata fields
      if (['createdAt', 'updatedAt', '__v'].includes(key)) {
        continue;
      }

      // Deep comparison
      if (JSON.stringify(oldValue[key]) !== JSON.stringify(newValue[key])) {
        changed.push(key);
      }
    }

    return changed;
  }

  /**
   * Extract entity ID
   */
  private getEntityId(entity: any): string {
    return entity.id?.toString() || entity._id?.toString() || 'unknown';
  }
}
