'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { DataTableRowActions } from './data-table-row-actions'

export type Color = {
  id: string
  name: string
  slug: string
  color: string | null
  type: string
  legacySystemId?: string | null
  createdAt: string
}

export const colorsColumns: ColumnDef<Color>[] = [
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
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Slug' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <span className='text-muted-foreground'>{row.getValue('slug')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      const colorValue = row.getValue('color') as string | null
      return (
        <div className='flex items-center gap-2'>
          {colorValue ? (
            <>
              <div
                className='h-6 w-6 rounded border'
                style={{ backgroundColor: colorValue }}
              />
              <span className='text-muted-foreground text-xs'>{colorValue}</span>
            </>
          ) : (
            <span className='text-muted-foreground'>-</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <Badge variant='outline'>
          {type === 'EXTERIOR' ? 'Exterior' : 'Interior'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
