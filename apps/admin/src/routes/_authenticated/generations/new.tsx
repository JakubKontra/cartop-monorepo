import { createFileRoute } from '@tanstack/react-router'
import { GenerationCreatePage } from '@/features/generations/pages/generation-create-page'

export const Route = createFileRoute('/_authenticated/generations/new')({
  component: GenerationCreatePage,
})
