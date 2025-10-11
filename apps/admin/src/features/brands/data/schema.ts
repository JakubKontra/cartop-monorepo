import { z } from 'zod'

export const brandSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().optional(),
  isActive: z.boolean(),
  isHighlighted: z.boolean(),
  isRecommended: z.boolean(),
  legacySystemId: z.string().optional(),
  legacySlug: z.string().optional(),
})

export type BrandFormValues = z.infer<typeof brandSchema>
