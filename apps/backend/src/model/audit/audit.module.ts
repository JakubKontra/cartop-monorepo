import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from '../../common/queue/queue.module';
import { AuditLog } from './audit-log.entity';
import { AuditService } from './audit.service';
import { AuditResolver } from './audit.resolver';
import { AuditProcessor } from './audit.processor';
import { AuditSubscriber } from './audit.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog], 'audit'),
    QueueModule.register({ name: 'audit' }),
  ],
  providers: [
    AuditService,
    AuditResolver,
    AuditProcessor,
    AuditSubscriber,
  ],
  exports: [AuditService, AuditSubscriber],
})
export class AuditModule {}
