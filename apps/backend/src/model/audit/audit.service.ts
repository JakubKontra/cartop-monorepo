import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Repository } from 'typeorm';
import { Queue } from 'bull';
import { AuditLog } from './audit-log.entity';
import { AuditLogData } from '../../common/interfaces/audit.interface';
import { AuditQueryInput } from './dto/audit-query.input';

/**
 * Audit Service - High-performance audit logging with batch processing
 *
 * Features:
 * - Async queue processing for non-blocking writes
 * - Batch writing to reduce database load
 * - Separate connection pool for audit operations
 * - In-memory buffer with automatic flushing
 */
@Injectable()
export class AuditService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AuditService.name);
  private auditBuffer: AuditLogData[] = [];
  private flushInterval: NodeJS.Timeout;
  private readonly BATCH_SIZE = parseInt(process.env.AUDIT_BATCH_SIZE || '100', 10);
  private readonly BATCH_INTERVAL_MS = parseInt(process.env.AUDIT_BATCH_INTERVAL_MS || '5000', 10);

  /**
   * Sensitive field patterns to filter from audit logs
   * These fields will be masked with '[REDACTED]' to prevent exposure of sensitive data
   */
  private readonly SENSITIVE_FIELD_PATTERNS = [
    // Authentication & Security
    /password/i,
    /passwd/i,
    /pwd/i,
    /secret/i,
    /token/i,
    /jwt/i,
    /apikey/i,
    /api[_-]?key/i,
    /accesskey/i,
    /access[_-]?key/i,
    /privatekey/i,
    /private[_-]?key/i,

    // Payment & Financial
    /creditcard/i,
    /credit[_-]?card/i,
    /cardnumber/i,
    /card[_-]?number/i,
    /cvv/i,
    /cvc/i,
    /ssn/i,
    /social[_-]?security/i,
    /account[_-]?number/i,
    /routing[_-]?number/i,
    /iban/i,

    // Personal Identifiable Information
    /taxid/i,
    /tax[_-]?id/i,
    /drivers[_-]?license/i,
    /passport/i,

    // Other Sensitive
    /pin/i,
    /signature/i,
    /authorization/i,
    /bearer/i,
  ];

  constructor(
    @InjectRepository(AuditLog, 'audit')
    private readonly auditRepository: Repository<AuditLog>,
    @InjectQueue('audit')
    private readonly auditQueue: Queue,
  ) {}

  onModuleInit() {
    // Start periodic flush timer
    this.flushInterval = setInterval(() => {
      this.flushBuffer();
    }, this.BATCH_INTERVAL_MS);

    this.logger.log(
      `Audit service initialized with batch size: ${this.BATCH_SIZE}, interval: ${this.BATCH_INTERVAL_MS}ms`,
    );
  }

  async onModuleDestroy() {
    // Flush remaining audits before shutdown
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    await this.flushBuffer();
    this.logger.log('Audit service shut down gracefully');
  }

  /**
   * Log an audit event (async, non-blocking)
   * Adds to in-memory buffer and queues for batch processing
   * Automatically sanitizes sensitive data before logging
   */
  async log(data: AuditLogData): Promise<void> {
    try {
      // Sanitize sensitive data before logging
      const sanitizedData = this.sanitizeSensitiveData(data);

      // Add to buffer
      this.auditBuffer.push({
        ...sanitizedData,
        timestamp: sanitizedData.timestamp || new Date(),
      });

      // If buffer is full, flush immediately
      if (this.auditBuffer.length >= this.BATCH_SIZE) {
        await this.flushBuffer();
      }

      // Also queue for redundancy and processing
      await this.auditQueue.add('log-audit', data, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to queue audit log: ${errorMessage}`, errorStack);
    }
  }

  /**
   * Log multiple audit events in bulk
   * Automatically sanitizes sensitive data before logging
   */
  async logBulk(dataArray: AuditLogData[]): Promise<void> {
    try {
      const now = new Date();
      const enrichedData = dataArray.map(data => {
        const sanitized = this.sanitizeSensitiveData(data);
        return {
          ...sanitized,
          timestamp: sanitized.timestamp || now,
        };
      });

      this.auditBuffer.push(...enrichedData);

      // Flush if buffer exceeds threshold
      if (this.auditBuffer.length >= this.BATCH_SIZE) {
        await this.flushBuffer();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to log bulk audits: ${errorMessage}`, errorStack);
    }
  }

  /**
   * Flush buffer to database (batch insert)
   */
  private async flushBuffer(): Promise<void> {
    if (this.auditBuffer.length === 0) {
      return;
    }

    const itemsToFlush = [...this.auditBuffer];
    this.auditBuffer = []; // Clear buffer immediately

    try {
      // Batch insert for maximum performance
      const entities = itemsToFlush.map(data => this.auditRepository.create(data));
      await this.auditRepository.insert(entities);

      this.logger.debug(`Flushed ${itemsToFlush.length} audit logs to database`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to flush audit buffer: ${errorMessage}`, errorStack);
      // Re-add failed items to buffer for retry
      this.auditBuffer.push(...itemsToFlush);
    }
  }

  /**
   * Query audit logs with filtering
   */
  async query(queryInput: AuditQueryInput): Promise<AuditLog[]> {
    const {
      entityName,
      entityId,
      action,
      userId,
      startDate,
      endDate,
      limit = 50,
      skip = 0,
    } = queryInput;

    const queryBuilder = this.auditRepository.createQueryBuilder('audit');

    if (entityName) {
      queryBuilder.andWhere('audit.entityName = :entityName', { entityName });
    }

    if (entityId) {
      queryBuilder.andWhere('audit.entityId = :entityId', { entityId });
    }

    if (action) {
      queryBuilder.andWhere('audit.action = :action', { action });
    }

    if (userId) {
      queryBuilder.andWhere('audit.userId = :userId', { userId });
    }

    if (startDate || endDate) {
      if (startDate && endDate) {
        queryBuilder.andWhere('audit.createdAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        });
      } else if (startDate) {
        queryBuilder.andWhere('audit.createdAt >= :startDate', { startDate });
      } else if (endDate) {
        queryBuilder.andWhere('audit.createdAt <= :endDate', { endDate });
      }
    }

    return queryBuilder
      .orderBy('audit.createdAt', 'DESC')
      .skip(skip)
      .take(Math.min(limit, 1000)) // Max 1000 records per query
      .getMany();
  }

  /**
   * Get audit history for a specific entity
   */
  async getEntityHistory(entityName: string, entityId: string): Promise<AuditLog[]> {
    return this.auditRepository.find({
      where: { entityName, entityId },
      order: { createdAt: 'DESC' },
      take: 100,
    });
  }

  /**
   * Get recent activity for a user
   */
  async getUserActivity(userId: string, limit: number = 50): Promise<AuditLog[]> {
    return this.auditRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: Math.min(limit, 1000),
    });
  }

  /**
   * Sanitize sensitive data from audit log entry
   * Replaces sensitive field values with '[REDACTED]'
   *
   * @param data - Audit log data to sanitize
   * @returns Sanitized audit log data
   */
  private sanitizeSensitiveData(data: AuditLogData): AuditLogData {
    return {
      ...data,
      oldValue: data.oldValue ? this.sanitizeObject(data.oldValue) : data.oldValue,
      newValue: data.newValue ? this.sanitizeObject(data.newValue) : data.newValue,
      changes: data.changes ? this.sanitizeObject(data.changes) : data.changes,
      metadata: data.metadata ? this.sanitizeObject(data.metadata) : data.metadata,
    };
  }

  /**
   * Recursively sanitize sensitive fields in an object
   *
   * @param obj - Object to sanitize
   * @returns Sanitized object with sensitive fields redacted
   */
  private sanitizeObject(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }

    // Handle objects
    if (typeof obj === 'object') {
      const sanitized: any = {};

      for (const [key, value] of Object.entries(obj)) {
        // Check if key matches any sensitive field pattern
        const isSensitive = this.SENSITIVE_FIELD_PATTERNS.some(pattern =>
          pattern.test(key)
        );

        if (isSensitive) {
          // Redact the value
          sanitized[key] = '[REDACTED]';
        } else if (typeof value === 'object' && value !== null) {
          // Recursively sanitize nested objects
          sanitized[key] = this.sanitizeObject(value);
        } else {
          // Keep non-sensitive values as-is
          sanitized[key] = value;
        }
      }

      return sanitized;
    }

    // Return primitive values as-is
    return obj;
  }

  /**
   * Calculate field-level changes between old and new values
   * Note: Changes are automatically sanitized when logged
   */
  calculateChanges(oldValue: any, newValue: any): Record<string, { old: any; new: any }> {
    const changes: Record<string, { old: any; new: any }> = {};

    if (!oldValue || !newValue) {
      return changes;
    }

    // Compare all keys from both objects
    const allKeys = new Set([...Object.keys(oldValue), ...Object.keys(newValue)]);

    for (const key of allKeys) {
      // Skip metadata fields
      if (['createdAt', 'updatedAt', '__v'].includes(key)) {
        continue;
      }

      const oldVal = oldValue[key];
      const newVal = newValue[key];

      // Deep comparison for objects
      if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        changes[key] = {
          old: oldVal,
          new: newVal,
        };
      }
    }

    return changes;
  }
}
