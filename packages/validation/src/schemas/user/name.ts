import { z } from 'zod'

/**
 * General name validation schema
 * Minimum 2 characters
 */
export const nameSchema = z
  .string()
  .min(1, 'Jméno je povinné')
  .min(2, 'Jméno musí mít alespoň 2 znaky')

/**
 * First name validation schema
 * Minimum 2 characters
 */
export const firstNameSchema = z
  .string()
  .min(1, 'Křestní jméno je povinné')
  .min(2, 'Křestní jméno musí mít alespoň 2 znaky')

/**
 * Last name validation schema
 * Minimum 2 characters
 */
export const lastNameSchema = z
  .string()
  .min(1, 'Příjmení je povinné')
  .min(2, 'Příjmení musí mít alespoň 2 znaky')
