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
      playground: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
    }),

    // Authentication
    AuthModule,

    // TypeORM Configuration - Main Database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'cartop_v3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      extra: {
        max: 20, // Maximum pool size
        min: 5,  // Minimum pool size
        idleTimeoutMillis: 30000,
      },
    }),

    // TypeORM Configuration - Audit Database (Separate Connection Pool)
    TypeOrmModule.forRoot({
      name: 'audit',
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'cartop_v3',
      entities: [__dirname + '/model/audit/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
      logging: false, // Disable logging for audit writes to improve performance
      extra: {
        max: 10, // Dedicated pool for audit writes
        min: 2,
        idleTimeoutMillis: 30000,
      },
    }),

    // Bull Queue Configuration
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
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
  ],
})
export class AppModule {}
