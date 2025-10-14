import { useMemo } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import {
  type Permission,
  UserRole,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasAnyRole,
  getUserPermissions,
  canAccessRoute,
} from '@/lib/permissions'

/**
 * Hook to check if current user has a specific permission
 *
 * @param permission - The permission to check
 * @returns true if user has the permission
 *
 * @example
 * ```tsx
 * function BrandActions() {
 *   const canCreate = usePermission(Permission.CATALOG_BRANDS_CREATE)
 *
 *   return (
 *     <div>
 *       {canCreate && <Button onClick={handleCreate}>Create Brand</Button>}
 *     </div>
 *   )
 * }
 * ```
 */
export function usePermission(permission: Permission): boolean {
  const { auth } = useAuthStore()
  const userRoles = auth.user?.roles || []

  return useMemo(() => hasPermission(userRoles, permission), [userRoles, permission])
}

/**
 * Hook to check if current user has ANY of the specified permissions
 *
 * @param permissions - Array of permissions to check
 * @returns true if user has at least one permission
 *
 * @example
 * ```tsx
 * function BrandActions() {
 *   const canModify = useAnyPermission([
 *     Permission.CATALOG_BRANDS_UPDATE,
 *     Permission.CATALOG_BRANDS_DELETE
 *   ])
 *
 *   return canModify ? <ActionMenu /> : null
 * }
 * ```
 */
export function useAnyPermission(permissions: Permission[]): boolean {
  const { auth } = useAuthStore()
  const userRoles = auth.user?.roles || []

  return useMemo(
    () => hasAnyPermission(userRoles, permissions),
    [userRoles, permissions]
  )
}

/**
 * Hook to check if current user has ALL of the specified permissions
 *
 * @param permissions - Array of permissions to check
 * @returns true if user has all permissions
 */
export function useAllPermissions(permissions: Permission[]): boolean {
  const { auth } = useAuthStore()
  const userRoles = auth.user?.roles || []

  return useMemo(
    () => hasAllPermissions(userRoles, permissions),
    [userRoles, permissions]
  )
}

/**
 * Hook to check if current user has ANY of the specified roles
 *
 * @param roles - Array of roles to check
 * @returns true if user has at least one role
 *
 * @example
 * ```tsx
 * function AdminPanel() {
 *   const isAdminOrManager = useAnyRole([UserRole.ADMIN, UserRole.CATALOG_MANAGER])
 *
 *   if (!isAdminOrManager) {
 *     return <Forbidden />
 *   }
 *
 *   return <AdminDashboard />
 * }
 * ```
 */
export function useAnyRole(roles: UserRole[]): boolean {
  const { auth } = useAuthStore()
  const userRoles = auth.user?.roles || []

  return useMemo(() => hasAnyRole(userRoles, roles), [userRoles, roles])
}

/**
 * Hook to get all permissions for the current user
 *
 * @returns Array of permissions the user has
 *
 * @example
 * ```tsx
 * function PermissionsDebug() {
 *   const permissions = useUserPermissions()
 *
 *   return (
 *     <div>
 *       <h3>Your Permissions:</h3>
 *       <ul>
 *         {permissions.map(p => <li key={p}>{p}</li>)}
 *       </ul>
 *     </div>
 *   )
 * }
 * ```
 */
export function useUserPermissions(): Permission[] {
  const { auth } = useAuthStore()
  const userRoles = auth.user?.roles || []

  return useMemo(() => getUserPermissions(userRoles), [userRoles])
}

/**
 * Hook to check if current user can access a specific route
 *
 * @param route - Route path to check
 * @returns true if user can access the route
 *
 * @example
 * ```tsx
 * function Navigation() {
 *   const canAccessUsers = useCanAccessRoute('/users')
 *
 *   return (
 *     <nav>
 *       <Link to="/">Dashboard</Link>
 *       {canAccessUsers && <Link to="/users">Users</Link>}
 *     </nav>
 *   )
 * }
 * ```
 */
export function useCanAccessRoute(route: string): boolean {
  const { auth } = useAuthStore()
  const userRoles = auth.user?.roles || []

  return useMemo(() => canAccessRoute(userRoles, route), [userRoles, route])
}

/**
 * Hook to check if current user is an admin
 *
 * @returns true if user has ADMIN role
 */
export function useIsAdmin(): boolean {
  const { auth } = useAuthStore()
  const userRoles = auth.user?.roles || []

  return useMemo(
    () =>
      userRoles.some(
        (role) => role.toLowerCase() === UserRole.ADMIN.toLowerCase()
      ),
    [userRoles]
  )
}
