'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Engine } from '../types'
import {
  getFuelTypeLabel,
  getTransmissionTypeLabel,
  getDriveTypeLabel,
} from '../data/constants'
import { DataTableRowActions } from './data-table-row-actions'
import { Fuel, Zap, CircleDot } from 'lucide-react'

export const enginesColumns: ColumnDef<Engine>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-0.5'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-0.5'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[200px] truncate font-medium'>{row.getValue('name')}</span>
        </div>
      )
    },
  },
  {
    id: 'generation',
    accessorFn: (row) =>
      `${row.generation?.model?.brand?.name || ''} ${row.generation?.model?.name || ''} ${row.generation?.name || ''}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Generation' />,
    cell: ({ row }) => {
      const engine = row.original
      const brand = engine.generation?.model?.brand?.name
      const model = engine.generation?.model?.name
      const generation = engine.generation?.name

      return (
        <div className='flex flex-col'>
          <span className='text-sm font-medium'>
            {brand} {model}
          </span>
          <span className='text-xs text-muted-foreground'>{generation}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const generationId = row.original.generationId
      return value.includes(generationId)
    },
  },
  {
    accessorKey: 'fuelType',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Fuel' />,
    cell: ({ row }) => {
      const fuelType = row.getValue('fuelType') as string | null
      const label = getFuelTypeLabel(fuelType as any)

      const icon = fuelType === 'electric' ? (
        <Zap className='h-4 w-4' />
      ) : (
        <Fuel className='h-4 w-4' />
      )

      return (
        <div className='flex items-center gap-2'>
          {icon}
          <span className='text-sm'>{label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'transmissionType',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Transmission' />,
    cell: ({ row }) => {
      const transmissionType = row.getValue('transmissionType') as string | null
      return (
        <span className='text-sm'>{getTransmissionTypeLabel(transmissionType as any)}</span>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'driveType',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Drive' />,
    cell: ({ row }) => {
      const driveType = row.getValue('driveType') as string | null
      return <span className='text-sm'>{getDriveTypeLabel(driveType as any)}</span>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'performance',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Power' />,
    cell: ({ row }) => {
      const performance = row.getValue('performance') as number | null
      return performance ? (
        <span className='text-sm'>{performance} kW</span>
      ) : (
        <span className='text-sm text-muted-foreground'>-</span>
      )
    },
  },
  {
    accessorKey: 'torque',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Torque' />,
    cell: ({ row }) => {
      const torque = row.getValue('torque') as number | null
      return torque ? (
        <span className='text-sm'>{torque} Nm</span>
      ) : (
        <span className='text-sm text-muted-foreground'>-</span>
      )
    },
  },
  {
    accessorKey: 'acceleration',
    header: ({ column }) => <DataTableColumnHeader column={column} title='0-100' />,
    cell: ({ row }) => {
      const acceleration = row.getValue('acceleration') as number | null
      return acceleration ? (
        <span className='text-sm'>{acceleration} s</span>
      ) : (
        <span className='text-sm text-muted-foreground'>-</span>
      )
    },
  },
  {
    accessorKey: 'active',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const active = row.getValue('active') as boolean
      return (
        <Badge variant={active ? 'default' : 'secondary'}>
          {active ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      const active = row.getValue(id) as boolean
      return value.includes(active.toString())
    },
  },
  {
    accessorKey: 'recommended',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Recommended' />,
    cell: ({ row }) => {
      const recommended = row.getValue('recommended') as boolean
      return recommended ? (
        <Badge variant='outline' className='bg-yellow-50 text-yellow-700 border-yellow-200'>
          Recommended
        </Badge>
      ) : null
    },
    filterFn: (row, id, value) => {
      const recommended = row.getValue(id) as boolean
      return value.includes(recommended.toString())
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
