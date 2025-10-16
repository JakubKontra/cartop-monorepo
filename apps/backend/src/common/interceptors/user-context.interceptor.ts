import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

/**
 * User Context Interceptor
 * Extracts user information from the request and stores it in CLS
 * This enables audit logging to capture user context across async operations
 */
@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Check if this is a GraphQL request
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (request) {
      // Extract user information from request
      const user = request.user;

      // Store user context in CLS for audit logging
      if (user) {
        this.cls.set('userId', user.id);
        this.cls.set('userEmail', user.email);
      }

      // Extract IP address
      const ipAddress =
        request.ip ||
        request.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        request.connection?.remoteAddress ||
        request.socket?.remoteAddress;

      if (ipAddress) {
        this.cls.set('ipAddress', ipAddress);
      }

      // Extract user agent
      const userAgent = request.headers['user-agent'];
      if (userAgent) {
        this.cls.set('userAgent', userAgent);
      }
    }

    return next.handle();
  }
}
