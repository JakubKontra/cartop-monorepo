import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/auth/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/auth/public.decorator';
import { UserRole, ROLE_HIERARCHY } from '../enums/role.enum';

/**
 * Role-Based Access Control Guard
 * Checks if user has required role to access resolver
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Get required roles
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No specific roles required
    }

    // Get user from request
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Check if user has any of the required roles
    const userRoles = (user.roles || []) as UserRole[];

    // User must have at least one role that meets or exceeds the required permission level
    const hasRole = requiredRoles.some(requiredRole =>
      userRoles.some(userRole => this.hasPermission(userRole, requiredRole))
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `Insufficient permissions. Required roles: ${requiredRoles.join(', ')}. User has: ${userRoles.join(', ')}`,
      );
    }

    return true;
  }

  /**
   * Check if user role has permission for required role
   * Uses role hierarchy (admin can do everything, etc.)
   */
  private hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;

    return userLevel >= requiredLevel;
  }
}
