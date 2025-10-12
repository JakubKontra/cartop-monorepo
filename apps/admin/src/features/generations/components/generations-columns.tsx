'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { type Generation } from '../types'
import { format } from 'date-fns'

export const generationsColumns: ColumnDef<Generation>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
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
        <div className='flex space-x-2'>
          <span className='max-w-[200px] truncate font-medium'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'modelId',
    id: 'modelId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Model' />
    ),
    cell: ({ row }) => {
      const model = row.original.model
      return (
        <div className='flex flex-col'>
          <span className='font-medium'>{model.name}</span>
          {model.brand && (
            <span className='text-xs text-muted-foreground'>{model.brand.name}</span>
          )}
        </div>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      // value is an array of selected model IDs
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'bodyType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Body Type' />
    ),
    cell: ({ row }) => {
      const bodyType = row.getValue('bodyType') as string | null
      if (!bodyType) return <span className='text-muted-foreground'>-</span>
      return <span className='capitalize'>{bodyType.replace(/_/g, ' ')}</span>
    },
    filterFn: (row, id, value) => {
      // value is an array of selected body types
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'productionStart',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Production' />
    ),
    cell: ({ row }) => {
      const start = row.original.productionStart
      const end = row.original.productionStop

      if (!start && !end) return <span className='text-muted-foreground'>-</span>

      const startYear = start ? new Date(start).getFullYear() : '?'
      const endYear = end ? new Date(end).getFullYear() : 'present'

      return <span className='text-sm'>{startYear} - {endYear}</span>
    },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string
      return (
        <span className='text-sm text-muted-foreground'>
          {format(new Date(date), 'MMM d, yyyy')}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
