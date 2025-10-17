'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/data-table'
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Offer, offerTypeLabels, individualOfferStatusLabels } from '../data/types'
import { useOffersContext } from './offers-provider'
import { formatCurrency } from '@/lib/utils'

export const offersColumns: ColumnDef<Offer>[] = [
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Typ nabídky' />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type') as Offer['type']
      return (
        <Badge variant='outline' className='whitespace-nowrap'>
          {offerTypeLabels[type]}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'modelGeneration',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Vozidlo' />
    ),
    cell: ({ row }) => {
      const generation = row.original.modelGeneration
      if (!generation) return <span className='text-muted-foreground'>-</span>

      return (
        <div className='flex flex-col'>
          <span className='font-medium'>{generation.name}</span>
          <span className='text-sm text-muted-foreground'>Generace</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Celková cena' />
    ),
    cell: ({ row }) => {
      const price = row.getValue('totalPrice') as number
      return <span className='font-medium'>{formatCurrency(price)}</span>
    },
  },
  {
    accessorKey: 'monthlyPayment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Měsíční splátka' />
    ),
    cell: ({ row }) => {
      const payment = row.original.monthlyPayment
      if (!payment) return <span className='text-muted-foreground'>-</span>
      return <span>{formatCurrency(payment)}/měs.</span>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stav' />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      if (!status) return <span className='text-muted-foreground'>-</span>

      const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        DRAFT: 'secondary',
        SENT: 'default',
        ACCEPTED: 'default',
        REJECTED: 'destructive',
        EXPIRED: 'outline',
      }

      return (
        <Badge variant={variants[status] || 'outline'}>
          {individualOfferStatusLabels[status as keyof typeof individualOfferStatusLabels]}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Aktivní' />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Ano' : 'Ne'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)))
    },
  },
  {
    accessorKey: 'isPublic',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Veřejná' />
    ),
    cell: ({ row }) => {
      const isPublic = row.getValue('isPublic') as boolean
      return (
        <Badge variant={isPublic ? 'default' : 'outline'}>
          {isPublic ? 'Ano' : 'Ne'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Vytvořeno' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return (
        <span className='text-muted-foreground'>
          {date.toLocaleDateString('cs-CZ')}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const offer = row.original
      const { setSelectedOffer, setDeleteDialogOpen } = useOffersContext()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Otevřít menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Akce</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(offer.id)
              }}
            >
              <Eye className='mr-2 h-4 w-4' />
              Zobrazit detail
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link to={`/offers/${offer.id}/edit`}>
              <DropdownMenuItem>
                <Pencil className='mr-2 h-4 w-4' />
                Upravit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                setSelectedOffer(offer)
                setDeleteDialogOpen(true)
              }}
              className='text-destructive'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Smazat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
