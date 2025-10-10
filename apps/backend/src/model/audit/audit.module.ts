import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AuditLog } from './audit-log.entity';
import { AuditService } from './audit.service';
import { AuditResolver } from './audit.resolver';
import { AuditProcessor } from './audit.processor';
import { AuditSubscriber } from './audit.subscriber';

@Module({
  imports: [
    // Use the 'audit' connection for this entity
    TypeOrmModule.forFeature([AuditLog], 'audit'),

    // Register Bull queue for async processing
    BullModule.registerQueue({
      name: 'audit',
    }),
  ],
  providers: [
    AuditService,
    AuditResolver,
    AuditProcessor,
    AuditSubscriber,
  ],
  exports: [AuditService], // Export for use in other modules
})
export class AuditModule {}
