'use client'

import { useEffect, useState, useMemo } from 'react'
import { useQuery } from '@apollo/client/react'
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { enginesColumns as columns } from './engines-columns'
import { GET_ALL_ENGINES } from '../engines.graphql'
import { GET_ALL_CATALOG_MODEL_GENERATIONS } from '../../generations/generations.graphql'
import { type Engine } from '../types'
import { DataTableBulkActions } from './data-table-bulk-actions'
import { Loader2 } from 'lucide-react'
import {
  FUEL_TYPE_OPTIONS,
  TRANSMISSION_TYPE_OPTIONS,
  DRIVE_TYPE_OPTIONS,
} from '../data/constants'

export function EnginesTable() {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const { data, loading, error, refetch } = useQuery(GET_ALL_ENGINES, {
    variables: {
      limit: 1000,
      offset: 0,
    },
  })

  const { data: generationsData } = useQuery(GET_ALL_CATALOG_MODEL_GENERATIONS, {
    variables: {
      limit: 1000,
      offset: 0,
    },
  })

  const engines: Engine[] = data?.allEngines || []

  const filterOptions = useMemo(() => {
    const generations =
      generationsData?.catalogModelGenerations.map((generation) => ({
        label: `${generation.model?.brand?.name || ''} ${generation.model?.name || ''} ${generation.name}`,
        value: generation.id,
      })) || []

    const fuelTypes = FUEL_TYPE_OPTIONS.map((option) => ({
      label: option.label,
      value: option.value,
    }))

    const transmissions = TRANSMISSION_TYPE_OPTIONS.map((option) => ({
      label: option.label,
      value: option.value,
    }))

    const driveTypes = DRIVE_TYPE_OPTIONS.map((option) => ({
      label: option.label,
      value: option.value,
    }))

    const statuses = [
      { label: 'Active', value: 'true' },
      { label: 'Inactive', value: 'false' },
    ]

    const recommended = [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ]

    return { generations, fuelTypes, transmissions, driveTypes, statuses, recommended }
  }, [generationsData])

  const table = useReactTable({
    data: engines,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  if (loading && engines.length === 0) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-destructive'>Error loading engines: {error.message}</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter engines...'
        searchKey='name'
        filters={[
          {
            columnId: 'generation',
            title: 'Generation',
            options: filterOptions.generations,
          },
          {
            columnId: 'fuelType',
            title: 'Fuel Type',
            options: filterOptions.fuelTypes,
          },
          {
            columnId: 'transmissionType',
            title: 'Transmission',
            options: filterOptions.transmissions,
          },
          {
            columnId: 'driveType',
            title: 'Drive',
            options: filterOptions.driveTypes,
          },
          {
            columnId: 'active',
            title: 'Status',
            options: filterOptions.statuses,
          },
          {
            columnId: 'recommended',
            title: 'Recommended',
            options: filterOptions.recommended,
          },
        ]}
      />
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        header.column.columnDef.meta?.className ?? ''
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='group/row'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        cell.column.columnDef.meta?.className ?? ''
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <DataTableBulkActions table={table} />
    </div>
  )
}
