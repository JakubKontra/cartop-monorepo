import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../enums/role.enum';

export const ROLES_KEY = 'roles';

/**
 * Decorator to specify which roles can access a resolver/endpoint
 * Usage: @Roles(UserRole.ADMIN, UserRole.SALES_REPRESENTATIVE)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
