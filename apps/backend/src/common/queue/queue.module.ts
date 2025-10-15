import { Module, DynamicModule, Global } from '@nestjs/common';
import { SqsQueueService } from './sqs-queue.service';

export interface QueueModuleOptions {
  name: string;
}

/**
 * Queue Module
 * Provides queue service using SQS
 * Can be imported multiple times with different queue names
 */
@Global()
@Module({})
export class QueueModule {
  /**
   * Register a queue with a specific name
   * Usage: QueueModule.register({ name: 'webhooks' })
   */
  static register(options: QueueModuleOptions): DynamicModule {
    const queueProvider = {
      provide: `QUEUE_${options.name.toUpperCase()}`,
      useFactory: () => {
        // Get queue name from environment or use default
        const envKey = `SQS_${options.name.toUpperCase()}_QUEUE`;
        const queueName =
          process.env[envKey] || `cartop-${options.name}-queue`;

        return new SqsQueueService(queueName);
      },
    };

    return {
      module: QueueModule,
      providers: [queueProvider],
      exports: [queueProvider],
    };
  }
}
