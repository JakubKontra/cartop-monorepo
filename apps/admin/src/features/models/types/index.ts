import { type GetAllCatalogModelsQuery } from '@/gql/graphql'

// Use generated type from GraphQL Codegen
export type Model = GetAllCatalogModelsQuery['allCatalogModels'][0]

export interface ModelsContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  currentRow: Model | null
  setCurrentRow: (row: Model | null) => void
}
