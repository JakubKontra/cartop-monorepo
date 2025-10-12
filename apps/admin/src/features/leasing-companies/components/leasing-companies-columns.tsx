import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { LogoTableCell } from '@/components/logo-table-cell'
import { type LeasingCompany } from '../types'
import { DataTableRowActions } from './data-table-row-actions'
import { ExternalLink } from 'lucide-react'

export const leasingCompaniesColumns: ColumnDef<LeasingCompany>[] = [
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
      <DataTableColumnHeader column={column} title='Company Name' />
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
    accessorKey: 'logo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Logo' />
    ),
    cell: ({ row }) => {
      const logo = row.original.logo
      return (
        <LogoTableCell
          url={logo?.url}
          alt={logo?.alt || row.original.name}
          maxSize={40}
          aspectRatio='1:1'
        />
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'link',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Website' />
    ),
    cell: ({ row }) => {
      const link = row.getValue('link') as string | null
      if (!link) {
        return <span className='text-sm text-muted-foreground'>-</span>
      }
      return (
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-1 text-sm text-blue-600 hover:underline'
        >
          <ExternalLink size={14} />
          <LongText className='max-w-48'>
            {link.replace(/^https?:\/\/(www\.)?/, '')}
          </LongText>
        </a>
      )
    },
    enableSorting: false,
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
