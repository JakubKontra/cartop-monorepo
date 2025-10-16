import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { LogoTableCell } from '@/components/logo-table-cell'
import { type OnboardingListItem } from '../types'
import { OnboardingStatusBadge } from './onboarding-status-badge'
import { DocumentValidationStatusBadge } from './document-validation-status-badge'
import { ExternalLink } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const onboardingsColumns: ColumnDef<OnboardingListItem>[] = [
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
    accessorKey: 'carRequest',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer' />
    ),
    cell: ({ row }) => {
      const carRequest = row.original.carRequest
      const customer = carRequest.customer
      const name = customer
        ? `${customer.firstName} ${customer.lastName}`
        : `${carRequest.requestFirstName} ${carRequest.requestLastName}`
      const email = customer?.email || carRequest.requestEmail

      return (
        <div className='ps-3'>
          <LongText className='max-w-48 font-medium'>{name}</LongText>
          <p className='text-xs text-muted-foreground'>{email}</p>
        </div>
      )
    },
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
      return (
        <div className='flex items-center gap-2'>
          {leasingCompany.logo && (
            <LogoTableCell
              url={leasingCompany.logo.url}
              alt={leasingCompany.name}
              maxSize={32}
              aspectRatio='1:1'
            />
          )}
          <LongText className='max-w-36'>{leasingCompany.name}</LongText>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as any
      return <OnboardingStatusBadge status={status} />
    },
  },
  {
    accessorKey: 'documents',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Documents' />
    ),
    cell: ({ row }) => {
      const documents = row.original.documents || []
      const total = documents.length
      const approved = documents.filter((d) => d.validationStatus === 'APPROVED').length
      const rejected = documents.filter((d) => d.validationStatus === 'REJECTED').length
      const pending = documents.filter((d) => d.validationStatus === 'PENDING').length

      return (
        <div className='flex items-center gap-2'>
          {pending > 0 && (
            <Badge variant='secondary' className='text-xs'>
              {pending} pending
            </Badge>
          )}
          {approved > 0 && (
            <Badge variant='default' className='text-xs bg-green-600'>
              {approved} approved
            </Badge>
          )}
          {rejected > 0 && (
            <Badge variant='destructive' className='text-xs'>
              {rejected} rejected
            </Badge>
          )}
          {total === 0 && (
            <span className='text-sm text-muted-foreground'>No documents</span>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'expiresAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expires At' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('expiresAt'))
      const isExpired = date < new Date()
      return (
        <span className={cn('text-sm', isExpired ? 'text-destructive' : 'text-muted-foreground')}>
          {date.toLocaleDateString()}
        </span>
      )
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
    cell: ({ row }) => {
      const onboarding = row.original
      return (
        <Link
          to='/onboardings/$onboardingId'
          params={{ onboardingId: onboarding.id }}
          className='inline-flex items-center gap-1 text-sm text-blue-600 hover:underline'
        >
          View Details
          <ExternalLink size={14} />
        </Link>
      )
    },
  },
]
