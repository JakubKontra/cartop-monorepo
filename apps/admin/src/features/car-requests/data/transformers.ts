/**
 * Data Transformers for CarRequest
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

import type { CarRequestFormValues } from './schema'
import type {
  CreateCarRequestInput,
  UpdateCarRequestInput,
  GetCarRequestQuery,
  GetAllCarRequestsQuery
} from '@/gql/graphql'

// Type alias for CarRequest from queries
export type CarRequest = NonNullable<GetCarRequestQuery['carRequest']>
export type CarRequestListItem = GetAllCarRequestsQuery['allCarRequests'][0]

/**
 * Helper function to convert GraphQL enum values (UPPERCASE) to lowercase
 * for use in forms and UI components
 */
function enumToLowercase<T extends string>(value: T | null | undefined): Lowercase<T> | undefined {
  return value?.toLowerCase() as Lowercase<T> | undefined
}

/**
 * Transform CarRequest from API to Form Values
 * Used for populating edit form with existing data
 */
export function toFormValues(carRequest: CarRequest | CarRequestListItem): CarRequestFormValues {
  return {
    // Request Information
    requestEmail: carRequest.requestEmail || '',
    requestPhone: carRequest.requestPhone || '',
    requestFirstName: carRequest.requestFirstName || '',
    requestLastName: carRequest.requestLastName || '',
    requestNewsletter: carRequest.requestNewsletter || false,
    requestPostalCode: carRequest.requestPostalCode || '',

    // Car Details
    brandId: carRequest.brandId || '',
    modelId: carRequest.modelId || '',
    financingType: enumToLowercase(carRequest.financingType) || 'cash',

    // Leasing
    leasingCompanyId: carRequest.leasingCompanyId || '',

    // Customer & Agent
    customerId: carRequest.customerId || '',
    assignedAgentId: carRequest.assignedAgentId || '',

    // Workflow & Status
    statusId: carRequest.statusId || '',
    stateId: carRequest.stateId || '',
    waitingForOffer: carRequest.waitingForOffer || false,

    // Notes
    notes: carRequest.notes || '',
    noteInternal: carRequest.noteInternal || '',
    gclid: carRequest.gclid || '',

    // Cancellation
    cancellationReason: enumToLowercase(carRequest.cancellationReason),
    cancellationNote: carRequest.cancellationNote || '',

    // Legacy
    legacySystemId: carRequest.legacySystemId || '',
    isFromLegacySystem: carRequest.isFromLegacySystem || false,
  }
}

/**
 * Transform Form Values to CreateCarRequestInput
 * Handles:
 * - Empty string → null conversion
 * - Date → ISO string conversion
 * - Removes undefined/empty optional fields
 */
export function toCreateInput(values: CarRequestFormValues): CreateCarRequestInput {
  return {
    // Request Information
    requestEmail: values.requestEmail || undefined,
    requestPhone: values.requestPhone || undefined,
    requestFirstName: values.requestFirstName || undefined,
    requestLastName: values.requestLastName || undefined,
    requestNewsletter: values.requestNewsletter || undefined,
    requestPostalCode: values.requestPostalCode || undefined,

    // Car Details (financingType is required)
    financingType: values.financingType,
    brandId: values.brandId || undefined,
    modelId: values.modelId || undefined,

    // Leasing
    leasingCompanyId: values.leasingCompanyId || undefined,

    // Customer & Agent
    customerId: values.customerId || undefined,
    assignedAgentId: values.assignedAgentId || undefined,

    // Workflow & Status
    statusId: values.statusId || undefined,
    stateId: values.stateId || undefined,
    waitingForOffer: values.waitingForOffer || undefined,

    // Notes
    notes: values.notes || undefined,
    noteInternal: values.noteInternal || undefined,
    gclid: values.gclid || undefined,

    // Cancellation
    cancellationReason: values.cancellationReason || undefined,
    cancellationNote: values.cancellationNote || undefined,

    // Legacy
    legacySystemId: values.legacySystemId || undefined,
    isFromLegacySystem: values.isFromLegacySystem || undefined,
  }
}

/**
 * Transform Form Values to UpdateCarRequestInput
 * Same logic as toCreateInput, but returns UpdateCarRequestInput type
 */
export function toUpdateInput(values: CarRequestFormValues): UpdateCarRequestInput {
  // UpdateCarRequestInput has the same shape as CreateCarRequestInput
  // (it's a PartialType in backend), so we can reuse the same logic
  return toCreateInput(values) as UpdateCarRequestInput
}

// ============================================================================
// Type-Level Tests (Compile-Time Only - Zero Runtime Cost)
// ============================================================================

import type { Expect, IsSubset } from '@/lib/type-utils'

/**
 * Test 1: Verify toCreateInput returns a valid CreateCarRequestInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestCreateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toCreateInput>, CreateCarRequestInput>
>

/**
 * Test 2: Verify toUpdateInput returns a valid UpdateCarRequestInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestUpdateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toUpdateInput>, UpdateCarRequestInput>
>

/**
 * Test 3: Verify toFormValues returns valid CarRequestFormValues
 * This ensures API data can be properly transformed to form values
 */
type _TestFormValuesCompatibility = Expect<
  IsSubset<ReturnType<typeof toFormValues>, CarRequestFormValues>
>

/**
 * If you see TypeScript errors here, it means:
 * - Your transformer is missing required fields from the GraphQL input type
 * - The types have drifted between form schema and GraphQL schema
 * - You need to update the transformer to match the latest GraphQL schema
 */
