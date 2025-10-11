import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { getRoleLabel, getRoleIcon } from '@/lib/role-utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type UserRole } from '../data/schema'
import { type GetAllUsersQuery } from '@/gql/graphql'

// Extract User type from the GraphQL query result
type User = GetAllUsersQuery['users'][number]
import { DataTableRowActions } from './data-table-row-actions'
import { CheckCircle2, Circle } from 'lucide-react'

export const usersColumns: ColumnDef<User>[] = [
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
    id: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      const fullName = `${firstName} ${lastName}`
      return <LongText className='max-w-36 ps-3 font-medium'>{fullName}</LongText>
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
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>{row.getValue('email')}</LongText>
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    cell: ({ row }) => <div>{row.getValue('phone') || '-'}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'roles',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Roles' />
    ),
    cell: ({ row }) => {
      const roles = row.getValue('roles') as UserRole[]
      const primaryRole = roles[0]
      const RoleIcon = getRoleIcon(primaryRole)
      const label = getRoleLabel(primaryRole)

      if (roles.length === 1) {
        return (
          <div className='flex items-center gap-x-2'>
            <RoleIcon size={16} className='text-muted-foreground' />
            <span className='text-sm'>{label}</span>
          </div>
        )
      }

      return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div className='flex items-center gap-x-2 cursor-help'>
                <RoleIcon size={16} className='text-muted-foreground' />
                <span className='text-sm'>{label}</span>
                <Badge variant='secondary' className='ml-1 text-xs'>
                  +{roles.length - 1}
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent side='top' className='max-w-xs'>
              <div className='space-y-2'>
                <p className='font-semibold text-xs'>All Roles:</p>
                <div className='space-y-1'>
                  {roles.map((role) => {
                    const Icon = getRoleIcon(role)
                    const roleLabel = getRoleLabel(role)
                    return (
                      <div key={role} className='flex items-center gap-2'>
                        <Icon size={14} className='text-muted-foreground' />
                        <span className='text-xs'>{roleLabel}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
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
          <span className='text-sm'>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
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
