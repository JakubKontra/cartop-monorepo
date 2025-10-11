import { z } from 'zod'

export const brandSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().optional(),
  isActive: z.boolean().default(false),
  isHighlighted: z.boolean().default(false),
  isRecommended: z.boolean().default(false),
  legacySystemId: z.string().optional(),
  legacySlug: z.string().optional(),
})

export type BrandFormValues = z.infer<typeof brandSchema>
