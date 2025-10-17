'use client'

import { type Table } from '@tanstack/react-table'
import { X, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type Engine } from '../types'
import { useEngines } from './engines-provider'

interface DataTableBulkActionsProps {
  table: Table<Engine>
}

export function DataTableBulkActions({ table }: DataTableBulkActionsProps) {
  const { setEnginesToDelete } = useEngines()
  const selectedRows = table.getFilteredSelectedRowModel().rows

  if (selectedRows.length === 0) return null

  const selectedEngineIds = selectedRows.map((row) => row.original.id)

  return (
    <div className='flex items-center justify-between rounded-md border bg-card p-4'>
      <div className='flex items-center gap-2'>
        <p className='text-sm text-muted-foreground'>
          <span className='font-medium text-foreground'>{selectedRows.length}</span>{' '}
          {selectedRows.length === 1 ? 'engine' : 'engines'} selected
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.resetRowSelection()}
        >
          <X className='mr-2 h-4 w-4' />
          Clear selection
        </Button>
        <Button
          variant='destructive'
          size='sm'
          onClick={() => setEnginesToDelete(selectedEngineIds)}
        >
          <Trash className='mr-2 h-4 w-4' />
          Delete selected
        </Button>
      </div>
    </div>
  )
}
