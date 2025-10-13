import { csTranslations } from './translations';

/**
 * Error key type - will be replaced by GraphQL Codegen generated enum
 * For now, we use string to match the ExceptionKeysEnum from backend
 */
export type ErrorKey = string;

/**
 * GraphQL Error with extensions
 */
export interface GraphQLErrorWithExtensions {
  message: string;
  extensions?: {
    key?: ErrorKey;
    errors?: Array<{
      key?: ErrorKey;
      message: string;
      parent?: string;
      jsonPayload?: string;
    }>;
    code?: number;
  };
}

/**
 * Translate an error key to Czech message
 *
 * @param key - Error key from ExceptionKeysEnum
 * @returns Czech translation or fallback message
 *
 * @example
 * ```typescript
 * const message = translateError('USER_DUPLICATE_EMAIL');
 * // Returns: "Tento e-mail je již registrován"
 * ```
 */
export function translateError(key?: ErrorKey | null): string {
  if (!key) {
    return 'Nastala neznámá chyba';
  }

  const translation = csTranslations[key as keyof typeof csTranslations];
  return translation || 'Nastala neznámá chyba';
}

/**
 * Format GraphQL errors to Czech messages
 * Extracts error keys from GraphQL error extensions and translates them
 *
 * @param errors - Array of GraphQL errors
 * @returns Array of Czech error messages
 *
 * @example
 * ```typescript
 * const errors = error.graphQLErrors;
 * const messages = formatGraphQLErrors(errors);
 * messages.forEach(msg => toast.error(msg));
 * ```
 */
export function formatGraphQLErrors(
  errors?: readonly GraphQLErrorWithExtensions[] | null,
): string[] {
  if (!errors || errors.length === 0) {
    return ['Nastala neznámá chyba'];
  }

  return errors.map((error) => {
    const key = error.extensions?.key;
    return key ? translateError(key) : error.message;
  });
}

/**
 * Get the first error message from GraphQL errors
 * Useful for displaying a single error message in forms
 *
 * @param errors - Array of GraphQL errors
 * @returns First Czech error message
 *
 * @example
 * ```typescript
 * const errorMessage = getFirstErrorMessage(error.graphQLErrors);
 * setFormError(errorMessage);
 * ```
 */
export function getFirstErrorMessage(
  errors?: readonly GraphQLErrorWithExtensions[] | null,
): string {
  const messages = formatGraphQLErrors(errors);
  return messages[0] || 'Nastala neznámá chyba';
}

/**
 * Extract field-specific errors from GraphQL error
 * Useful for displaying errors next to form fields
 *
 * @param errors - Array of GraphQL errors
 * @returns Object mapping field names to error messages
 *
 * @example
 * ```typescript
 * const fieldErrors = getFieldErrors(error.graphQLErrors);
 * // Returns: { email: "Tento e-mail je již registrován", ... }
 *
 * setFieldError('email', fieldErrors.email);
 * ```
 */
export function getFieldErrors(
  errors?: readonly GraphQLErrorWithExtensions[] | null,
): Record<string, string> {
  if (!errors || errors.length === 0) {
    return {};
  }

  const fieldErrors: Record<string, string> = {};

  for (const error of errors) {
    const errorDetails = error.extensions?.errors;
    if (errorDetails) {
      for (const detail of errorDetails) {
        if (detail.parent) {
          // Priority: field-level key > error-level key > English message
          const errorKey = detail.key || error.extensions?.key;
          fieldErrors[detail.parent] = errorKey
            ? translateError(errorKey)
            : detail.message;
        }
      }
    }
  }

  return fieldErrors;
}
