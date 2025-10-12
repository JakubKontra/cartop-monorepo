import { z } from 'zod'
import { CatalogBodyType, CatalogEquipmentBrakeType } from '@/gql/graphql'

// Create schema that matches GraphQL types exactly
// Using auto-generated enum types from GraphQL codegen
export const generationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().optional(),
  legacySlug: z.string().min(2, 'Legacy slug must be at least 2 characters').optional(),
  modelId: z.string().uuid('Please select a valid model'),
  brandId: z.string().uuid('Please select a valid brand').optional().or(z.literal('')),
  description: z.string().optional(),
  productionStart: z.string().optional(),
  productionStop: z.string().optional(),
  // Number fields - match GraphQL Int type
  wheelbase: z.number().int().optional().nullable(),
  frontTrack: z.number().int().optional().nullable(),
  rearTrack: z.number().int().optional().nullable(),
  length: z.number().int().optional().nullable(),
  width: z.number().int().optional().nullable(),
  height: z.number().int().optional().nullable(),
  trunkSpaceMin: z.number().int().optional().nullable(),
  trunkSpaceMax: z.number().int().optional().nullable(),
  // Enum fields - use auto-generated enum types with nativeEnum
  bodyType: z.nativeEnum(CatalogBodyType).optional().nullable(),
  frontBrakesType: z.nativeEnum(CatalogEquipmentBrakeType).optional().nullable(),
  rearBrakesType: z.nativeEnum(CatalogEquipmentBrakeType).optional().nullable(),
  isActive: z.boolean(),
  legacySystemId: z.string().optional(),
})

export type GenerationFormValues = z.infer<typeof generationSchema>
