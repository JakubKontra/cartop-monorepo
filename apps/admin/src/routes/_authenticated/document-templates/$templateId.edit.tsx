import { createFileRoute } from '@tanstack/react-router'
import DocumentTemplateEditPage from '@/features/document-templates/pages/document-template-edit-page'

export const Route = createFileRoute(
  '/_authenticated/document-templates/$templateId/edit'
)({
  component: DocumentTemplateEditPage,
})
