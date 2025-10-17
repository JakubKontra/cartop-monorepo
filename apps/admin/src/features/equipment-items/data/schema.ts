import { z } from 'zod'

// Equipment Item form schema
export const equipmentItemSchema = z.object({
  // Required fields
  name: z.string().min(2, 'Name must be at least 2 characters'),

  // Optional fields
  legacySystemId: z.string().optional(),
})

export type EquipmentItemFormValues = z.infer<typeof equipmentItemSchema>
