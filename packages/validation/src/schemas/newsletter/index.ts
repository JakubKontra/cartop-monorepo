/**
 * Newsletter entity validation schemas
 */

// Re-export email schema from user entity for newsletter use
export { emailSchema, optionalEmailSchema } from '../user/email'

// Newsletter-specific schemas
export { newsletterConsentSchema } from './consent'
