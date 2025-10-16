/**
 * Data Transformers for Onboarding
 *
 * This file contains utility functions to transform data between different representations:
 * - GraphQL types (from backend API)
 * - Form types (Zod validated form values)
 *
 * This approach ensures:
 * - Single source of truth for data transformation logic
 * - Type safety between frontend and backend
 * - No manual field mapping in page components
 */
import type {
  ValidateDocumentInput,
  GetOnboardingQuery,
  GetAllOnboardingsQuery,
  OnboardingStatus,
} from '@/gql/graphql'
// ============================================================================
// Type-Level Tests (Compile-Time Only - Zero Runtime Cost)
// ============================================================================

import type { Expect, IsSubset } from '@/lib/type-utils'
import type {
  OnboardingCreateFormValues,
  DocumentValidationFormValues,
  OnboardingStatusUpdateFormValues,
} from './schema'

// Type alias for Onboarding from queries
export type Onboarding = NonNullable<GetOnboardingQuery['onboarding']>
export type OnboardingListItem = GetAllOnboardingsQuery['allOnboardings'][0]

/**
 * Transform Form Values to Create Onboarding Variables
 * Used when creating a new onboarding session
 */
export function toCreateOnboardingVariables(
  values: OnboardingCreateFormValues
): { carRequestId: string; expirationDays?: number } {
  return {
    carRequestId: values.carRequestId,
    expirationDays: values.expirationDays,
  }
}

/**
 * Transform Form Values to ValidateDocumentInput
 * Handles:
 * - Empty string → null conversion for note
 */
export function toDocumentValidationInput(
  values: DocumentValidationFormValues
): ValidateDocumentInput {
  return {
    status: values.status,
    note: values.note || null,
  }
}

/**
 * Transform Form Values to Update Status Variables
 * Used when manually updating onboarding status
 */
export function toUpdateStatusVariables(
  values: OnboardingStatusUpdateFormValues
): { status: OnboardingStatus } {
  return {
    status: values.status as OnboardingStatus,
  }
}

/**
 * Test 1: Verify toDocumentValidationInput returns a valid ValidateDocumentInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestValidateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toDocumentValidationInput>, ValidateDocumentInput>
>

/**
 * If you see TypeScript errors here, it means:
 * - Your transformer is missing required fields from the GraphQL input type
 * - The types have drifted between form schema and GraphQL schema
 * - You need to update the transformer to match the latest GraphQL schema
 */
