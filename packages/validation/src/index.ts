/**
 * @cartop/validation
 *
 * Shared validation schemas and error handling for the Cartop monorepo
 * Uses Zod for type-safe validation with Czech error messages
 * Organized by entity for better maintainability
 */

// User entity validation
export * from './schemas/user'

// Newsletter entity validation
export * from './schemas/newsletter'

// Common validation schemas
export * from './schemas/common'

// Error translations
export * from './translations'

// Error handler utilities
export * from './error-handler'
