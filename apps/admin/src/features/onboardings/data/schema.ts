import { z } from 'zod'

/**
 * Schema for creating a new onboarding
 */
export const onboardingCreateSchema = z.object({
  carRequestId: z.string().uuid('Must be a valid car request'),
  expirationDays: z
    .number()
    .int()
    .min(1, 'Expiration must be at least 1 day')
    .max(365, 'Expiration cannot exceed 365 days')
    .optional()
    .default(30),
})

export type OnboardingCreateFormValues = z.infer<typeof onboardingCreateSchema>

/**
 * Schema for validating a document
 */
export const documentValidationSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED'], {
    required_error: 'Please select a validation status',
  }),
  note: z.string().optional().or(z.literal('')),
})

export type DocumentValidationFormValues = z.infer<typeof documentValidationSchema>

/**
 * Schema for updating onboarding status
 */
export const onboardingStatusUpdateSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETE', 'INCOMPLETE', 'EXPIRED'], {
    required_error: 'Please select a status',
  }),
})

export type OnboardingStatusUpdateFormValues = z.infer<typeof onboardingStatusUpdateSchema>
