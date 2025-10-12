import { z } from 'zod'

/**
 * UUID validation schema
 */
export const uuidSchema = z
  .string()
  .uuid('Neplatné UUID')
