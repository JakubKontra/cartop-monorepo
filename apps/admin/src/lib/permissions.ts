/**
 * Frontend Permission System
 *
 * This mirrors the backend permission configuration to enable
 * client-side UI filtering and conditional rendering based on user permissions.
 *
 * IMPORTANT: This is NOT a security feature - backend must always validate permissions!
 * This is purely for UX purposes (hiding/showing UI elements).
 */

/**
 * User Roles - Must match backend enum exactly
 */
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER_SERVICE = 'customerService',
  MARKETING = 'marketing',
  SALES_REPRESENTATIVE = 'salesRepresentative',
  JUNIOR_SALES_REPRESENTATIVE = 'juniorSalesRepresentative',
  CATALOG_MANAGER = 'catalogManager',
  CUSTOMER = 'customer',
  PUBLIC = 'public',
}

/**
 * Permissions - Must match backend enum exactly
 */
export enum Permission {
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

  // User Management
  USERS_VIEW = 'users.view',
  USERS_CREATE = 'users.create',
  USERS_UPDATE = 'users.update',
  USERS_DELETE = 'users.delete',
  USERS_IMPERSONATE = 'users.impersonate',

  // Audit
  AUDIT_VIEW = 'audit.view',
  AUDIT_EXPORT = 'audit.export',
}

/**
 * Permission to Roles mapping
 * Must match backend PERMISSION_ROLES exactly
 */
const PERMISSION_ROLES: Record<Permission, UserRole[]> = {
  // Catalog Brands
  [Permission.CATALOG_BRANDS_VIEW]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
    UserRole.SALES_REPRESENTATIVE,
    UserRole.JUNIOR_SALES_REPRESENTATIVE,
  ],
  [Permission.CATALOG_BRANDS_CREATE]: [UserRole.ADMIN, UserRole.CATALOG_MANAGER],
  [Permission.CATALOG_BRANDS_UPDATE]: [UserRole.ADMIN, UserRole.CATALOG_MANAGER],
  [Permission.CATALOG_BRANDS_DELETE]: [UserRole.ADMIN],

  // Catalog Models
  [Permission.CATALOG_MODELS_VIEW]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
    UserRole.SALES_REPRESENTATIVE,
    UserRole.JUNIOR_SALES_REPRESENTATIVE,
  ],
  [Permission.CATALOG_MODELS_CREATE]: [UserRole.ADMIN, UserRole.CATALOG_MANAGER],
  [Permission.CATALOG_MODELS_UPDATE]: [UserRole.ADMIN, UserRole.CATALOG_MANAGER],
  [Permission.CATALOG_MODELS_DELETE]: [UserRole.ADMIN],

  // Catalog Colors
  [Permission.CATALOG_COLORS_VIEW]: [
    UserRole.ADMIN,
    UserRole.CATALOG_MANAGER,
    UserRole.SALES_REPRESENTATIVE,
  ],
  [Permission.CATALOG_COLORS_CREATE]: [UserRole.ADMIN, UserRole.CATALOG_MANAGER],
  [Permission.CATALOG_COLORS_UPDATE]: [UserRole.ADMIN, UserRole.CATALOG_MANAGER],
  [Permission.CATALOG_COLORS_DELETE]: [UserRole.ADMIN],

  // User Management
  [Permission.USERS_VIEW]: [UserRole.ADMIN],
  [Permission.USERS_CREATE]: [UserRole.ADMIN],
  [Permission.USERS_UPDATE]: [UserRole.ADMIN],
  [Permission.USERS_DELETE]: [UserRole.ADMIN],
  [Permission.USERS_IMPERSONATE]: [UserRole.ADMIN],

  // Audit
  [Permission.AUDIT_VIEW]: [UserRole.ADMIN, UserRole.CUSTOMER_SERVICE],
  [Permission.AUDIT_EXPORT]: [UserRole.ADMIN],
}

/**
 * Check if user has a specific permission
 *
 * @param userRoles - Array of roles the user has (can be string[] or UserRole[])
 * @param permission - The permission to check
 * @returns true if user has the permission
 */
export function hasPermission(
  userRoles: string[] | UserRole[],
  permission: Permission
): boolean {
  // Admin always has all permissions
  if (userRoles.includes(UserRole.ADMIN)) {
    return true
  }

  const allowedRoles = PERMISSION_ROLES[permission]
  if (!allowedRoles) {
    return false
  }

  // Check if user has any of the allowed roles (case-insensitive)
  return userRoles.some((role) =>
    allowedRoles.some((allowedRole) => allowedRole.toLowerCase() === role.toLowerCase())
  )
}

/**
 * Check if user has ANY of the specified permissions
 *
 * @param userRoles - Array of roles the user has
 * @param permissions - Array of permissions to check
 * @returns true if user has at least one of the permissions
 */
export function hasAnyPermission(
  userRoles: string[] | UserRole[],
  permissions: Permission[]
): boolean {
  return permissions.some((permission) => hasPermission(userRoles, permission))
}

/**
 * Check if user has ALL of the specified permissions
 *
 * @param userRoles - Array of roles the user has
 * @param permissions - Array of permissions to check
 * @returns true if user has all of the permissions
 */
export function hasAllPermissions(
  userRoles: string[] | UserRole[],
  permissions: Permission[]
): boolean {
  return permissions.every((permission) => hasPermission(userRoles, permission))
}

/**
 * Check if user has any of the specified roles
 *
 * @param userRoles - Array of roles the user has
 * @param requiredRoles - Array of roles to check
 * @returns true if user has at least one of the required roles
 */
export function hasAnyRole(
  userRoles: string[] | UserRole[],
  requiredRoles: UserRole[]
): boolean {
  return userRoles.some((role) =>
    requiredRoles.some((reqRole) => reqRole.toLowerCase() === role.toLowerCase())
  )
}

/**
 * Get all permissions for a user based on their roles
 *
 * @param userRoles - Array of roles the user has
 * @returns Array of permissions the user has
 */
export function getUserPermissions(userRoles: string[] | UserRole[]): Permission[] {
  // Admin has all permissions
  if (userRoles.includes(UserRole.ADMIN)) {
    return Object.values(Permission)
  }

  const permissions = new Set<Permission>()

  // Collect all permissions from all user roles
  Object.entries(PERMISSION_ROLES).forEach(([permission, allowedRoles]) => {
    if (hasAnyRole(userRoles as UserRole[], allowedRoles)) {
      permissions.add(permission as Permission)
    }
  })

  return Array.from(permissions)
}

/**
 * Check if user can access a specific route
 *
 * @param userRoles - Array of roles the user has
 * @param route - Route path to check
 * @returns true if user can access the route
 */
export function canAccessRoute(userRoles: string[] | UserRole[], route: string): boolean {
  // Admin can access everything
  if (userRoles.includes(UserRole.ADMIN)) {
    return true
  }

  // Route to permission mapping
  const routePermissions: Record<string, Permission> = {
    '/brands': Permission.CATALOG_BRANDS_VIEW,
    '/models': Permission.CATALOG_MODELS_VIEW,
    '/users': Permission.USERS_VIEW,
  }

  const requiredPermission = routePermissions[route]
  if (!requiredPermission) {
    return true // No specific permission required for this route
  }

  return hasPermission(userRoles, requiredPermission)
}
