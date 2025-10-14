import { type ApolloError } from '@apollo/client/core'
import { logger } from '@/lib/logger'

/**
 * Type for errors with nested errors array
 */
interface ErrorWithErrors {
  errors: Array<{
    message?: string
    extensions?: {
      errors?: Array<{ message?: string }>
    }
  }>
}

/**
 * Extracts the actual error message from a GraphQL error
 *
 * GraphQL errors can have nested error messages in extensions.errors[].message
 * This function extracts the most specific error message available
 *
 * @param error - The Apollo/GraphQL error object
 * @returns The extracted error message or a fallback message
 *
 * @example
 * // For permission errors:
 * extractGraphQLErrorMessage(error)
 * // Returns: "Insufficient permissions. Required roles: admin. User has: catalogManager"
 *
 * // For generic errors:
 * extractGraphQLErrorMessage(error)
 * // Returns: "Internal server error" or the actual error message
 */
export function extractGraphQLErrorMessage(error: ApolloError | Error | unknown): string {
  // Debug logging in development
  logger.debug('Extracting GraphQL error message', { error })

  // Handle ApolloError and CombinedGraphQLErrors
  if (error && typeof error === 'object') {
    // First, check if it has a direct 'errors' array (common in Apollo errors)
    if ('errors' in error && Array.isArray((error as ErrorWithErrors).errors)) {
      const errors = (error as ErrorWithErrors).errors
      if (errors.length > 0) {
        const firstError = errors[0]

        logger.debug('Found first error in errors array', {
          firstError,
          extensions: firstError.extensions,
        })

        // Check for errors array in extensions (this is where the actual message is)
        if (firstError.extensions?.errors && Array.isArray(firstError.extensions.errors)) {
          const nestedErrors = firstError.extensions.errors as Array<{ message?: string }>
          if (nestedErrors.length > 0 && nestedErrors[0].message) {
            logger.debug('Extracted nested error message', {
              message: nestedErrors[0].message,
            })
            return nestedErrors[0].message
          }
        }

        // Fallback to the main error message if it's not "Internal server error"
        if (firstError.message && firstError.message !== 'Internal server error') {
          return firstError.message
        }
      }
    }

    // Check for graphQLErrors array (standard Apollo errors)
    if ('graphQLErrors' in error) {
      const apolloError = error as ApolloError

      if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
        const firstError = apolloError.graphQLErrors[0]

        // Check for errors array in extensions
        if (firstError.extensions?.errors && Array.isArray(firstError.extensions.errors)) {
          const nestedErrors = firstError.extensions.errors as Array<{ message?: string }>
          if (nestedErrors.length > 0 && nestedErrors[0].message) {
            return nestedErrors[0].message
          }
        }

        // Fallback to the main error message
        if (firstError.message && firstError.message !== 'Internal server error') {
          return firstError.message
        }

        // If we have "Internal server error", try to get more details from extensions
        if (firstError.message === 'Internal server error' && firstError.extensions) {
          const ext = firstError.extensions as Record<string, unknown>

          if (ext.exception && typeof ext.exception === 'object') {
            const exception = ext.exception as Record<string, unknown>
            if (exception.message && typeof exception.message === 'string') {
              return exception.message
            }
          }
        }

        // Return the message even if it's "Internal server error" as last resort
        if (firstError.message) {
          return firstError.message
        }
      }

      // Fallback to Apollo error message
      if (apolloError.message) {
        return apolloError.message
      }
    }
  }

  // Handle standard Error
  if (error instanceof Error) {
    return error.message
  }

  // Handle unknown error types
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message)
  }

  // Final fallback
  return 'An unexpected error occurred'
}

/**
 * Gets all error messages from a GraphQL error
 * Useful when there are multiple errors to display
 *
 * @param error - The Apollo/GraphQL error object
 * @returns Array of error messages
 */
export function extractAllGraphQLErrorMessages(error: ApolloError | Error | unknown): string[] {
  const messages: string[] = []

  if (error && typeof error === 'object' && 'graphQLErrors' in error) {
    const apolloError = error as ApolloError

    if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
      for (const gqlError of apolloError.graphQLErrors) {
        // Check for nested errors in extensions
        if (gqlError.extensions?.errors && Array.isArray(gqlError.extensions.errors)) {
          const nestedErrors = gqlError.extensions.errors as Array<{ message?: string }>
          for (const nestedError of nestedErrors) {
            if (nestedError.message) {
              messages.push(nestedError.message)
            }
          }
        } else if (gqlError.message) {
          // Fallback to the main error message
          messages.push(gqlError.message)
        }
      }
    }

    // If no messages extracted yet, use the main Apollo error message
    if (messages.length === 0 && apolloError.message) {
      messages.push(apolloError.message)
    }
  } else if (error instanceof Error) {
    messages.push(error.message)
  }

  return messages.length > 0 ? messages : ['An unexpected error occurred']
}
