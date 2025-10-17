import { createFileRoute } from '@tanstack/react-router'
import { EquipmentItemEditPage } from '@/features/equipment-items'

export const Route = createFileRoute('/_authenticated/equipment-items/$itemId/edit')({
  component: EquipmentItemEditPage,
})
