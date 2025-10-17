'use client'

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
import { useColors } from './colors-provider'
import { DELETE_CATALOG_COLOR, GET_ALL_CATALOG_COLORS } from '../colors.graphql'
import { logger } from '@/lib/logger'

export function ColorsDeleteDialog() {
  const { deleteDialogOpen, setDeleteDialogOpen, selectedColor, setSelectedColor } = useColors()

  const [deleteColor, { loading }] = useMutation(DELETE_CATALOG_COLOR, {
    refetchQueries: [{ query: GET_ALL_CATALOG_COLORS, variables: { limit: 1000, offset: 0 } }],
    onCompleted: () => {
      toast.success('Color deleted successfully')
      setDeleteDialogOpen(false)
      setSelectedColor(null)
    },
    onError: (error) => {
      logger.error('Color deletion failed', error, { colorId: selectedColor?.id })
      toast.error(`Failed to delete color: ${error.message}`)
    },
  })

  const handleDelete = async () => {
    if (!selectedColor) return
    await deleteColor({ variables: { id: selectedColor.id } })
  }

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the color{' '}
            <span className='font-semibold'>{selectedColor?.name}</span>. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {loading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
