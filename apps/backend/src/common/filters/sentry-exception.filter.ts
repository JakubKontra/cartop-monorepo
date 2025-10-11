import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import * as Sentry from '@sentry/node';

/**
 * Global exception filter that captures errors and sends them to Sentry
 * Also provides consistent error response format
 */
@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SentryExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // Check if this is a GraphQL context (GraphQL errors are handled differently)
    const contextType = host.getType<string>();

    // For GraphQL contexts, just log and let GraphQL handle the error
    if (contextType === 'graphql') {
      // Determine status code
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      // Extract error message
      let message = 'Internal server error';
      if (exception instanceof HttpException) {
        const exceptionResponse = exception.getResponse();
        if (typeof exceptionResponse === 'string') {
          message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object') {
          message = (exceptionResponse as any).message || message;
        }
      } else if (exception instanceof Error) {
        message = exception.message;
      }

      // Log the error
      if (status >= 500) {
        this.logger.error(
          `GraphQL Error: ${message}`,
          exception instanceof Error ? exception.stack : undefined,
        );
      } else {
        this.logger.warn(`GraphQL Error: ${message}`);
      }

      // Send to Sentry for server errors
      if (status >= 500 || !(exception instanceof HttpException)) {
        if (exception instanceof Error) {
          Sentry.captureException(exception);
        } else {
          Sentry.captureMessage(`GraphQL Non-Error exception: ${message}`, 'error');
        }
      }

      // Re-throw for GraphQL to handle
      throw exception;
    }

    // HTTP context handling
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest();

    // Determine HTTP status code
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract error message and details
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let details: any = undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || message;
        error = (exceptionResponse as any).error || error;
        details = (exceptionResponse as any).details;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }

    // Log the error
    if (status >= 500) {
      this.logger.error(
        `HTTP ${status} Error: ${message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.logger.warn(`HTTP ${status} Error: ${message}`);
    }

    // Send to Sentry (only for server errors and unexpected exceptions)
    if (status >= 500 || !(exception instanceof HttpException)) {
      Sentry.withScope((scope) => {
        // Add request context (with null checks)
        if (request) {
          scope.setContext('http', {
            method: request.method || 'UNKNOWN',
            url: request.url || 'UNKNOWN',
            headers: request.headers ? this.sanitizeHeaders(request.headers) : {},
            query: request.query || {},
          });

          // Add user context if available
          if (request.user) {
            scope.setUser({
              id: request.user.id,
              email: request.user.email,
            });
          }

          // Set additional tags
          scope.setTag('http.status_code', status);
          scope.setTag('http.method', request.method || 'UNKNOWN');
        }

        // Capture the exception
        if (exception instanceof Error) {
          Sentry.captureException(exception);
        } else {
          Sentry.captureMessage(`Non-Error exception: ${message}`, 'error');
        }
      });
    }

    // Send response
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request?.url || 'UNKNOWN',
      method: request?.method || 'UNKNOWN',
      message,
      error,
      ...(details && { details }),
    };

    response.status(status).send(errorResponse);
  }

  /**
   * Sanitize request headers to remove sensitive information
   */
  private sanitizeHeaders(headers: Record<string, any>): Record<string, any> {
    const sanitized = { ...headers };
    const sensitiveHeaders = [
      'authorization',
      'cookie',
      'x-api-key',
      'x-auth-token',
    ];

    for (const header of sensitiveHeaders) {
      if (sanitized[header]) {
        sanitized[header] = '[REDACTED]';
      }
    }

    return sanitized;
  }
}
