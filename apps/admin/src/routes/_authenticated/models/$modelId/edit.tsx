import { createFileRoute } from '@tanstack/react-router'
import { ModelEditPage } from '@/features/models/pages/model-edit-page'

export const Route = createFileRoute('/_authenticated/models/$modelId/edit')({
  component: ModelEditPage,
})
