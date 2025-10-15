import { z } from 'zod'

/**
 * Helper to transform empty strings to undefined
 * This ensures optional fields are properly handled by the API
 */
const optionalString = (maxLength?: number) =>
  maxLength
    ? z.string().max(maxLength).optional().transform((val) => (val === '' ? undefined : val))
    : z.string().optional().transform((val) => (val === '' ? undefined : val))

/**
 * Helper for optional email fields
 */
const optionalEmail = () =>
  z.string().email('Invalid email').max(255).optional().or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val))

/**
 * Car Request Form Schema
 *
 * This schema validates form inputs and automatically transforms values
 * to match the GraphQL API expectations:
 * - Empty strings → undefined (for optional fields)
 * - Date objects are preserved (transformed to ISO strings in transformers.ts)
 */
export const carRequestSchema = z.object({
  // Request Information
  requestEmail: optionalEmail(),
  requestPhone: optionalString(50),
  requestFirstName: optionalString(100),
  requestLastName: optionalString(100),
  requestNewsletter: z.boolean().optional(),
  requestPostalCode: optionalString(20),

  // Car Details
  brandId: optionalString(),
  modelId: optionalString(),
  financingType: z.enum(['cash', 'leasing']).default('cash'), // Required field with default

  // Leasing
  leasingCompanyId: optionalString(),

  // Customer & Agent
  customerId: optionalString(),
  assignedAgentId: optionalString(),

  // Workflow & Status
  statusId: optionalString(),
  stateId: optionalString(),
  waitingForOffer: z.boolean().optional(),

  // Notes
  notes: optionalString(),
  noteInternal: optionalString(),
  gclid: optionalString(255),

  // Cancellation
  cancellationReason: z.enum([
    'other',
    'no_interest',
    'no_time',
    'no_money',
    'no_need',
    'no_opportunity',
    'no_other',
    'rejected_by_finance',
    'bad_credit_score',
    'ineligible_customer',
    'price_too_high',
    'car_unavailable',
    'wait_time_too_long',
    'competitor_offer',
    'changed_mind',
    'invalid_contact',
    'duplicate_request',
    'internal_error',
  ]).optional(),
  cancellationNote: optionalString(),

  // Legacy
  legacySystemId: optionalString(100),
  isFromLegacySystem: z.boolean().optional(),
})

// Note: Leasing company validation is handled by the backend
// Backend validates: if financingType === 'leasing', then leasingCompanyId is required
// This allows the form to be edited without requiring leasing company immediately

export type CarRequestFormValues = z.infer<typeof carRequestSchema>
