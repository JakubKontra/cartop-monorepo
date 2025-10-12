import { z } from 'zod'

/**
 * URL validation schema
 */
export const urlSchema = z
  .string()
  .url('Zadejte prosím platnou URL adresu')

/**
 * Optional URL validation schema
 */
export const optionalUrlSchema = z
  .string()
  .url('Zadejte prosím platnou URL adresu')
  .optional()
  .or(z.literal(''))
