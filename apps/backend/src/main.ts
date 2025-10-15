// Load environment variables FIRST before any other imports
// This ensures env vars are available when decorators are evaluated
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

// Register tsconfig paths to resolve path aliases at runtime
import { register } from 'tsconfig-paths';
import { resolve } from 'path';

const baseUrl = resolve(__dirname); // Current compiled location: dist/apps/backend/src
register({
  baseUrl,
  paths: {
    '@/*': ['*'],
  },
});

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { validateConfig } from './config/config.validation';
import helmet from '@fastify/helmet';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
import { GraphQLExceptionFilter } from './common/filters/graphql-exception.filter';
// import * as Sentry from '@sentry/node';
// import { nodeProfilingIntegration } from '@sentry/profiling-node';
// import { SentryExceptionFilter } from './common/filters/sentry-exception.filter';

async function bootstrap() {
  // Validate configuration before starting application
  // This will fail fast if critical config is missing in production
  const appConfig = validateConfig();

  // Sentry disabled
  // if (process.env.SENTRY_DSN) {
  //   Sentry.init({
  //     dsn: process.env.SENTRY_DSN,
  //     environment: process.env.SENTRY_ENVIRONMENT || appConfig.nodeEnv,
  //     tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),
  //     profilesSampleRate: parseFloat(process.env.SENTRY_PROFILES_SAMPLE_RATE || '0.1'),
  //     integrations: [nodeProfilingIntegration()],
  //     enabled: appConfig.nodeEnv === 'production' || process.env.SENTRY_ENABLED === 'true',
  //   });
  // }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const logger = new Logger('Bootstrap');

  // Security: Configure Helmet for secure HTTP headers
  const isDevelopment = appConfig.nodeEnv !== 'production';
  await app.register(helmet, {
    // Content Security Policy - relaxed for GraphQL Playground and Swagger in dev
    contentSecurityPolicy: isDevelopment
      ? {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            imgSrc: ["'self'", 'data:', 'https:'],
          },
        }
      : {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
          },
        },
    // Other security headers (applied in both dev and production)
    crossOriginEmbedderPolicy: !isDevelopment, // Disabled in dev for easier debugging
    crossOriginOpenerPolicy: { policy: isDevelopment ? 'unsafe-none' : 'same-origin' },
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow cross-origin requests for API
  });

  // Register GraphQL exception filter for type-safe error handling
  app.useGlobalFilters(new GraphQLExceptionFilter());

  // Sentry exception filter disabled
  // app.useGlobalFilters(new SentryExceptionFilter());

  // Enable custom validation pipe globally
  app.useGlobalPipes(new CustomValidationPipe());

  // Enable CORS
  // TODO: Configure CORS with proper origin restrictions for production
  // See TODO.md #3 for implementation details
  app.enableCors();

  // Setup Swagger (only in development/local)
  if (isDevelopment) {
    const config = new DocumentBuilder()
      .setTitle('Cartop API')
      .setDescription('REST API documentation for Cartop backend services')
      .setVersion('1.0')
      .addBearerAuth()  // Simplified - uses standard JWT bearer format
      .addTag('Marketing', 'Ecomail marketing integration endpoints')
      .addTag('Health', 'Health check endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      customSiteTitle: 'Cartop API Docs',
      customfavIcon: 'https://nestjs.com/img/logo_text.svg',
      customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info { margin: 50px 0 }
      `,
    });

    logger.log(`Swagger documentation available at: http://localhost:${appConfig.port}/api/docs`);
  }

  await app.listen(appConfig.port);

  logger.log(`Application is running on: http://localhost:${appConfig.port}/graphql`);
}

bootstrap();
