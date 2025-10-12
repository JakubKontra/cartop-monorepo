import { z } from 'zod'

/**
 * @TODO Support all
 * Czech phone number validation schema
 * Supports formats: +420 XXX XXX XXX, 420XXXXXXXXX, XXXXXXXXX
 */
export const phoneSchema = z
  .string()
  .regex(
    /^(\+420)?[0-9]{9}$/,
    'Zadejte prosím platné telefonní číslo (9 číslic)'
  )
  .optional()
  .or(z.literal(''))
