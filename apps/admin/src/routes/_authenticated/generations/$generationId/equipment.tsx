import { createFileRoute } from '@tanstack/react-router'
import { GenerationEquipmentPage } from '@/features/generations/pages/generation-equipment-page'

export const Route = createFileRoute(
  '/_authenticated/generations/$generationId/equipment'
)({
  component: GenerationEquipmentPage,
})
