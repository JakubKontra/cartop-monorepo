import { z } from 'zod'

/**
 * Newsletter consent schema
 * Requires explicit true value for GDPR compliance
 */
export const newsletterConsentSchema = z
  .boolean()
  .refine((val) => val === true, 'Musíte souhlasit s odběrem newsletteru')
