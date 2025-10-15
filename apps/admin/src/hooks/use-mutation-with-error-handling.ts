import { useMutation, type MutationHookOptions, type MutationResult } from '@apollo/client/react'
import { toast } from 'sonner'
import { extractGraphQLErrorMessage } from '@/lib/extract-graphql-error'
import { logger } from '@/lib/logger'
import type { DocumentNode } from 'graphql'

/**
 * Options for the mutation hook with enhanced error handling
 */
export interface MutationWithErrorHandlingOptions<TData, TVariables>
  extends MutationHookOptions<TData, TVariables> {
  /**
   * Success message to display in toast
   * Can be a string or a function that receives the result data
   */
  successMessage?: string | ((data: TData) => string)

  /**
   * Custom error message to display instead of extracted error
   * Can be a string or a function that receives the error
   */
  errorMessage?: string | ((error: unknown) => string)

  /**
   * Whether to show success toast (default: true)
   */
  showSuccessToast?: boolean

  /**
   * Whether to show error toast (default: true)
   */
  showErrorToast?: boolean

  /**
   * Additional context for error logging
   */
  errorContext?: Record<string, unknown>

  /**
   * Callback to execute on error (after toast is shown)
   */
  onErrorCallback?: (error: unknown) => void

  /**
   * Callback to execute on success (after toast is shown)
   */
  onSuccessCallback?: (data: TData) => void
}

/**
 * Enhanced useMutation hook with automatic error handling and toast notifications
 *
 * This hook wraps Apollo's useMutation and provides:
 * - Automatic error extraction from nested GraphQL errors
 * - Toast notifications for success/error states
 * - Structured error logging with context
 * - Type-safe success/error callbacks
 *
 * @example
 * ```tsx
 * const [deleteBrand, { loading }] = useMutationWithErrorHandling(
 *   DELETE_CATALOG_BRAND,
 *   {
 *     successMessage: 'Brand deleted successfully',
 *     errorMessage: 'Failed to delete brand',
 *     refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS }],
 *   }
 * )
 *
 * // In your handler
 * await deleteBrand({ variables: { id: brandId } })
 * ```
 *
 * @example
 * ```tsx
 * // With dynamic messages
 * const [createBrand, { loading }] = useMutationWithErrorHandling(
 *   CREATE_CATALOG_BRAND,
 *   {
 *     successMessage: (data) => `Brand "${data.createCatalogBrand.name}" created`,
 *     errorMessage: (error) => {
 *       const msg = extractGraphQLErrorMessage(error)
 *       if (msg.includes('foreign key')) {
 *         return 'Cannot delete: brand is in use by offers'
 *       }
 *       return msg
 *     },
 *   }
 * )
 * ```
 */
export function useMutationWithErrorHandling<TData = unknown, TVariables = unknown>(
  mutation: DocumentNode,
  options?: MutationWithErrorHandlingOptions<TData, TVariables>
): [
  (config?: Parameters<MutationResult<TData>['mutate']>[0]) => Promise<TData>,
  Omit<MutationResult<TData>, 'mutate'>,
] {
  const {
    successMessage,
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
    errorContext = {},
    onErrorCallback,
    onSuccessCallback,
    onCompleted,
    onError,
    ...apolloOptions
  } = options || {}

  const [mutate, mutationResult] = useMutation<TData, TVariables>(mutation, {
    ...apolloOptions,
    onCompleted: (data) => {
      // Show success toast
      if (showSuccessToast && successMessage) {
        const message = typeof successMessage === 'function' ? successMessage(data) : successMessage
        toast.success(message)
      }

      // Call custom success callback
      if (onSuccessCallback) {
        onSuccessCallback(data)
      }

      // Call original onCompleted if provided
      if (onCompleted) {
        onCompleted(data, null as never)
      }
    },
    onError: (error) => {
      // Extract the actual error message from nested GraphQL errors
      const extractedMessage = extractGraphQLErrorMessage(error)

      // Determine final error message to display
      let displayMessage = extractedMessage
      if (errorMessage) {
        displayMessage =
          typeof errorMessage === 'function' ? errorMessage(error) : errorMessage
      }

      // Log error with context
      logger.error('Mutation failed', error, {
        mutation: mutation.loc?.source.body,
        extractedMessage,
        ...errorContext,
      })

      // Show error toast
      if (showErrorToast) {
        toast.error(displayMessage)
      }

      // Call custom error callback
      if (onErrorCallback) {
        onErrorCallback(error)
      }

      // Call original onError if provided
      if (onError) {
        onError(error, null as never)
      }
    },
  })

  // Wrap the mutate function to handle errors that aren't caught by onError
  const wrappedMutate = async (
    config?: Parameters<MutationResult<TData>['mutate']>[0]
  ): Promise<TData> => {
    try {
      const result = await mutate(config)

      // Check if there are errors in the result (Apollo errorPolicy: 'all' returns both data and errors)
      if (result.errors && result.errors.length > 0) {
        throw result.errors[0]
      }

      if (!result.data) {
        throw new Error('Mutation returned no data')
      }
      return result.data
    } catch (error) {
      // Error is already handled by onError callback
      // Re-throw for caller's try-catch if needed
      throw error
    }
  }

  return [wrappedMutate, mutationResult]
}
