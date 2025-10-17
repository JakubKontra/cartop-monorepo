'use client'

import { useMemo } from 'react'
import { useQuery } from '@apollo/client/react'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Loader2 } from 'lucide-react'

import { DataTableToolbar, DataTablePagination } from '@/components/data-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { colorsColumns, type Color } from './colors-columns'
import { DataTableBulkActions } from './data-table-bulk-actions'
import { GET_ALL_CATALOG_COLORS } from '../colors.graphql'

export function ColorsTable() {
  const { data, loading, error } = useQuery(GET_ALL_CATALOG_COLORS, {
    variables: { limit: 1000, offset: 0 },
  })

  const colors = useMemo(() => {
    return (data?.catalogColors || []).map((color) => ({
      id: color.id,
      name: color.name,
      slug: color.slug,
      color: color.color,
      type: color.type,
      legacySystemId: color.legacySystemId,
      createdAt: color.createdAt,
    })) as Color[]
  }, [data])

  const table = useReactTable({
    data: colors,
    columns: colorsColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const filterOptions = useMemo(() => {
    return [
      {
        columnId: 'type',
        title: 'Type',
        options: [
          { label: 'Exterior', value: 'EXTERIOR' },
          { label: 'Interior', value: 'INTERIOR' },
        ],
      },
    ]
  }, [])

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-destructive'>Error loading colors: {error.message}</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter colors...'
        searchKey='name'
        filters={filterOptions}
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header
                        ? typeof header.column.columnDef.header === 'function'
                          ? header.column.columnDef.header(header.getContext())
                          : header.column.columnDef.header
                        : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {typeof cell.column.columnDef.cell === 'function'
                        ? cell.column.columnDef.cell(cell.getContext())
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={colorsColumns.length}
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
