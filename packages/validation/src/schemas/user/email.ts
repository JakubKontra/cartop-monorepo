import { z } from 'zod'

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .min(1, 'E-mail je povinný')
  .email('Zadejte prosím platnou e-mailovou adresu')

/**
 * Optional email validation schema
 */
export const optionalEmailSchema = z
  .string()
  .email('Zadejte prosím platnou e-mailovou adresu')
  .optional()
  .or(z.literal(''))
