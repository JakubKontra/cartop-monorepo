import { type Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type CarRequest } from '../types'

interface DataTableBulkActionsProps<TData> {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length

  if (selectedRowsCount === 0) return null

  return (
    <div className='fixed inset-x-0 bottom-4 z-50 mx-auto w-fit px-4'>
      <div className='flex w-full items-center gap-2 rounded-md border bg-card p-4 shadow-2xl'>
        <div className='flex items-center gap-3'>
          <p className='text-sm font-medium'>
            {selectedRowsCount} row{selectedRowsCount > 1 ? 's' : ''} selected
          </p>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.toggleAllPageRowsSelected(false)}
          >
            <X className='h-4 w-4' />
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
