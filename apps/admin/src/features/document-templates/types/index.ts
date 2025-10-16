import { type GetAllDocumentTemplatesQuery } from '@/gql/graphql'

// Use generated type from GraphQL
export type DocumentTemplate = GetAllDocumentTemplatesQuery['allDocumentTemplates'][0]

export interface DocumentTemplatesContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  currentRow: DocumentTemplate | null
  setCurrentRow: (row: DocumentTemplate | null) => void
}
