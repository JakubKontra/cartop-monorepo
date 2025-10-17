'use client'

import { EquipmentItemsProvider } from './components/equipment-items-provider'
import { EquipmentItemsTable } from './components/equipment-items-table'
import { EquipmentItemsDialogs } from './components/equipment-items-dialogs'
import { EquipmentItemsPrimaryButtons } from './components/equipment-items-primary-buttons'

export default function EquipmentItemsPage() {
  return (
    <EquipmentItemsProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Equipment Items</h1>
            <p className='text-muted-foreground'>
              Manage catalog equipment items that can be assigned to brand equipment categories
            </p>
          </div>
          <EquipmentItemsPrimaryButtons />
        </div>
        <EquipmentItemsTable />
        <EquipmentItemsDialogs />
      </div>
    </EquipmentItemsProvider>
  )
}

export { EquipmentItemCreatePage } from './pages/equipment-item-create-page'
export { EquipmentItemEditPage } from './pages/equipment-item-edit-page'
export { EquipmentItemForm } from './components/equipment-item-form'
export { EquipmentItemsProvider, useEquipmentItems } from './components/equipment-items-provider'
