import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/auth/roles.decorator';
import { PERMISSIONS_KEY } from '../decorators/auth/require-permission.decorator';
import { IS_PUBLIC_KEY } from '../decorators/auth/public.decorator';
import { UserRole, ROLE_HIERARCHY } from '../enums/role.enum';
import { Permission, hasPermission } from '../config/permissions.config';

/**
 * Role-Based Access Control Guard
 * Checks if user has required role or permission to access resolver
 *
 * Supports both @Roles() and @RequirePermission() decorators
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

    // Get user from request
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const userRoles = (user.roles || []) as UserRole[];

    // Check permissions first (preferred method)
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredPermissions && requiredPermissions.length > 0) {
      // User must have at least ONE of the required permissions
      const hasRequiredPermission = requiredPermissions.some(permission =>
        hasPermission(userRoles, permission)
      );

      if (!hasRequiredPermission) {
        throw new ForbiddenException(
          `Insufficient permissions. Required: ${requiredPermissions.join(' or ')}`,
        );
      }

      return true;
    }

    // Fallback to role-based checking (for backward compatibility)
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No specific roles or permissions required
    }

    // User must have at least one role that meets or exceeds the required permission level
    const hasRole = requiredRoles.some(requiredRole =>
      userRoles.some(userRole => this.hasRolePermission(userRole, requiredRole))
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
  private hasRolePermission(userRole: UserRole, requiredRole: UserRole): boolean {
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;

    return userLevel >= requiredLevel;
  }
}
