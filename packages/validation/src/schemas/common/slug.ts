import { z } from 'zod'

/**
 * Slug validation schema
 * Only lowercase letters, numbers, and hyphens
 */
export const slugSchema = z
  .string()
  .min(1, 'Slug je povinný')
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug může obsahovat pouze malá písmena, čísla a pomlčky'
  )
