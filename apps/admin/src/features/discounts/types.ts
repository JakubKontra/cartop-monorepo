export interface DiscountAmount {
  percentage?: number // e.g., 20 for 20%
  nominal?: number // e.g., 50000 for 50,000 Kč
}

export interface TrimDiscount {
  id: string
  trimName: string
  engineType: string // e.g., "Diesel", "Petrol", "Hybrid"
  power: string // e.g., "190HP"
  discount: DiscountAmount
  effectiveDiscount: DiscountAmount // Combined with parent discounts
}

export interface ModelDiscount {
  id: string
  modelName: string
  modelSlug: string
  discount?: DiscountAmount
  trims: TrimDiscount[]
  effectiveDiscount?: DiscountAmount // Combined with brand discount
}

export interface BrandDiscount {
  id: string
  brandName: string
  brandSlug: string
  logoUrl?: string
  discount?: DiscountAmount
  models: ModelDiscount[]
}

export interface DiscountStats {
  totalDiscounts: number
  averagePercentage: number
  totalNominalValue: number
  activeBrands: number
}

// Helper function to format discount display
export function formatDiscount(discount?: DiscountAmount): string {
  if (!discount) return 'Žádná sleva'

  const parts: string[] = []

  if (discount.percentage !== undefined && discount.percentage > 0) {
    parts.push(`${discount.percentage}%`)
  }

  if (discount.nominal !== undefined && discount.nominal > 0) {
    parts.push(`${discount.nominal.toLocaleString('cs-CZ')} Kč`)
  }

  return parts.length > 0 ? parts.join(' + ') : 'Žádná sleva'
}

// Helper function to calculate combined discount
export function combineDiscounts(
  parentDiscount?: DiscountAmount,
  childDiscount?: DiscountAmount
): DiscountAmount {
  const combined: DiscountAmount = {}

  const parentPercentage = parentDiscount?.percentage || 0
  const childPercentage = childDiscount?.percentage || 0
  const parentNominal = parentDiscount?.nominal || 0
  const childNominal = childDiscount?.nominal || 0

  const totalPercentage = parentPercentage + childPercentage
  const totalNominal = parentNominal + childNominal

  if (totalPercentage > 0) {
    combined.percentage = totalPercentage
  }

  if (totalNominal > 0) {
    combined.nominal = totalNominal
  }

  return combined
}

// Helper function to check if discount exists
export function hasDiscount(discount?: DiscountAmount): boolean {
  if (!discount) return false
  return (discount.percentage !== undefined && discount.percentage > 0) ||
         (discount.nominal !== undefined && discount.nominal > 0)
}
