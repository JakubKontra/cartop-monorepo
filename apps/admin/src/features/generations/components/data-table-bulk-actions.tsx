'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, CheckCircle2 } from 'lucide-react'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type Generation } from '../types'
import { UPDATE_CATALOG_MODEL_GENERATION, GET_ALL_CATALOG_MODEL_GENERATIONS } from '../generations.graphql'
import { GenerationsMultiDeleteDialog } from './generations-multi-delete-dialog'
import { logger } from '@/lib/logger'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const [updateGeneration] = useMutation(UPDATE_CATALOG_MODEL_GENERATION, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODEL_GENERATIONS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleBulkUpdate = async (field: 'isActive', value: boolean) => {
    const selectedGenerations = selectedRows.map((row) => row.original as Generation)
    const fieldLabel = 'active'

    try {
      const updatePromises = selectedGenerations.map((generation) =>
        updateGeneration({
          variables: {
            id: generation.id,
            input: {
              [field]: value,
            },
          },
        })
      )

      await Promise.all(updatePromises)

      toast.success(
        `Successfully ${value ? 'set' : 'unset'} ${selectedGenerations.length} generation${selectedGenerations.length > 1 ? 's' : ''} as ${fieldLabel}`
      )
      table.resetRowSelection()
    } catch (error: unknown) {
      logger.error('Bulk update generations failed', error, { field, value, count: selectedGenerations.length })
      const message = error instanceof Error ? error.message : 'Failed to update generations'
      toast.error(message)
    }
  }

  const handleSetActive = () => handleBulkUpdate('isActive', true)
  const handleSetInactive = () => handleBulkUpdate('isActive', false)

  return (
    <>
      <BulkActionsToolbar table={table} entityName='generation'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleSetActive}
              className='size-8'
              aria-label='Set selected generations as active'
              title='Set as active'
            >
              <CheckCircle2 className='text-green-600' />
              <span className='sr-only'>Set selected generations as active</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Set as active</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleSetInactive}
              className='size-8'
              aria-label='Set selected generations as inactive'
              title='Set as inactive'
            >
              <CheckCircle2 className='text-muted-foreground' />
              <span className='sr-only'>Set selected generations as inactive</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Set as inactive</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected generations'
              title='Delete selected generations'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected generations</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected generations</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <GenerationsMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
