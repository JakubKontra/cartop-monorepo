import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/auth/public.decorator';
import { AuthExceptions } from '../exceptions/factories/auth.exceptions';

/**
 * JWT Authentication Guard for GraphQL
 * Checks for valid JWT token in Authorization header
 * Skips authentication for @Public() decorated resolvers
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // Check if token is expired or invalid based on info
      if (info?.name === 'TokenExpiredError') {
        throw AuthExceptions.tokenExpired();
      }
      if (info?.name === 'JsonWebTokenError') {
        throw AuthExceptions.tokenInvalid();
      }
      // Default to unauthorized for other cases
      throw err || AuthExceptions.unauthorized('Invalid or missing authentication token');
    }
    return user;
  }
}
