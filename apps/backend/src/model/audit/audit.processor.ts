import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';
import { AuditLogData } from '../../common/interfaces/audit.interface';

/**
 * Audit Queue Processor
 * Handles async processing of audit logs from the queue
 */
@Processor('audit')
export class AuditProcessor {
  private readonly logger = new Logger(AuditProcessor.name);

  constructor(
    @InjectRepository(AuditLog, 'audit')
    private readonly auditRepository: Repository<AuditLog>,
  ) {}

  @Process('log-audit')
  async handleAuditLog(job: Job<AuditLogData>) {
    try {
      const { data } = job;

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

  @Process('batch-audit')
  async handleBatchAudit(job: Job<AuditLogData[]>) {
    try {
      const { data } = job;

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
