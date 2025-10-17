'use client'

import { EquipmentItemsDeleteDialog } from './equipment-items-delete-dialog'
import { EquipmentItemsMultiDeleteDialog } from './equipment-items-multi-delete-dialog'

export function EquipmentItemsDialogs() {
  return (
    <>
      <EquipmentItemsDeleteDialog />
      <EquipmentItemsMultiDeleteDialog />
    </>
  )
}
