import { createFileRoute } from '@tanstack/react-router'
import { EngineCreatePage } from '@/features/engines'

export const Route = createFileRoute('/_authenticated/engines/new')({
  component: EngineCreatePage,
})
