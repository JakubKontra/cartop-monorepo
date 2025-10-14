import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, Star, TrendingUp, CheckCircle2 } from 'lucide-react'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type Model } from '../types'
import { UPDATE_CATALOG_MODEL, GET_ALL_CATALOG_MODELS } from '../models.graphql'
import { ModelsMultiDeleteDialog } from './models-multi-delete-dialog'
import { logger } from '@/lib/logger'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const [updateModel] = useMutation(UPDATE_CATALOG_MODEL, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODELS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleBulkUpdate = async (field: 'isActive' | 'isHighlighted' | 'isRecommended', value: boolean) => {
    const selectedModels = selectedRows.map((row) => row.original as Model)
    const fieldLabel = field === 'isActive' ? 'active' : field === 'isHighlighted' ? 'highlighted' : 'recommended'

    try {
      const updatePromises = selectedModels.map((model) =>
        updateModel({
          variables: {
            id: model.id,
            input: {
              [field]: value,
            },
          },
        })
      )

      await Promise.all(updatePromises)

      toast.success(
        `Successfully ${value ? 'set' : 'unset'} ${selectedModels.length} model${selectedModels.length > 1 ? 's' : ''} as ${fieldLabel}`
      )
      table.resetRowSelection()
    } catch (error: unknown) {
      logger.error('Bulk update models failed', error, { field, value, count: selectedModels.length })
      const message = error instanceof Error ? error.message : 'Failed to update models'
      toast.error(message)
    }
  }

  const handleSetActive = () => handleBulkUpdate('isActive', true)
  const handleSetInactive = () => handleBulkUpdate('isActive', false)
  const handleSetHighlighted = () => handleBulkUpdate('isHighlighted', true)
  const handleUnsetHighlighted = () => handleBulkUpdate('isHighlighted', false)
  const handleSetRecommended = () => handleBulkUpdate('isRecommended', true)
  const handleUnsetRecommended = () => handleBulkUpdate('isRecommended', false)

  return (
    <>
      <BulkActionsToolbar table={table} entityName='model'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleSetActive}
              className='size-8'
              aria-label='Set selected models as active'
              title='Set as active'
            >
              <CheckCircle2 className='text-green-600' />
              <span className='sr-only'>Set selected models as active</span>
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
              aria-label='Set selected models as inactive'
              title='Set as inactive'
            >
              <CheckCircle2 className='text-muted-foreground' />
              <span className='sr-only'>Set selected models as inactive</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Set as inactive</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleSetHighlighted}
              className='size-8'
              aria-label='Set selected models as highlighted'
              title='Set as highlighted'
            >
              <Star className='fill-yellow-400 text-yellow-400' />
              <span className='sr-only'>Set selected models as highlighted</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Set as highlighted</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleUnsetHighlighted}
              className='size-8'
              aria-label='Unset selected models as highlighted'
              title='Remove highlight'
            >
              <Star className='text-muted-foreground' />
              <span className='sr-only'>Unset selected models as highlighted</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove highlight</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleSetRecommended}
              className='size-8'
              aria-label='Set selected models as recommended'
              title='Set as recommended'
            >
              <TrendingUp className='text-blue-600' />
              <span className='sr-only'>Set selected models as recommended</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Set as recommended</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleUnsetRecommended}
              className='size-8'
              aria-label='Unset selected models as recommended'
              title='Remove recommendation'
            >
              <TrendingUp className='text-muted-foreground' />
              <span className='sr-only'>Unset selected models as recommended</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove recommendation</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected models'
              title='Delete selected models'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected models</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected models</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <ModelsMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
