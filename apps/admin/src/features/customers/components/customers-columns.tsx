'use client'

import { formatDate } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, UserCircle } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Customer } from '../data/types'

function CustomerActionsCell({ customer }: { customer: Customer }) {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Akce</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(customer.id)}
        >
          Kopírovat ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate({ to: '/customers/$customerId', params: { customerId: customer.id } })}
        >
          Zobrazit detail
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const customersColumns: ColumnDef<Customer>[] = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'customer',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Zákazník' />
    ),
    cell: ({ row }) => {
      const customer = row.original
      const initials =
        `${customer.firstName[0]}${customer.lastName[0]}`.toUpperCase()

      return (
        <div className='flex items-center gap-3'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={customer.avatar?.url}
              alt={`${customer.firstName} ${customer.lastName}`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='font-medium'>
              {customer.firstName} {customer.lastName}
            </span>
            <span className='text-muted-foreground text-sm'>
              {customer.email}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Telefon' />
    ),
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string | null
      return phone ? (
        <span className='text-sm'>{phone}</span>
      ) : (
        <span className='text-muted-foreground text-sm'>-</span>
      )
    },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stav' />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Aktivní' : 'Neaktivní'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Registrován' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      return (
        <span className='text-muted-foreground text-sm'>
          {formatDate(date, 'PPP')}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CustomerActionsCell customer={row.original} />,
  },
]
