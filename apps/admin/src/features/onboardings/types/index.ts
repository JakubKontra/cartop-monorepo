import { type GetAllOnboardingsQuery, type GetOnboardingQuery } from '@/gql/graphql'

// Use generated type from GraphQL
export type OnboardingListItem = GetAllOnboardingsQuery['allOnboardings'][0]
export type Onboarding = NonNullable<GetOnboardingQuery['onboarding']>
export type OnboardingDocument = Onboarding['documents'][0]

export interface OnboardingsFilterState {
  status?: string
  leasingCompanyId?: string
}

export interface DocumentValidationDialogState {
  open: boolean
  document: OnboardingDocument | null
}
