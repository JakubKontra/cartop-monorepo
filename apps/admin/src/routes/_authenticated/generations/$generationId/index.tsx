import { createFileRoute } from '@tanstack/react-router'
import { GenerationEditPage } from '@/features/generations/pages/generation-edit-page'

export const Route = createFileRoute('/_authenticated/generations/$generationId/')({
  component: GenerationEditPage,
})
