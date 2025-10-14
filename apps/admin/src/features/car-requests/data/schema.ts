import { z } from 'zod'

/**
 * Helper to transform empty strings to undefined
 * This ensures optional fields are properly handled by the API
 */
const optionalString = () =>
  z.string().optional().transform((val) => (val === '' ? undefined : val))

/**
 * Helper for optional email fields
 */
const optionalEmail = () =>
  z.string().email('Invalid email').optional().or(z.literal(''))
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
  requestPhone: optionalString(),
  requestFirstName: optionalString(),
  requestLastName: optionalString(),
  requestNewsletter: z.boolean().optional(),
  requestPostalCode: optionalString(),

  // Car Details
  brandId: optionalString(),
  modelId: optionalString(),
  financingType: z.enum(['cash', 'leasing']), // Required field

  // Leasing
  leasingCompanyId: optionalString(),

  // Customer & Agent
  customerId: optionalString(),
  assignedAgentId: optionalString(),

  // Workflow & Status
  statusId: optionalString(),
  stateId: optionalString(),
  order: z.number().optional(),
  displayOrder: z.number().optional(),
  waitingForOffer: z.boolean().optional(),

  // Dates - Date objects will be converted to ISO strings in transformers
  nextCallAt: z.date().optional(),
  confirmedAt: z.date().optional(),
  relayedAt: z.date().optional(),
  feedbackAt: z.date().optional(),
  closedAt: z.date().optional(),
  completedAt: z.date().optional(),

  // Notes
  notes: optionalString(),
  noteInternal: optionalString(),
  gclid: optionalString(),

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
  legacySystemId: optionalString(),
  isFromLegacySystem: z.boolean().optional(),
})

export type CarRequestFormValues = z.infer<typeof carRequestSchema>
