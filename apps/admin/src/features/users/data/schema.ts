import { z } from 'zod'

// User roles matching backend UserRole enum
export const userRoleSchema = z.enum([
  'admin',
  'customerService',
  'marketing',
  'salesRepresentative',
  'juniorSalesRepresentative',
  'catalogManager',
  'customer',
  'public',
])

export type UserRole = z.infer<typeof userRoleSchema>

// User status type for UI display
export type UserStatus = 'active' | 'inactive' | 'invited' | 'suspended'

// User schema matching backend User entity
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  roles: z.array(userRoleSchema),
  phone: z.string().optional(),
  bio: z.string().optional(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof userSchema>

// Form schema for creating/updating users
export const userFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  roles: z.array(userRoleSchema).min(1, 'At least one role is required'),
  phone: z.string().optional(),
  bio: z.string().optional(),
})

export type UserFormValues = z.infer<typeof userFormSchema>

// Edit form schema - only uses existing User fields (no password, no username)
export const userEditFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  roles: z.array(userRoleSchema).min(1, 'At least one role is required'),
  phone: z.string().optional(),
  bio: z.string().optional(),
})

export type UserEditFormValues = z.infer<typeof userEditFormSchema>

export const userListSchema = z.array(userSchema)
