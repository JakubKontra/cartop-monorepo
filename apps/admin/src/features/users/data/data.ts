import { ROLE_CONFIG, getRoleLabel } from '@/lib/role-utils'
import { type UserStatus, type UserRole } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

// Roles matching backend UserRole enum
// Uses getRoleLabel for consistent label display
export const roles = (Object.entries(ROLE_CONFIG) as [UserRole, typeof ROLE_CONFIG[UserRole]][]).map(
  ([value, config]) => ({
    label: getRoleLabel(value),
    value,
    icon: config.icon,
  })
) as const
