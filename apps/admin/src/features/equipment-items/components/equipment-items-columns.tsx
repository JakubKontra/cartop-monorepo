'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { DataTableRowActions } from './data-table-row-actions'

export type EquipmentItem = {
  id: string
  name: string
  legacySystemId?: string | null
  createdAt: string
  updatedAt?: string | null
}

export const equipmentItemsColumns: ColumnDef<EquipmentItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <span className='font-medium'>{row.getValue('name')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'legacySystemId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Legacy ID' />
    ),
    cell: ({ row }) => {
      const legacyId = row.getValue('legacySystemId') as string | null
      return (
        <div className='flex items-center'>
          <span className='text-muted-foreground'>{legacyId || '-'}</span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
