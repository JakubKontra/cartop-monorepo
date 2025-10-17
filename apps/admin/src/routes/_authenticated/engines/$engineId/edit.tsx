import { createFileRoute } from '@tanstack/react-router'
import { EngineEditPage } from '@/features/engines'

export const Route = createFileRoute('/_authenticated/engines/$engineId/edit')({
  component: EngineEditPage,
})
