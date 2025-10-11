export interface Brand {
  id: string
  name: string
  slug: string
  description?: string | null
  isActive: boolean
  isHighlighted: boolean
  isRecommended: boolean
  legacySystemId?: string | null
  legacySlug?: string | null
  createdAt: string
  updatedAt?: string | null
}

export interface BrandsContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  currentRow: Brand | null
  setCurrentRow: (row: Brand | null) => void
}
