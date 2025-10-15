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
import { type Brand } from '../types'
import { UPDATE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'
import { BrandsMultiDeleteDialog } from './brands-multi-delete-dialog'
import { logger } from '@/lib/logger'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const [updateBrand] = useMutation(UPDATE_CATALOG_BRAND, {
    refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleBulkUpdate = async (field: 'isActive' | 'isHighlighted' | 'isRecommended', value: boolean) => {
    const selectedBrands = selectedRows.map((row) => row.original as Brand)
    const fieldLabel = field === 'isActive' ? 'active' : field === 'isHighlighted' ? 'highlighted' : 'recommended'

    try {
      const updatePromises = selectedBrands.map((brand) =>
        updateBrand({
          variables: {
            id: brand.id,
            input: {
              [field]: value,
            },
          },
        })
      )

      await Promise.all(updatePromises)

      toast.success(
        `Successfully ${value ? 'set' : 'unset'} ${selectedBrands.length} brand${selectedBrands.length > 1 ? 's' : ''} as ${fieldLabel}`
      )
      table.resetRowSelection()
    } catch (error: unknown) {
      logger.error('Bulk update brands failed', error, { field, value, count: selectedBrands.length })
      const message = error instanceof Error ? error.message : 'Failed to update brands'
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
      <BulkActionsToolbar table={table} entityName='brand'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleSetActive}
              className='size-8'
              aria-label='Set selected brands as active'
              title='Set as active'
            >
              <CheckCircle2 className='text-green-600' />
              <span className='sr-only'>Set selected brands as active</span>
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
              aria-label='Set selected brands as inactive'
              title='Set as inactive'
            >
              <CheckCircle2 className='text-muted-foreground' />
              <span className='sr-only'>Set selected brands as inactive</span>
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
              aria-label='Set selected brands as highlighted'
              title='Set as highlighted'
            >
              <Star className='fill-yellow-400 text-yellow-400' />
              <span className='sr-only'>Set selected brands as highlighted</span>
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
              aria-label='Unset selected brands as highlighted'
              title='Remove highlight'
            >
              <Star className='text-muted-foreground' />
              <span className='sr-only'>Unset selected brands as highlighted</span>
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
              aria-label='Set selected brands as recommended'
              title='Set as recommended'
            >
              <TrendingUp className='text-blue-600' />
              <span className='sr-only'>Set selected brands as recommended</span>
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
              aria-label='Unset selected brands as recommended'
              title='Remove recommendation'
            >
              <TrendingUp className='text-muted-foreground' />
              <span className='sr-only'>Unset selected brands as recommended</span>
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
              aria-label='Delete selected brands'
              title='Delete selected brands'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected brands</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected brands</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <BrandsMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
