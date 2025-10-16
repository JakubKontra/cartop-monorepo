import { createFileRoute } from '@tanstack/react-router'
import DocumentTemplatesListPage from '@/features/document-templates/pages/document-templates-list-page'

export const Route = createFileRoute('/_authenticated/document-templates/')({
  component: DocumentTemplatesListPage,
})
