import { z } from 'zod'

export const leasingCompanySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  logoId: z.string().uuid('Must be a valid UUID').optional().or(z.literal('')),
})

export type LeasingCompanyFormValues = z.infer<typeof leasingCompanySchema>
