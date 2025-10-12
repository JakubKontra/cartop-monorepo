import { GetAllCatalogBrandsQuery } from '@/gql/graphql'

// Use generated type from GraphQL Codegen
export type Brand = GetAllCatalogBrandsQuery['allCatalogBrands'][0]

export interface BrandsContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  currentRow: Brand | null
  setCurrentRow: (row: Brand | null) => void
}
