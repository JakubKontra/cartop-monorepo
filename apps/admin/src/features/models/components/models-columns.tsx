import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Model } from '../types'
import { DataTableRowActions } from './data-table-row-actions'
import { CheckCircle2, Circle } from 'lucide-react'

export const modelsColumns: ColumnDef<Model>[] = [
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
    meta: {
      className: cn('sticky md:table-cell start-0 z-10 rounded-tl-[inherit]'),
    },
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
      <DataTableColumnHeader column={column} title='Model Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3 font-medium'>{row.getValue('name')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    id: 'brandName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Brand' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.original.brand.name}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Slug' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-muted-foreground'>{row.getValue('slug')}</LongText>
    ),
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-64'>
        {row.getValue('description') || '-'}
      </LongText>
    ),
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Active' />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      return (
        <div className='flex items-center gap-x-2'>
          {isActive ? (
            <CheckCircle2 size={16} className='text-green-600' />
          ) : (
            <Circle size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm'>{isActive ? 'Yes' : 'No'}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)))
    },
    enableSorting: false,
  },
  {
    accessorKey: 'isHighlighted',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Highlighted' />
    ),
    cell: ({ row }) => {
      const isHighlighted = row.getValue('isHighlighted') as boolean
      return (
        <Badge variant={isHighlighted ? 'default' : 'outline'} className='capitalize'>
          {isHighlighted ? 'Yes' : 'No'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)))
    },
    enableSorting: false,
  },
  {
    accessorKey: 'isRecommended',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Recommended' />
    ),
    cell: ({ row }) => {
      const isRecommended = row.getValue('isRecommended') as boolean
      return (
        <Badge variant={isRecommended ? 'default' : 'outline'} className='capitalize'>
          {isRecommended ? 'Yes' : 'No'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)))
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
