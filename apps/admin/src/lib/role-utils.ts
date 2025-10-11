import {
  Shield,
  MessageSquare,
  Users,
  Briefcase,
  UserCircle,
  Package,
  UserCheck,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import { type UserRole } from '@/features/users/data/schema'

/**
 * Role display configuration
 * Maps role enum values to human-readable labels and icons
 */
export const ROLE_CONFIG: Record<
  UserRole,
  {
    icon: LucideIcon
  }
> = {
  admin: {
    icon: Shield,
  },
  customerService: {
    icon: MessageSquare,
  },
  marketing: {
    icon: Users,
  },
  salesRepresentative: {
    icon: Briefcase,
  },
  juniorSalesRepresentative: {
    icon: UserCircle,
  },
  catalogManager: {
    icon: Package,
  },
  customer: {
    icon: UserCheck,
  },
  public: {
    icon: Globe,
  },
}

/**
 * Get human-readable label for a role
 * @param role - The role enum value (supports both camelCase and UPPER_SNAKE_CASE)
 * @returns Human-readable role name
 */
export function getRoleLabel(role: UserRole | string): string {
  // Normalize the role to camelCase if it's in UPPER_SNAKE_CASE
  const normalizedRole = typeof role === 'string' && role.includes('_')
    ? role.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    : role

  // Simplified role labels mapping
  const roleLabels: Record<string, string> = {
    juniorSalesRepresentative: 'Junior Sales Representative',
    salesRepresentative: 'Sales Representative',
    admin: 'Admin',
    catalogManager: 'Catalog Manager',
    customerService: 'Customer Service',
    marketing: 'Marketing',
    customer: 'Customer',
    public: 'Public',
  }

  return roleLabels[normalizedRole] || normalizedRole
}

/**
 * Get icon component for a role
 * @param role - The role enum value (supports both camelCase and UPPER_SNAKE_CASE)
 * @returns Lucide icon component
 */
export function getRoleIcon(role: UserRole | string): LucideIcon {
  // Normalize the role to camelCase if it's in UPPER_SNAKE_CASE
  const normalizedRole = (typeof role === 'string' && role.includes('_')
    ? role.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    : role) as UserRole

  return ROLE_CONFIG[normalizedRole]?.icon || UserCheck
}

/**
 * Get multiple role labels
 * @param roles - Array of role enum values (supports both camelCase and UPPER_SNAKE_CASE)
 * @returns Array of human-readable role names
 */
export function getRoleLabels(roles: (UserRole | string)[]): string[] {
  return roles.map((role) => getRoleLabel(role))
}

/**
 * Format roles as a comma-separated string
 * @param roles - Array of role enum values (supports both camelCase and UPPER_SNAKE_CASE)
 * @param maxRoles - Maximum number of roles to display before truncating (default: all)
 * @returns Formatted string of role names
 */
export function formatRoles(
  roles: (UserRole | string)[],
  maxRoles?: number
): string {
  const labels = getRoleLabels(roles)

  if (!maxRoles || labels.length <= maxRoles) {
    return labels.join(', ')
  }

  const displayed = labels.slice(0, maxRoles)
  const remaining = labels.length - maxRoles
  return `${displayed.join(', ')} +${remaining} more`
}

/**
 * Get role configuration (label + icon)
 * @param role - The role enum value (supports both camelCase and UPPER_SNAKE_CASE)
 * @returns Configuration object with label and icon
 */
export function getRoleConfig(role: UserRole | string) {
  return {
    label: getRoleLabel(role),
    icon: getRoleIcon(role),
  }
}

/**
 * Check if a role exists in the configuration
 * @param role - The role enum value to check
 * @returns boolean indicating if role is valid
 */
export function isValidRole(role: string): role is UserRole {
  return role in ROLE_CONFIG
}
