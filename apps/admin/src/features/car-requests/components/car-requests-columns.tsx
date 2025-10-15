import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type CarRequest } from '../types'
import { DataTableRowActions } from './data-table-row-actions'
import { CarRequestStateBadge } from './car-request-state-badge'
import { format } from 'date-fns'
import { type CarRequestStateCode } from '../constants/states'

export const carRequestsColumns: ColumnDef<CarRequest>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-24 font-mono text-xs'>{row.getValue('id')}</LongText>
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
    accessorKey: 'requestFirstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer Name' />
    ),
    cell: ({ row }) => {
      const firstName = row.original.requestFirstName || row.original.customer?.firstName || ''
      const lastName = row.original.requestLastName || row.original.customer?.lastName || ''
      const fullName = `${firstName} ${lastName}`.trim() || '-'
      return (
        <LongText className='max-w-36 font-medium'>{fullName}</LongText>
      )
    },
  },
  {
    accessorKey: 'requestEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48 text-muted-foreground'>
        {row.getValue('requestEmail') || row.original.customer?.email || '-'}
      </LongText>
    ),
  },
  {
    accessorKey: 'requestPhone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 text-muted-foreground'>
        {row.getValue('requestPhone') || '-'}
      </LongText>
    ),
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Brand' />
    ),
    cell: ({ row }) => {
      const brand = row.original.brand
      return (
        <LongText className='max-w-32'>
          {brand?.name || '-'}
        </LongText>
      )
    },
  },
  {
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Model' />
    ),
    cell: ({ row }) => {
      const model = row.original.model
      return (
        <LongText className='max-w-32'>
          {model?.name || '-'}
        </LongText>
      )
    },
  },
  {
    accessorKey: 'financingType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Financing' />
    ),
    cell: ({ row }) => {
      const financingType = row.getValue('financingType') as string
      return (
        <Badge variant={financingType === 'leasing' ? 'default' : 'outline'} className='capitalize'>
          {financingType}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)))
    },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      if (!status) return <span className='text-muted-foreground'>-</span>

      return (
        <Badge
          variant='outline'
          style={{
            borderColor: status.colorHex || undefined,
            color: status.colorHex || undefined
          }}
        >
          {status.name}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'state',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='State' />
    ),
    cell: ({ row }) => {
      const stateCode = row.original.state?.code as CarRequestStateCode | undefined
      const offersSentAt = row.original.offersSentAt

      return (
        <CarRequestStateBadge
          stateCode={stateCode}
          offersSentAt={offersSentAt}
        />
      )
    },
  },
  {
    accessorKey: 'assignedAgent',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Agent' />
    ),
    cell: ({ row }) => {
      const agent = row.original.assignedAgent
      if (!agent) return <span className='text-muted-foreground'>-</span>

      return (
        <LongText className='max-w-32'>
          {`${agent.firstName} ${agent.lastName}`}
        </LongText>
      )
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
          {format(new Date(date), 'PPP')}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
