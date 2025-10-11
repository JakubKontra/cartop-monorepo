import { UserRole } from '../enums/role.enum';

/**
 * Centralized Permission Configuration
 *
 * This file defines all permissions in the system and maps them to roles.
 *
 * Key Features:
 * - Single source of truth for all permissions
 * - Easy to understand and maintain
 * - ADMIN role automatically has access to everything
 * - Users with multiple roles get union of all permissions
 *
 * Permission Naming Convention:
 * - Use dot notation: resource.entity.action
 * - Examples: 'catalog.brands.create', 'users.update', 'audit.view'
 */

export enum Permission {
  // ==================== CATALOG PERMISSIONS ====================

  // Catalog Brands
  CATALOG_BRANDS_VIEW = 'catalog.brands.view',
  CATALOG_BRANDS_CREATE = 'catalog.brands.create',
  CATALOG_BRANDS_UPDATE = 'catalog.brands.update',
  CATALOG_BRANDS_DELETE = 'catalog.brands.delete',

  // Catalog Models
  CATALOG_MODELS_VIEW = 'catalog.models.view',
  CATALOG_MODELS_CREATE = 'catalog.models.create',
  CATALOG_MODELS_UPDATE = 'catalog.models.update',
  CATALOG_MODELS_DELETE = 'catalog.models.delete',

  // Catalog Colors
  CATALOG_COLORS_VIEW = 'catalog.colors.view',
  CATALOG_COLORS_CREATE = 'catalog.colors.create',
  CATALOG_COLORS_UPDATE = 'catalog.colors.update',
  CATALOG_COLORS_DELETE = 'catalog.colors.delete',

  // ==================== USER MANAGEMENT PERMISSIONS ====================

  USERS_VIEW = 'users.view',
  USERS_CREATE = 'users.create',
  USERS_UPDATE = 'users.update',
  USERS_DELETE = 'users.delete',
  USERS_IMPERSONATE = 'users.impersonate',

  // ==================== AUDIT & SYSTEM PERMISSIONS ====================

  AUDIT_VIEW = 'audit.view',
  AUDIT_EXPORT = 'audit.export',
}

/**
 * Permission to Roles mapping
 * Defines which roles have access to each permission
 *
 * Note: ADMIN role is automatically granted all permissions via the permission checking logic
 */
export const PERMISSION_ROLES: Record<Permission, UserRole[]> = {
  // Catalog Brands
  [Permission.CATALOG_BRANDS_VIEW]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
    UserRole.SALES_REPRESENTATIVE,
    UserRole.JUNIOR_SALES_REPRESENTATIVE,
  ],
  [Permission.CATALOG_BRANDS_CREATE]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
  ],
  [Permission.CATALOG_BRANDS_UPDATE]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
  ],
  [Permission.CATALOG_BRANDS_DELETE]: [
    UserRole.ADMIN,
  ],

  // Catalog Models
  [Permission.CATALOG_MODELS_VIEW]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
    UserRole.SALES_REPRESENTATIVE,
    UserRole.JUNIOR_SALES_REPRESENTATIVE,
  ],
  [Permission.CATALOG_MODELS_CREATE]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
  ],
  [Permission.CATALOG_MODELS_UPDATE]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
  ],
  [Permission.CATALOG_MODELS_DELETE]: [
    UserRole.ADMIN,
  ],

  // Catalog Colors
  [Permission.CATALOG_COLORS_VIEW]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
    UserRole.SALES_REPRESENTATIVE,
  ],
  [Permission.CATALOG_COLORS_CREATE]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
  ],
  [Permission.CATALOG_COLORS_UPDATE]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
  ],
  [Permission.CATALOG_COLORS_DELETE]: [
    UserRole.ADMIN,
  ],

  // User Management
  [Permission.USERS_VIEW]: [
    UserRole.ADMIN,
  ],
  [Permission.USERS_CREATE]: [
    UserRole.ADMIN,
  ],
  [Permission.USERS_UPDATE]: [
    UserRole.ADMIN,
  ],
  [Permission.USERS_DELETE]: [
    UserRole.ADMIN,
  ],
  [Permission.USERS_IMPERSONATE]: [
    UserRole.ADMIN,
  ],

  // Audit
  [Permission.AUDIT_VIEW]: [
    UserRole.ADMIN,
    UserRole.CUSTOMER_SERVICE,
  ],
  [Permission.AUDIT_EXPORT]: [
    UserRole.ADMIN,
  ],
};

/**
 * Check if a user has a specific permission
 *
 * @param userRoles - Array of roles the user has
 * @param permission - The permission to check
 * @returns true if user has the permission
 */
export function hasPermission(userRoles: UserRole[], permission: Permission): boolean {
  // Admin always has all permissions
  if (userRoles.includes(UserRole.ADMIN)) {
    return true;
  }

  const allowedRoles = PERMISSION_ROLES[permission];
  if (!allowedRoles) {
    return false;
  }

  // Check if user has any of the allowed roles
  return userRoles.some(role => allowedRoles.includes(role));
}

/**
 * Get all permissions for a user based on their roles
 *
 * @param userRoles - Array of roles the user has
 * @returns Array of permissions the user has
 */
export function getUserPermissions(userRoles: UserRole[]): Permission[] {
  // Admin has all permissions
  if (userRoles.includes(UserRole.ADMIN)) {
    return Object.values(Permission);
  }

  const permissions = new Set<Permission>();

  // Collect all permissions from all user roles
  Object.entries(PERMISSION_ROLES).forEach(([permission, allowedRoles]) => {
    if (userRoles.some(role => allowedRoles.includes(role))) {
      permissions.add(permission as Permission);
    }
  });

  return Array.from(permissions);
}
