import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { IQueueService, QueueJob } from '../../common/queue/queue.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';
import { AuditLogData } from '../../common/interfaces/audit.interface';

/**
 * Audit Queue Processor
 * Handles async processing of audit logs from the queue
 */
@Injectable()
export class AuditProcessor implements OnModuleInit {
  private readonly logger = new Logger(AuditProcessor.name);

  constructor(
    @Inject('QUEUE_AUDIT')
    private readonly auditQueue: IQueueService,
    @InjectRepository(AuditLog, 'audit')
    private readonly auditRepository: Repository<AuditLog>,
  ) {}

  onModuleInit() {
    // Register processors for audit jobs
    this.auditQueue.process<AuditLogData>(
      'log-audit',
      this.handleAuditLog.bind(this),
    );
    this.auditQueue.process<AuditLogData[]>(
      'batch-audit',
      this.handleBatchAudit.bind(this),
    );
  }

  async handleAuditLog(job: QueueJob<AuditLogData>) {
    try {
      const data = job.data;

      const auditLog = this.auditRepository.create({
        ...data,
        createdAt: data.timestamp || new Date(),
      });

      await this.auditRepository.save(auditLog);

      this.logger.debug(`Processed audit log for ${data.entityName}:${data.entityId}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to process audit log: ${errorMessage}`,
        errorStack,
      );
      throw error; // Re-throw to trigger retry mechanism
    }
  }

  async handleBatchAudit(job: QueueJob<AuditLogData[]>) {
    try {
      const data = job.data;

      const auditLogs = data.map(item =>
        this.auditRepository.create({
          ...item,
          createdAt: item.timestamp || new Date(),
        }),
      );

      await this.auditRepository.insert(auditLogs);

      this.logger.debug(`Processed batch of ${data.length} audit logs`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to process batch audit logs: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }
}
