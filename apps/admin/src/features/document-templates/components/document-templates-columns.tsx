import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type DocumentTemplate } from '../types'
import { DataTableRowActions } from './data-table-row-actions'

export const documentTemplatesColumns: ColumnDef<DocumentTemplate>[] = [
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
      <DataTableColumnHeader column={column} title='Document Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48 ps-3 font-medium'>{row.getValue('name')}</LongText>
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
    accessorKey: 'leasingCompany',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Leasing Company' />
    ),
    cell: ({ row }) => {
      const leasingCompany = row.original.leasingCompany
      const isGlobal = !leasingCompany

      if (isGlobal) {
        return (
          <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
            All Companies (Global)
          </Badge>
        )
      }

      return (
        <LongText className='max-w-36'>
          {leasingCompany.name}
        </LongText>
      )
    },
  },
  {
    accessorKey: 'fieldName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Field Name' />
    ),
    cell: ({ row }) => (
      <code className='text-xs bg-muted px-2 py-1 rounded'>
        {row.getValue('fieldName')}
      </code>
    ),
  },
  {
    accessorKey: 'isRequired',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Required' />
    ),
    cell: ({ row }) => {
      const isRequired = row.getValue('isRequired') as boolean
      return (
        <Badge variant={isRequired ? 'default' : 'secondary'}>
          {isRequired ? 'Required' : 'Optional'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'acceptedFormats',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Accepted Formats' />
    ),
    cell: ({ row }) => {
      const formats = row.getValue('acceptedFormats') as string[]
      return (
        <div className='flex flex-wrap gap-1 max-w-48'>
          {formats.slice(0, 3).map((format) => (
            <Badge key={format} variant='outline' className='text-xs'>
              {format.toUpperCase()}
            </Badge>
          ))}
          {formats.length > 3 && (
            <Badge variant='outline' className='text-xs'>
              +{formats.length - 3}
            </Badge>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'maxSizeBytes',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Max Size' />
    ),
    cell: ({ row }) => {
      const bytes = row.getValue('maxSizeBytes') as number
      const mb = (bytes / 1048576).toFixed(2)
      return <span className='text-sm text-muted-foreground'>{mb} MB</span>
    },
  },
  {
    accessorKey: 'displayOrder',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order' />
    ),
    cell: ({ row }) => {
      const order = row.getValue('displayOrder') as number
      return <span className='text-sm text-muted-foreground'>{order}</span>
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return (
        <span className='text-sm text-muted-foreground'>
          {date.toLocaleDateString()}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
