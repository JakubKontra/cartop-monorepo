import { createFileRoute } from '@tanstack/react-router'
import EquipmentItemsPage from '@/features/equipment-items'

export const Route = createFileRoute('/_authenticated/equipment-items/')({
  component: EquipmentItemsPage,
})
