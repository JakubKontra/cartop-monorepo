export interface Model {
  id: string
  name: string
  slug: string
  description?: string | null
  isActive: boolean
  isHighlighted: boolean
  isRecommended: boolean
  legacySystemId?: string | null
  legacySlug?: string | null
  brandId: string
  brand: {
    id: string
    name: string
    slug: string
  }
  createdAt: string
  updatedAt?: string | null
}

export interface ModelsContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  currentRow: Model | null
  setCurrentRow: (row: Model | null) => void
}
