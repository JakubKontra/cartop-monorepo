import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { AuditModule } from './model/audit/audit.module';
import { UserModule } from './model/user/user.module';
import { CatalogModule } from './catalog/catalog.module';
import { AuthModule } from './auth/auth.module';
import { WebhookModule } from './webhook/webhook.module';
import { NotificationModule } from './notification/notification.module';
import { MarketingModule } from './marketing/marketing.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { SubscriberRegistryProvider } from './common/providers/subscriber-registry.provider';

@Module({
  imports: [
    // GraphQL Configuration - Unified Endpoint
    // Access control is handled by @Public() and @Roles() decorators
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: process.env.NODE_ENV === 'production'
        ? true // In-memory schema for production (Docker-friendly)
        : join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // Security: Disable playground and introspection in production
      playground: process.env.NODE_ENV !== 'production',
      introspection: process.env.NODE_ENV !== 'production',
      context: ({ req, res }) => ({ req, res }),
    }),

    // Authentication
    AuthModule,

    // TypeORM Configuration - Main Database
    // TODO: Set up TypeORM migrations for production deployment
    // - Generate initial migration from current schema
    // - Add migration scripts to package.json
    // - Configure migrations and migrationsRun options
    // See TODO.md #6 for detailed migration setup guide
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'cartop_v3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // Subscribers are registered as NestJS providers in their modules
      // TypeORM will discover them via @EventSubscriber() decorator
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development', // Auto-sync in dev only
      logging: process.env.NODE_ENV === 'development',
      // Connection pool configuration (configurable via environment variables)
      extra: {
        max: parseInt(process.env.DB_POOL_MAX || '20', 10), // Maximum pool size
        min: parseInt(process.env.DB_POOL_MIN || '5', 10),  // Minimum pool size
        idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT_MS || '30000', 10),
        statement_timeout: parseInt(process.env.DB_QUERY_TIMEOUT_MS || '10000', 10), // Query timeout in ms
      },
    }),

    // TypeORM Configuration - Audit Database (Separate Connection Pool)
    // TODO: Include audit tables in migration setup
    TypeOrmModule.forRoot({
      name: 'audit',
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'cartop_v3',
      entities: [__dirname + '/model/audit/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development', // Auto-sync in dev only
      logging: false, // Disable logging for audit writes to improve performance
      // Dedicated connection pool for audit writes (configurable via environment variables)
      extra: {
        max: parseInt(process.env.DB_AUDIT_POOL_MAX || '10', 10), // Maximum pool size for audit
        min: parseInt(process.env.DB_AUDIT_POOL_MIN || '2', 10),  // Minimum pool size for audit
        idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT_MS || '30000', 10),
        statement_timeout: parseInt(process.env.DB_QUERY_TIMEOUT_MS || '10000', 10), // Query timeout in ms
      },
    }),

    // Bull Queue Configuration
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    }),

    // Feature Modules
    AuditModule,
    UserModule,
    CatalogModule,
    WebhookModule,
    NotificationModule,
    MarketingModule,
  ],
  providers: [
    // Apply JWT Auth Guard globally
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Apply Roles Guard globally
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // Register TypeORM subscribers with proper DI
    SubscriberRegistryProvider,
  ],
})
export class AppModule {}
