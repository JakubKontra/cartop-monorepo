/**
 * Regex patterns used in validation schemas
 *
 * These patterns can be reused independently of Zod schemas,
 * for example with class-validator's @Matches() decorator in NestJS.
 *
 * For frontend validation, prefer using the Zod schemas from `../schemas`
 * which include proper error messages and type safety.
 */

// ============================================================================
// Password Validation Patterns
// ============================================================================

/**
 * Password must contain at least one uppercase letter (A-Z)
 * @example "Password123!" ✓ | "password123!" ✗
 */
export const PASSWORD_UPPERCASE = /[A-Z]/

/**
 * Password must contain at least one lowercase letter (a-z)
 * @example "Password123!" ✓ | "PASSWORD123!" ✗
 */
export const PASSWORD_LOWERCASE = /[a-z]/

/**
 * Password must contain at least one digit (0-9)
 * @example "Password123!" ✓ | "Password!" ✗
 */
export const PASSWORD_DIGIT = /[0-9]/

/**
 * Password must contain at least one special character
 * (any character that is not alphanumeric)
 * @example "Password123!" ✓ | "Password123" ✗
 */
export const PASSWORD_SPECIAL_CHAR = /[^A-Za-z0-9]/

/**
 * Strong password pattern - all requirements in one regex
 *
 * Requires:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one special character
 *
 * Uses positive lookahead assertions for cleaner validation
 *
 * @example "Password123!" ✓ | "password" ✗
 */
export const PASSWORD_STRONG = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/

// ============================================================================
// Email Validation Patterns
// ============================================================================

/**
 * Basic email pattern for simple validation
 *
 * **Note:** For production use, prefer Zod's `.email()` validator which uses
 * a more robust RFC 5322 compliant regex. This pattern is provided for
 * reference or simple server-side validation.
 *
 * Matches: local-part@domain.tld
 * - Local part: any non-whitespace except @
 * - Domain: any non-whitespace except @
 * - TLD: any non-whitespace except @
 *
 * @example "user@example.com" ✓ | "invalid.email" ✗
 */
export const EMAIL_BASIC = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * More comprehensive email pattern (closer to RFC 5322)
 *
 * This is still a simplified version. For full RFC 5322 compliance,
 * use Zod's `.email()` validator.
 *
 * @example "user.name+tag@example.co.uk" ✓
 */
export const EMAIL_COMPREHENSIVE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// ============================================================================
// Usage Examples
// ============================================================================

/**
 * @example Backend (NestJS class-validator)
 * ```typescript
 * import { PASSWORD_STRONG } from '@cartop/validation'
 *
 * class CreateUserDto {
 *   @Matches(PASSWORD_STRONG, {
 *     message: 'Password must contain uppercase, lowercase, digit, and special char'
 *   })
 *   password: string
 * }
 * ```
 *
 * @example Frontend (Zod - prefer using schemas instead)
 * ```typescript
 * import { strongPasswordSchema } from '@cartop/validation'
 *
 * const schema = z.object({
 *   password: strongPasswordSchema
 * })
 * ```
 *
 * @example Custom validation
 * ```typescript
 * import { PASSWORD_UPPERCASE, PASSWORD_DIGIT } from '@cartop/validation'
 *
 * function validatePassword(password: string): boolean {
 *   return PASSWORD_UPPERCASE.test(password) && PASSWORD_DIGIT.test(password)
 * }
 * ```
 */
