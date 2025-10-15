'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Brand } from '../types'
import { DELETE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'
import { logger } from '@/lib/logger'
import { useMutationWithErrorHandling } from '@/hooks/use-mutation-with-error-handling'
import { extractGraphQLErrorMessage } from '@/lib/extract-graphql-error'

type BrandMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

const CONFIRM_WORD = 'DELETE'

export function BrandsMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: BrandMultiDeleteDialogProps<TData>) {
  const [value, setValue] = useState('')
  const [deleting, setDeleting] = useState(false)

  const selectedRows = table.getFilteredSelectedRowModel().rows

  const [deleteBrand] = useMutationWithErrorHandling(DELETE_CATALOG_BRAND, {
    refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS, variables: { limit: 1000, offset: 0 } }],
    showSuccessToast: false, // We'll show custom success toast for bulk operations
    showErrorToast: false, // We'll handle errors manually for bulk operations
  })

  const handleDelete = async () => {
    if (value.trim() !== CONFIRM_WORD) {
      toast.error(`Please type "${CONFIRM_WORD}" to confirm.`)
      return
    }

    setDeleting(true)

    try {
      const selectedBrands = selectedRows.map((row) => row.original as Brand)

      // Delete all brands, collecting any errors
      const results = await Promise.allSettled(
        selectedBrands.map((brand) =>
          deleteBrand({
            variables: {
              id: brand.id,
            },
          })
        )
      )

      // Count successes and failures
      const successes = results.filter((r) => r.status === 'fulfilled').length
      const failures = results.filter((r) => r.status === 'rejected').length

      // Handle results
      if (failures === 0) {
        // All successful
        toast.success(
          `Deleted ${selectedRows.length} brand${selectedRows.length > 1 ? 's' : ''}`
        )
        table.resetRowSelection()
        setValue('')
        onOpenChange(false)
      } else if (successes === 0) {
        // All failed
        const firstError = results.find((r) => r.status === 'rejected') as PromiseRejectedResult
        const errorMessage = extractGraphQLErrorMessage(firstError.reason)

        // Provide user-friendly message for common errors
        if (errorMessage.includes('foreign key constraint')) {
          toast.error(
            'Cannot delete: One or more brands are being used by offers. Please remove the offers first.'
          )
        } else {
          toast.error(`Failed to delete brands: ${errorMessage}`)
        }

        logger.error('Bulk delete brands failed', firstError.reason, {
          count: selectedRows.length,
        })
      } else {
        // Partial success
        toast.warning(
          `Deleted ${successes} brand${successes > 1 ? 's' : ''}, but ${failures} failed. Some brands may be in use by offers.`
        )
        table.resetRowSelection()
        setValue('')
        onOpenChange(false)

        logger.warn('Partial bulk delete brands', {
          successes,
          failures,
          total: selectedRows.length,
        })
      }
    } catch (error: unknown) {
      // Unexpected error outside of Promise.allSettled
      logger.error('Unexpected error during bulk delete', error, {
        count: selectedRows.length,
      })
      toast.error('An unexpected error occurred during bulk delete')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== CONFIRM_WORD || deleting}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          Delete {selectedRows.length}{' '}
          {selectedRows.length > 1 ? 'brands' : 'brand'}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete the selected brands? <br />
            This action cannot be undone.
          </p>

          <Label className='my-4 flex flex-col items-start gap-1.5'>
            <span className=''>Confirm by typing "{CONFIRM_WORD}":</span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Type "${CONFIRM_WORD}" to confirm.`}
              disabled={deleting}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={
        deleting ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Deleting...
          </>
        ) : (
          'Delete'
        )
      }
      destructive
    />
  )
}
