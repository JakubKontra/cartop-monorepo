import { z } from 'zod'

/**
 * General GDPR consent validation schema
 * Requires explicit true value
 */
export const consentSchema = z
  .boolean()
  .refine((val) => val === true, 'Musíte souhlasit s podmínkami')

/**
 * Privacy policy consent schema
 * Requires explicit true value for GDPR compliance
 */
export const privacyPolicyConsentSchema = z
  .boolean()
  .refine((val) => val === true, 'Musíte souhlasit se zpracováním osobních údajů')
