import { ExceptionKeysEnum } from '../exceptions/keys';

/**
 * Maps class-validator constraint types to error keys
 * This allows us to return translation keys instead of hardcoded messages
 *
 * The frontend will translate these keys to localized messages
 */
export const VALIDATION_ERROR_KEY_MAP: Record<string, string> = {
  // Email validation
  isEmail: ExceptionKeysEnum.VALIDATION_EMAIL_INVALID,

  // String length
  minLength: ExceptionKeysEnum.VALIDATION_FIELD_TOO_SHORT,
  maxLength: ExceptionKeysEnum.VALIDATION_FIELD_TOO_LONG,

  // Required fields
  isNotEmpty: ExceptionKeysEnum.VALIDATION_FIELD_REQUIRED,
  isDefined: ExceptionKeysEnum.VALIDATION_FIELD_REQUIRED,

  // UUID validation
  isUuid: ExceptionKeysEnum.VALIDATION_UUID_INVALID,

  // URL validation
  isUrl: ExceptionKeysEnum.VALIDATION_URL_INVALID,

  // Regex/pattern matching
  matches: ExceptionKeysEnum.VALIDATION_FIELD_INVALID_FORMAT,
};

/**
 * Get field-specific error key based on field name and constraint type
 *
 * This function provides context-aware error keys for better user experience.
 * For example, "minLength" on a "password" field returns VALIDATION_PASSWORD_TOO_SHORT
 * instead of the generic VALIDATION_FIELD_TOO_SHORT.
 *
 * @param field - The field name (e.g., "email", "password", "firstName")
 * @param constraint - The class-validator constraint type (e.g., "isEmail", "minLength")
 * @returns Error key from ExceptionKeysEnum
 *
 * @example
 * getFieldSpecificErrorKey('password', 'minLength')
 * // Returns: 'VALIDATION_PASSWORD_TOO_SHORT'
 *
 * getFieldSpecificErrorKey('email', 'isEmail')
 * // Returns: 'VALIDATION_EMAIL_INVALID'
 */
export function getFieldSpecificErrorKey(
  field: string,
  constraint: string,
): string {
  // Password-specific rules
  if (field === 'password') {
    if (constraint === 'minLength') {
      return ExceptionKeysEnum.VALIDATION_PASSWORD_TOO_SHORT;
    }
    if (constraint === 'matches') {
      return ExceptionKeysEnum.VALIDATION_PASSWORD_TOO_WEAK;
    }
    if (constraint === 'isNotEmpty' || constraint === 'isDefined') {
      return ExceptionKeysEnum.VALIDATION_PASSWORD_REQUIRED;
    }
  }

  // Email-specific rules
  if (field === 'email') {
    if (constraint === 'isEmail') {
      return ExceptionKeysEnum.VALIDATION_EMAIL_INVALID;
    }
    if (constraint === 'isNotEmpty' || constraint === 'isDefined') {
      return ExceptionKeysEnum.VALIDATION_EMAIL_REQUIRED;
    }
  }

  // Name fields (firstName, lastName, name)
  if (['firstName', 'lastName', 'name'].includes(field)) {
    if (constraint === 'minLength') {
      return ExceptionKeysEnum.VALIDATION_NAME_TOO_SHORT;
    }
    if (constraint === 'isNotEmpty' || constraint === 'isDefined') {
      return ExceptionKeysEnum.VALIDATION_NAME_REQUIRED;
    }
  }

  // Fall back to generic mapping
  return (
    VALIDATION_ERROR_KEY_MAP[constraint] ||
    ExceptionKeysEnum.VALIDATION_ERROR
  );
}
