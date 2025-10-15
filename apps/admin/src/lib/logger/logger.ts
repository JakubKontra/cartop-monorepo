/**
 * Logging Service
 *
 * Centralized logging abstraction that can be easily integrated with
 * external services like Sentry, LogRocket, or DataDog.
 *
 * Features:
 * - Multiple log levels (debug, info, warn, error)
 * - Structured logging with context
 * - Environment-aware (dev vs production)
 * - Easy integration point for external services
 *
 * @example
 * ```ts
 * import { logger } from '@/lib/logger'
 *
 * logger.info('User logged in', { userId: '123' })
 * logger.error('Failed to fetch data', error, { query: 'users' })
 * logger.debug('Debugging state', { state })
 * ```
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogContext {
  [key: string]: unknown
}

export interface LoggerConfig {
  /** Minimum log level to output */
  minLevel: LogLevel
  /** Whether to log to console */
  enableConsole: boolean
  /** Whether to send logs to external service (e.g., Sentry) */
  enableExternalLogging: boolean
}

/**
 * Logger class that handles all logging operations
 */
class Logger {
  private config: LoggerConfig

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      minLevel: import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO,
      enableConsole: true,
      enableExternalLogging: import.meta.env.PROD ?? false,
      ...config,
    }
  }

  /**
   * Check if a log level should be output based on configuration
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR]
    const minLevelIndex = levels.indexOf(this.config.minLevel)
    const currentLevelIndex = levels.indexOf(level)
    return currentLevelIndex >= minLevelIndex
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? ` ${JSON.stringify(context)}` : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
  }

  /**
   * Send log to external logging service (e.g., Sentry)
   * This is where you would integrate with Sentry, LogRocket, etc.
   */
  private sendToExternalService(
    _level: LogLevel,
    _message: string,
    _error?: Error | unknown,
    _context?: LogContext
  ): void {
    if (!this.config.enableExternalLogging) return

    // TODO: Integrate with Sentry
    // Example Sentry integration:
    // if (level === LogLevel.ERROR && error) {
    //   Sentry.captureException(error, {
    //     level: 'error',
    //     extra: { message, ...context },
    //   })
    // } else {
    //   Sentry.captureMessage(message, {
    //     level: level as Sentry.SeverityLevel,
    //     extra: context,
    //   })
    // }
  }

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return

    if (this.config.enableConsole) {
      // eslint-disable-next-line no-console
      console.debug(this.formatMessage(LogLevel.DEBUG, message, context))
    }

    this.sendToExternalService(LogLevel.DEBUG, message, undefined, context)
  }

  /**
   * Log an info message
   */
  info(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.INFO)) return

    if (this.config.enableConsole) {
      // eslint-disable-next-line no-console
      console.log(this.formatMessage(LogLevel.INFO, message, context))
    }

    this.sendToExternalService(LogLevel.INFO, message, undefined, context)
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.WARN)) return

    if (this.config.enableConsole) {
      // eslint-disable-next-line no-console
      console.warn(this.formatMessage(LogLevel.WARN, message, context))
    }

    this.sendToExternalService(LogLevel.WARN, message, undefined, context)
  }

  /**
   * Log an error message with optional error object
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.ERROR)) return

    if (this.config.enableConsole) {
      // eslint-disable-next-line no-console
      console.error(this.formatMessage(LogLevel.ERROR, message, context), error)
    }

    this.sendToExternalService(LogLevel.ERROR, message, error, context)
  }

  /**
   * Update logger configuration
   */
  configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Get current configuration
   */
  getConfig(): LoggerConfig {
    return { ...this.config }
  }
}

/**
 * Default logger instance
 * Import this to use throughout the application
 */
export const logger = new Logger()

/**
 * Create a custom logger instance with specific configuration
 */
export function createLogger(config?: Partial<LoggerConfig>): Logger {
  return new Logger(config)
}
