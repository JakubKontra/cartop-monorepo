'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Model } from '../types'
import { DELETE_CATALOG_MODEL, GET_ALL_CATALOG_MODELS } from '../models.graphql'

type ModelMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

const CONFIRM_WORD = 'DELETE'

export function ModelsMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: ModelMultiDeleteDialogProps<TData>) {
  const [value, setValue] = useState('')
  const [deleting, setDeleting] = useState(false)

  const selectedRows = table.getFilteredSelectedRowModel().rows

  const [deleteModel] = useMutation(DELETE_CATALOG_MODEL, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODELS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleDelete = async () => {
    if (value.trim() !== CONFIRM_WORD) {
      toast.error(`Please type "${CONFIRM_WORD}" to confirm.`)
      return
    }

    setDeleting(true)

    try {
      const selectedModels = selectedRows.map((row) => row.original as Model)

      const deletePromises = selectedModels.map((model) =>
        deleteModel({
          variables: {
            id: model.id,
          },
        })
      )

      await Promise.all(deletePromises)

      toast.success(
        `Deleted ${selectedRows.length} model${selectedRows.length > 1 ? 's' : ''}`
      )
      table.resetRowSelection()
      setValue('')
      onOpenChange(false)
    } catch (error: any) {
      console.error('Bulk delete error:', error)
      toast.error(error.message || 'Failed to delete models')
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
          {selectedRows.length > 1 ? 'models' : 'model'}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete the selected models? <br />
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
