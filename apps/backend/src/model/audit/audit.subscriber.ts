import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditAction } from '../../common/interfaces/audit.interface';
import { isAuditable } from '../../common/decorators/auditable.decorator';

/**
 * TypeORM Subscriber for automatic audit logging
 * Intercepts entity changes and logs them asynchronously
 *
 * Performance: Non-blocking, delegates to queue for processing
 */
@Injectable()
@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
  private readonly logger = new Logger(AuditSubscriber.name);

  constructor(private readonly auditService: AuditService) {}

  /**
   * After entity is inserted
   */
  async afterInsert(event: InsertEvent<any>) {
    const entity = event.entity;

    if (!entity || !isAuditable(entity)) {
      return;
    }

    try {
      await this.auditService.log({
        entityName: event.metadata.tableName,
        entityId: this.getEntityId(entity),
        action: AuditAction.CREATE,
        newValue: entity,
        changes: undefined,
        oldValue: undefined,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Audit logging failed for INSERT: ${errorMessage}`);
    }
  }

  /**
   * After entity is updated
   */
  async afterUpdate(event: UpdateEvent<any>) {
    const entity = event.entity;

    if (!entity || !isAuditable(entity)) {
      return;
    }

    try {
      const oldValue = event.databaseEntity;
      const newValue = entity;
      const changes = this.auditService.calculateChanges(oldValue, newValue);

      // Only log if there are actual changes
      if (Object.keys(changes).length > 0) {
        await this.auditService.log({
          entityName: event.metadata.tableName,
          entityId: this.getEntityId(entity),
          action: AuditAction.UPDATE,
          oldValue,
          newValue,
          changes,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Audit logging failed for UPDATE: ${errorMessage}`);
    }
  }

  /**
   * After entity is removed
   */
  async afterRemove(event: RemoveEvent<any>) {
    const entity = event.entity || event.databaseEntity;

    if (!entity || !isAuditable(entity)) {
      return;
    }

    try {
      await this.auditService.log({
        entityName: event.metadata.tableName,
        entityId: this.getEntityId(entity),
        action: AuditAction.DELETE,
        oldValue: entity,
        newValue: undefined,
        changes: undefined,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Audit logging failed for REMOVE: ${errorMessage}`);
    }
  }

  /**
   * Extract entity ID from entity
   */
  private getEntityId(entity: any): string {
    return entity.id?.toString() || entity._id?.toString() || 'unknown';
  }
}
