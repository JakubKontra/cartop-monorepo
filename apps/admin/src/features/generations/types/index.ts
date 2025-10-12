export type Generation = {
  id: string
  name: string
  slug?: string | null
  legacySlug?: string | null
  description?: string | null
  productionStart?: string | null
  productionStop?: string | null
  wheelbase?: number | null
  frontTrack?: number | null
  rearTrack?: number | null
  length?: number | null
  width?: number | null
  height?: number | null
  trunkSpaceMin?: number | null
  trunkSpaceMax?: number | null
  bodyType?: string | null
  frontBrakesType?: string | null
  rearBrakesType?: string | null
  isActive: boolean
  legacySystemId?: string | null
  modelId: string
  model: {
    id: string
    name: string
    slug: string
    brand?: {
      id: string
      name: string
      slug: string
    } | null
  }
  brandId?: string | null
  brand?: {
    id: string
    name: string
    slug: string
  } | null
  createdAt: string
}
