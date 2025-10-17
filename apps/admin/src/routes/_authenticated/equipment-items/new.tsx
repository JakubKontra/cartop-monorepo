import { createFileRoute } from '@tanstack/react-router'
import { EquipmentItemCreatePage } from '@/features/equipment-items'

export const Route = createFileRoute('/_authenticated/equipment-items/new')({
  component: EquipmentItemCreatePage,
})
