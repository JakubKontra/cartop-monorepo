import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { WebhookSubscriber } from '../../webhook/webhook.subscriber';
import { AuditSubscriber } from '../../model/audit/audit.subscriber';

/**
 * Subscriber Registry Provider
 * Registers TypeORM subscribers with proper dependency injection
 *
 * This ensures that subscribers instantiated by NestJS (with DI)
 * are properly registered with TypeORM's DataSource
 */
@Injectable()
export class SubscriberRegistryProvider implements OnModuleInit {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private webhookSubscriber: WebhookSubscriber,
    private auditSubscriber: AuditSubscriber,
  ) {}

  onModuleInit() {
    // Register subscribers with TypeORM
    // These subscribers are already instantiated by NestJS with proper DI
    const subscribers = this.dataSource.subscribers as any[];

    // Add our NestJS-instantiated subscribers if not already present
    if (!subscribers.includes(this.webhookSubscriber)) {
      subscribers.push(this.webhookSubscriber);
    }

    if (!subscribers.includes(this.auditSubscriber)) {
      subscribers.push(this.auditSubscriber);
    }

    console.log(`[SubscriberRegistry] Registered ${subscribers.length} TypeORM subscribers`);
  }
}
