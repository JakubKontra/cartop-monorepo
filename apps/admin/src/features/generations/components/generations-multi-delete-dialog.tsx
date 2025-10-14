'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { type Generation } from '../types'
import { DELETE_CATALOG_MODEL_GENERATION, GET_ALL_CATALOG_MODEL_GENERATIONS } from '../generations.graphql'
import { logger } from '@/lib/logger'

type GenerationsMultiDeleteDialogProps<TData> = {
  table: Table<TData>
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GenerationsMultiDeleteDialog<TData>({
  table,
  open,
  onOpenChange,
}: GenerationsMultiDeleteDialogProps<TData>) {
  const [isDeleting, setIsDeleting] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedGenerations = selectedRows.map((row) => row.original as Generation)

  const [deleteGeneration] = useMutation(DELETE_CATALOG_MODEL_GENERATION, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODEL_GENERATIONS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const deletePromises = selectedGenerations.map((generation) =>
        deleteGeneration({
          variables: { id: generation.id },
        })
      )

      await Promise.all(deletePromises)

      toast.success(
        `Successfully deleted ${selectedGenerations.length} generation${selectedGenerations.length > 1 ? 's' : ''}`
      )
      table.resetRowSelection()
      onOpenChange(false)
    } catch (error: unknown) {
      logger.error('Bulk delete generations failed', error, { count: selectedGenerations.length })
      const message = error instanceof Error ? error.message : 'Failed to delete generations'
      toast.error(message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete {selectedGenerations.length} generation
            {selectedGenerations.length > 1 ? 's' : ''}. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className='bg-destructive hover:bg-destructive/90'>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
