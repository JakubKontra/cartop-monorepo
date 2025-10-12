import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { BaseException } from '../exceptions/base';
import { ExceptionKeysEnum } from '../exceptions/keys';
import * as Sentry from '@sentry/node';

/**
 * GraphQL Exception Filter
 * Catches exceptions and formats them for GraphQL responses
 * Exposes error keys for frontend translation
 */
@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GraphQLExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo();
    const ctx = gqlHost.getContext();

    // Handle BaseException (our custom exceptions with error keys)
    if (exception instanceof BaseException) {
      const payload = exception.getPayload();
      const status = exception.getStatus();

      // Log the error
      if (status >= 500) {
        this.logger.error(
          `GraphQL Error [${payload.key}]: ${exception.message}`,
          exception.stack,
        );
      } else {
        this.logger.warn(
          `GraphQL Error [${payload.key}]: ${exception.message}`,
        );
      }

      // Send to Sentry for server errors
      if (status >= 500) {
        Sentry.withScope((scope) => {
          scope.setContext('graphql', {
            operation: info?.operation?.operation,
            operationName: info?.operation?.name?.value,
            fieldName: info?.fieldName,
            path: info?.path,
          });

          if (ctx?.req?.user) {
            scope.setUser({
              id: ctx.req.user.id,
              email: ctx.req.user.email,
            });
          }

          scope.setTag('error.key', payload.key);
          scope.setTag('graphql.operation', info?.operation?.operation || 'unknown');

          Sentry.captureException(exception);
        });
      }

      // Return formatted GraphQL error with error key in extensions
      return new GraphQLError(exception.message, {
        extensions: {
          key: payload.key,
          errors: payload.errors,
          code: status,
          http: {
            status,
          },
        },
      });
    }

    // Handle standard Error objects
    if (exception instanceof Error) {
      this.logger.error(
        `GraphQL Unexpected Error: ${exception.message}`,
        exception.stack,
      );

      // Send unexpected errors to Sentry
      Sentry.withScope((scope) => {
        scope.setContext('graphql', {
          operation: info?.operation?.operation,
          operationName: info?.operation?.name?.value,
          fieldName: info?.fieldName,
          path: info?.path,
        });

        if (ctx?.req?.user) {
          scope.setUser({
            id: ctx.req.user.id,
            email: ctx.req.user.email,
          });
        }

        Sentry.captureException(exception);
      });

      return new GraphQLError('Internal server error', {
        extensions: {
          key: ExceptionKeysEnum.INTERNAL_SERVER_ERROR,
          errors: [
            {
              message: exception.message,
            },
          ],
          code: 500,
          http: {
            status: 500,
          },
        },
      });
    }

    // Handle unknown exceptions
    this.logger.error(
      `GraphQL Unknown Exception: ${JSON.stringify(exception)}`,
    );

    Sentry.captureMessage(
      `GraphQL Non-Error exception: ${JSON.stringify(exception)}`,
      'error',
    );

    return new GraphQLError('Unknown error occurred', {
      extensions: {
        key: ExceptionKeysEnum.UNKNOWN_ERROR,
        errors: [
          {
            message: 'An unknown error occurred',
          },
        ],
        code: 500,
        http: {
          status: 500,
        },
      },
    });
  }
}
