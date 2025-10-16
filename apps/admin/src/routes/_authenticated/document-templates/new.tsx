import { createFileRoute } from '@tanstack/react-router'
import DocumentTemplateCreatePage from '@/features/document-templates/pages/document-template-create-page'

export const Route = createFileRoute('/_authenticated/document-templates/new')({
  component: DocumentTemplateCreatePage,
})
