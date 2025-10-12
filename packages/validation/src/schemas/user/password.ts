import { z } from 'zod'

/**
 * Password validation schema
 * Minimum 8 characters
 */
export const passwordSchema = z
  .string()
  .min(1, 'Heslo je povinné')
  .min(8, 'Heslo musí mít alespoň 8 znaků')

/**
 * Strong password validation schema
 * Requires: min 8 chars, uppercase, lowercase, number, special char
 */
export const strongPasswordSchema = z
  .string()
  .min(8, 'Heslo musí mít alespoň 8 znaků')
  .regex(/[A-Z]/, 'Heslo musí obsahovat alespoň jedno velké písmeno')
  .regex(/[a-z]/, 'Heslo musí obsahovat alespoň jedno malé písmeno')
  .regex(/[0-9]/, 'Heslo musí obsahovat alespoň jednu číslici')
  .regex(/[^A-Za-z0-9]/, 'Heslo musí obsahovat alespoň jeden speciální znak')

/**
 * Password confirmation schema factory
 * Use with .refine() to match password field
 *
 * @param passwordFieldName - Name of the password field to match against (default: 'password')
 * @example
 * const schema = z.object({
 *   password: passwordSchema,
 *   confirmPassword: z.string(),
 * }).refine((data) => data.password === data.confirmPassword, {
 *   message: 'Hesla se neshodují',
 *   path: ['confirmPassword'],
 * })
 */
export const createPasswordConfirmSchema = (passwordFieldName: string = 'password') => {
  return z.object({
    [passwordFieldName]: z.string(),
    confirmPassword: z.string().min(1, 'Potvrďte prosím heslo'),
  }).refine((data) => data[passwordFieldName] === data.confirmPassword, {
    message: 'Hesla se neshodují',
    path: ['confirmPassword'],
  })
}
