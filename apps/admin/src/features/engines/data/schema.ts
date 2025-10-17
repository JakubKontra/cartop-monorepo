import { z } from 'zod'
// TODO: After running codegen, these can be imported from '@/gql/graphql'
import {
  CatalogEngineFuelType,
  CatalogEngineTransmissionType,
  CatalogEngineDriveType,
} from './enums'

// Engine form schema matching GraphQL types
export const engineSchema = z.object({
  // Required fields
  name: z.string().min(2, 'Name must be at least 2 characters'),
  generationId: z.string().uuid('Please select a valid generation'),

  // Optional identifiers
  legacySystemId: z.string().optional(),

  // Engine type properties
  fuelType: z.nativeEnum(CatalogEngineFuelType).optional().nullable(),
  transmissionType: z
    .nativeEnum(CatalogEngineTransmissionType)
    .optional()
    .nullable(),
  driveType: z.nativeEnum(CatalogEngineDriveType).optional().nullable(),

  // Consumption (Float in GraphQL)
  consumptionCombined: z.number().optional().nullable(),
  consumptionCity: z.number().optional().nullable(),
  consumptionOutOfCity: z.number().optional().nullable(),

  // Performance (Int in GraphQL)
  performance: z.number().int().optional().nullable(),
  torque: z.number().int().optional().nullable(),
  volume: z.number().int().optional().nullable(),
  emission: z.number().int().optional().nullable(),
  rangeKm: z.number().int().optional().nullable(),
  fuelTankVolume: z.number().int().optional().nullable(),
  cylinderCount: z.number().int().optional().nullable(),
  maxSpeed: z.number().int().optional().nullable(),
  weight: z.number().int().optional().nullable(),
  gearsCount: z.number().int().optional().nullable(),

  // Acceleration (Float in GraphQL)
  acceleration: z.number().optional().nullable(),

  // Production period
  productionStart: z.string().optional(),
  productionStop: z.string().optional(),

  // Flags
  active: z.boolean(),
  recommended: z.boolean(),
})

export type EngineFormValues = z.infer<typeof engineSchema>
