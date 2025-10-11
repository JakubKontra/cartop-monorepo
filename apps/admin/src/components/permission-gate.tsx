import { type ReactNode } from 'react'
import { Permission, UserRole } from '@/lib/permissions'
import {
  usePermission,
  useAnyPermission,
  useAllPermissions,
  useAnyRole,
} from '@/hooks/use-permission'

/**
 * Props for PermissionGate component
 */
interface PermissionGateProps {
  /** Single permission required */
  permission?: Permission
  /** User must have ANY of these permissions */
  anyPermission?: Permission[]
  /** User must have ALL of these permissions */
  allPermissions?: Permission[]
  /** User must have ANY of these roles */
  anyRole?: UserRole[]
  /** Content to show if user has permission */
  children: ReactNode
  /** Optional fallback content to show if user lacks permission */
  fallback?: ReactNode
}

/**
 * PermissionGate Component
 *
 * Conditionally renders children based on user permissions or roles.
 * Use this to show/hide UI elements based on user access levels.
 *
 * IMPORTANT: This is NOT a security feature! Backend must always validate permissions.
 * This is purely for UX purposes (hiding/showing UI elements).
 *
 * @example
 * ```tsx
 * // Single permission check
 * <PermissionGate permission={Permission.CATALOG_BRANDS_CREATE}>
 *   <Button>Create Brand</Button>
 * </PermissionGate>
 *
 * // Any permission check (OR)
 * <PermissionGate
 *   anyPermission={[Permission.CATALOG_BRANDS_UPDATE, Permission.CATALOG_BRANDS_DELETE]}
 * >
 *   <ActionMenu />
 * </PermissionGate>
 *
 * // All permissions check (AND)
 * <PermissionGate
 *   allPermissions={[Permission.CATALOG_BRANDS_VIEW, Permission.CATALOG_BRANDS_UPDATE]}
 * >
 *   <EditForm />
 * </PermissionGate>
 *
 * // Role-based check
 * <PermissionGate anyRole={[UserRole.ADMIN, UserRole.CATALOG_MANAGER]}>
 *   <AdminPanel />
 * </PermissionGate>
 *
 * // With fallback
 * <PermissionGate
 *   permission={Permission.USERS_VIEW}
 *   fallback={<div>Access Denied</div>}
 * >
 *   <UsersList />
 * </PermissionGate>
 * ```
 */
export function PermissionGate({
  permission,
  anyPermission,
  allPermissions,
  anyRole,
  children,
  fallback = null,
}: PermissionGateProps) {
  const hasSinglePermission = usePermission(permission!)
  const hasAnyPerm = useAnyPermission(anyPermission || [])
  const hasAllPerms = useAllPermissions(allPermissions || [])
  const hasRole = useAnyRole(anyRole || [])

  // Determine if user has access based on provided props
  let hasAccess = false

  if (permission) {
    hasAccess = hasSinglePermission
  } else if (anyPermission && anyPermission.length > 0) {
    hasAccess = hasAnyPerm
  } else if (allPermissions && allPermissions.length > 0) {
    hasAccess = hasAllPerms
  } else if (anyRole && anyRole.length > 0) {
    hasAccess = hasRole
  } else {
    // No permission/role specified - show by default
    hasAccess = true
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>
}
