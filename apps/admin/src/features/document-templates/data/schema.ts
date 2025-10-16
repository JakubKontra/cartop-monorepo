import { z } from 'zod'

export const documentTemplateSchema = z.object({
  leasingCompanyId: z.string().uuid('Must be a valid leasing company').optional().or(z.literal('')),
  isGlobal: z.boolean().optional().default(false),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  fieldName: z
    .string()
    .min(2, 'Field name must be at least 2 characters')
    .regex(/^[a-z0-9_]+$/, 'Field name must be lowercase alphanumeric with underscores only'),
  description: z.string().optional().or(z.literal('')),
  helpText: z.string().optional().or(z.literal('')),
  isRequired: z.boolean().default(true),
  acceptedFormats: z
    .array(z.string())
    .min(1, 'At least one format must be accepted')
    .default(['pdf', 'jpg', 'png']),
  maxSizeBytes: z
    .number()
    .int()
    .min(1024, 'Minimum size is 1KB')
    .max(10485760, 'Maximum size is 10MB')
    .default(5242880), // 5MB
  displayOrder: z.number().int().min(0).optional().default(0),
})

export type DocumentTemplateFormValues = z.infer<typeof documentTemplateSchema>
