import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

/**
 * Dev Only Guard
 * Restricts access to development/local environments only
 */
@Injectable()
export class DevOnlyGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    const env = process.env.NODE_ENV || 'development';

    // Allow access only in development or local environments
    const isDev = env === 'development' || env === 'local';

    if (!isDev) {
      throw new ForbiddenException(
        'This endpoint is only available in development/local environments',
      );
    }

    return true;
  }
}
