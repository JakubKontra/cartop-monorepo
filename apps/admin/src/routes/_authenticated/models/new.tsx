import { createFileRoute } from '@tanstack/react-router'
import { ModelCreatePage } from '@/features/models/pages/model-create-page'

export const Route = createFileRoute('/_authenticated/models/new')({
  component: ModelCreatePage,
})
