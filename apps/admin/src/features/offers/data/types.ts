export interface Offer {
  id: string
  type: 'operational_leasing' | 'direct_purchase' | 'individual'
  isPublic: boolean
  isActive: boolean
  totalPrice: number
  description?: string
  slug?: string

  // Relations
  modelGenerationId: string
  modelGeneration?: {
    id: string
    name: string
  }
  brandId?: string
  modelId?: string

  // Operational Leasing specific
  leasingDurationMonths?: number
  monthlyPayment?: number
  annualMileageLimit?: number
  downPaymentLeasing?: number
  hasServiceIncluded?: boolean
  hasWinterTyresIncluded?: boolean
  hasAssistanceServiceIncluded?: boolean
  hasGapIncluded?: boolean

  // Direct Purchase specific
  discountAmount?: number
  discountPercentage?: number
  includesWarranty?: boolean
  warrantyYears?: number
  financingAvailable?: boolean

  // Individual Offer specific
  customerId?: string
  customer?: {
    id: string
    email: string
    firstName?: string
    lastName?: string
  }
  status?: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
  customRequirements?: string
  internalNotes?: string
  assignedToId?: string
  assignedTo?: {
    id: string
    email: string
    firstName?: string
    lastName?: string
  }
  responseDeadline?: string

  // Timestamps
  createdAt: string
  updatedAt: string
}

export type OfferType = 'operational_leasing' | 'direct_purchase' | 'individual'

export const offerTypeLabels: Record<OfferType, string> = {
  operational_leasing: 'Operativní leasing',
  direct_purchase: 'Přímý prodej',
  individual: 'Individuální nabídka',
}

export const individualOfferStatusLabels = {
  DRAFT: 'Koncept',
  SENT: 'Odesláno',
  ACCEPTED: 'Přijato',
  REJECTED: 'Odmítnuto',
  EXPIRED: 'Vypršelo',
}
