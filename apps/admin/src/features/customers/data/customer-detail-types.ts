import { type GetCustomerDetailQuery, type GetAllCarRequestsQuery, type GetCalculationsByCarRequestQuery, type GetOnboardingsWithDocumentsQuery, type GetUserActivityQuery } from '@/gql/graphql'

/**
 * Customer detail type
 */
export type CustomerDetail = NonNullable<GetCustomerDetailQuery['user']>

/**
 * Car request type
 */
export type CarRequest = GetAllCarRequestsQuery['allCarRequests'][number]

/**
 * Calculation type
 */
export type Calculation = GetCalculationsByCarRequestQuery['calculationsByCarRequest'][number]

/**
 * Onboarding type
 */
export type Onboarding = GetOnboardingsWithDocumentsQuery['allOnboardings'][number]

/**
 * Onboarding document type
 */
export type OnboardingDocument = Onboarding['documents'][number]

/**
 * Activity log type
 */
export type ActivityLog = GetUserActivityQuery['userActivity'][number]

/**
 * Customer statistics
 */
export interface CustomerStats {
  totalRequests: number
  activeRequests: number
  completedRequests: number
  totalOnboardings: number
  completedOnboardings: number
  onboardingProgress: number // Percentage
}

/**
 * Onboarding status color mapping
 */
export const ONBOARDING_STATUS_COLORS = {
  NOT_STARTED: 'gray',
  IN_PROGRESS: 'blue',
  WAITING_FOR_DOCUMENTS: 'yellow',
  COMPLETED: 'green',
  CANCELLED: 'red',
} as const

/**
 * Onboarding status labels (Czech)
 */
export const ONBOARDING_STATUS_LABELS = {
  NOT_STARTED: 'Nezahájeno',
  IN_PROGRESS: 'Probíhá',
  WAITING_FOR_DOCUMENTS: 'Čeká na dokumenty',
  COMPLETED: 'Dokončeno',
  CANCELLED: 'Zrušeno',
} as const

/**
 * Car request status labels (Czech)
 */
export const CAR_REQUEST_STATUS_LABELS = {
  NEW: 'Nová',
  IN_PROGRESS: 'Probíhá',
  QUOTED: 'Nabídnuto',
  ACCEPTED: 'Přijato',
  REJECTED: 'Odmítnuto',
  COMPLETED: 'Dokončeno',
  CANCELLED: 'Zrušeno',
} as const

/**
 * Calculation status labels (Czech)
 */
export const CALCULATION_STATUS_LABELS = {
  DRAFT: 'Koncept',
  PENDING: 'Čeká',
  IN_PROGRESS: 'Probíhá',
  COMPLETED: 'Dokončeno',
  SENT: 'Odesláno',
  ACCEPTED: 'Přijato',
  REJECTED: 'Odmítnuto',
} as const

/**
 * Document status labels (Czech)
 */
export const DOCUMENT_STATUS_LABELS = {
  PENDING: 'Čeká',
  APPROVED: 'Schváleno',
  REJECTED: 'Odmítnuto',
} as const
