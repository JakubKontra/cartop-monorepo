'use client'

import { useState } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Model } from '../types'
import { DELETE_CATALOG_MODEL, GET_ALL_CATALOG_MODELS } from '../models.graphql'

type ModelDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Model
}

export function ModelsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ModelDeleteDialogProps) {
  const [value, setValue] = useState('')

  const [deleteModel, { loading }] = useMutation(DELETE_CATALOG_MODEL, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODELS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleDelete = async () => {
    if (value.trim() !== currentRow.name) return

    try {
      await deleteModel({
        variables: {
          id: currentRow.id,
        },
      })
      toast.success(`Model "${currentRow.name}" deleted successfully`)
      setValue('')
      onOpenChange(false)
    } catch (error: any) {
      console.error('Delete model error:', error)
      toast.error(error.message || 'Failed to delete model')
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name || loading}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          Delete Model
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove the model from the system. This
            cannot be undone.
          </p>

          <Label className='my-2'>
            Model Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter model name to confirm deletion.'
              disabled={loading}
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
        loading ? (
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
