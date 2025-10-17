'use client'

import { Table } from '@tanstack/react-table'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useEquipmentItems } from './equipment-items-provider'
import { EquipmentItem } from './equipment-items-columns'

interface DataTableBulkActionsProps {
  table: Table<EquipmentItem>
}

export function DataTableBulkActions({ table }: DataTableBulkActionsProps) {
  const { setMultiDeleteDialogOpen, setSelectedItems } = useEquipmentItems()
  const selectedRows = table.getFilteredSelectedRowModel().rows

  if (selectedRows.length === 0) {
    return null
  }

  const handleBulkDelete = () => {
    setSelectedItems(selectedRows.map((row) => row.original))
    setMultiDeleteDialogOpen(true)
  }

  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='outline'
        size='sm'
        onClick={handleBulkDelete}
        className='h-8'
      >
        <Trash className='mr-2 h-4 w-4' />
        Delete ({selectedRows.length})
      </Button>
    </div>
  )
}
