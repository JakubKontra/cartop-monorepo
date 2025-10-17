'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { EquipmentItem } from './equipment-items-columns'

interface EquipmentItemsContextType {
  deleteDialogOpen: boolean
  setDeleteDialogOpen: (open: boolean) => void
  multiDeleteDialogOpen: boolean
  setMultiDeleteDialogOpen: (open: boolean) => void
  selectedItem: EquipmentItem | null
  setSelectedItem: (item: EquipmentItem | null) => void
  selectedItems: EquipmentItem[]
  setSelectedItems: (items: EquipmentItem[]) => void
}

const EquipmentItemsContext = createContext<EquipmentItemsContextType | undefined>(undefined)

export function EquipmentItemsProvider({ children }: { children: ReactNode }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [multiDeleteDialogOpen, setMultiDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null)
  const [selectedItems, setSelectedItems] = useState<EquipmentItem[]>([])

  return (
    <EquipmentItemsContext.Provider
      value={{
        deleteDialogOpen,
        setDeleteDialogOpen,
        multiDeleteDialogOpen,
        setMultiDeleteDialogOpen,
        selectedItem,
        setSelectedItem,
        selectedItems,
        setSelectedItems,
      }}
    >
      {children}
    </EquipmentItemsContext.Provider>
  )
}

export function useEquipmentItems() {
  const context = useContext(EquipmentItemsContext)
  if (context === undefined) {
    throw new Error('useEquipmentItems must be used within an EquipmentItemsProvider')
  }
  return context
}
