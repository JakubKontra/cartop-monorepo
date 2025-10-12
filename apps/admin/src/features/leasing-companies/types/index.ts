import { GetAllLeasingCompaniesQuery } from '@/gql/graphql'

// Use generated type from GraphQL
export type LeasingCompany = GetAllLeasingCompaniesQuery['leasingCompanies'][0]

export interface LeasingCompaniesContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  currentRow: LeasingCompany | null
  setCurrentRow: (row: LeasingCompany | null) => void
}
