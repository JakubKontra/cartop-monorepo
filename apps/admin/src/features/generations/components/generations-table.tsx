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
import { generationsColumns as columns } from './generations-columns'
import { GET_ALL_CATALOG_MODEL_GENERATIONS } from '../generations.graphql'
import { GET_ALL_CATALOG_MODELS } from '../../models/models.graphql'
import { type Generation } from '../types'
import { DataTableBulkActions } from './data-table-bulk-actions'
import { Loader2 } from 'lucide-react'
import { CatalogBodyType } from '@/gql/graphql'

export function GenerationsTable() {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const { data, loading, error, refetch } = useQuery(GET_ALL_CATALOG_MODEL_GENERATIONS, {
    variables: {
      limit: 1000,
      offset: 0,
    },
  })

  const { data: modelsData } = useQuery(GET_ALL_CATALOG_MODELS, {
    variables: {
      limit: 1000,
      offset: 0,
    },
  })

  const generations: Generation[] = data?.catalogModelGenerations || []

  const filterOptions = useMemo(() => {
    const models = modelsData?.allCatalogModels.map((model) => ({
      label: `${model.brand?.name || 'Unknown'} ${model.name}`,
      value: model.id,
    })) || []

    const bodyTypes = Object.values(CatalogBodyType).map((type) => ({
      label: type.replace(/_/g, ' '),
      value: type,
    }))

    const statuses = [
      { label: 'Active', value: 'true' },
      { label: 'Inactive', value: 'false' },
    ]

    return { models, bodyTypes, statuses }
  }, [modelsData])

  const table = useReactTable({
    data: generations,
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

  if (loading && generations.length === 0) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-destructive'>Error loading generations: {error.message}</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter generations...'
        searchKey='name'
        filters={[
          {
            columnId: 'modelId',
            title: 'Model',
            options: filterOptions.models,
          },
          {
            columnId: 'bodyType',
            title: 'Body Type',
            options: filterOptions.bodyTypes,
          },
          {
            columnId: 'isActive',
            title: 'Status',
            options: filterOptions.statuses,
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
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
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
