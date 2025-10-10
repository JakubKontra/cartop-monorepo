import { Logger } from '@nestjs/common';

const logger = new Logger('ConfigValidation');

/**
 * Validated configuration interface
 */
export interface ValidatedConfig {
  jwtSecret: string;
  jwtExpiration: string;
  port: number;
  nodeEnv: string;
}

/**
 * Get JWT secret with fallback
 * Used by modules that are loaded before bootstrap()
 */
export function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'your-secret-key-change-in-production';
}

/**
 * Get JWT expiration with fallback
 */
export function getJwtExpiration(): string {
  return process.env.JWT_EXPIRATION || '24h';
}

/**
 * Validate critical configuration at startup
 * Fails fast if critical configuration is missing in production
 * Should be called in main.ts bootstrap() before app starts
 */
export function validateConfig(): ValidatedConfig {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const isProduction = nodeEnv === 'production';

  // JWT Secret validation
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    if (isProduction) {
      logger.error('═══════════════════════════════════════════════════════════');
      logger.error('FATAL ERROR: JWT_SECRET is not set in production');
      logger.error('═══════════════════════════════════════════════════════════');
      logger.error('');
      logger.error('The application cannot start without a secure JWT secret.');
      logger.error('Using a default secret in production is a critical security risk.');
      logger.error('');
      logger.error('To fix this:');
      logger.error('1. Set the JWT_SECRET environment variable');
      logger.error('2. Use a strong, random secret (at least 32 characters)');
      logger.error('3. Restart the application');
      logger.error('');
      logger.error('Example:');
      logger.error('  export JWT_SECRET="your-very-long-random-secret-here"');
      logger.error('');
      logger.error('═══════════════════════════════════════════════════════════');
      process.exit(1);
    } else {
      logger.warn('═══════════════════════════════════════════════════════════');
      logger.warn('WARNING: JWT_SECRET is not set');
      logger.warn('═══════════════════════════════════════════════════════════');
      logger.warn('Using default development secret.');
      logger.warn('This is ONLY acceptable in development.');
      logger.warn('Set JWT_SECRET before deploying to production.');
      logger.warn('═══════════════════════════════════════════════════════════');
    }
  }

  // Validate port is a valid number
  const port = parseInt(process.env.PORT || '3000', 10);
  if (isNaN(port) || port < 1 || port > 65535) {
    logger.error(`Invalid PORT value: ${process.env.PORT}. Must be between 1 and 65535.`);
    process.exit(1);
  }

  // Build validated config
  const config: ValidatedConfig = {
    jwtSecret: jwtSecret || 'your-secret-key-change-in-production',
    jwtExpiration: process.env.JWT_EXPIRATION || '24h',
    port,
    nodeEnv,
  };

  // Log configuration summary (without secrets)
  logger.log('Configuration validated successfully');
  logger.log(`Environment: ${config.nodeEnv}`);
  logger.log(`Port: ${config.port}`);
  logger.log(`JWT Expiration: ${config.jwtExpiration}`);
  logger.log(
    `JWT Secret: ${jwtSecret ? '✓ Set from environment' : '⚠ Using development default'}`,
  );

  return config;
}
