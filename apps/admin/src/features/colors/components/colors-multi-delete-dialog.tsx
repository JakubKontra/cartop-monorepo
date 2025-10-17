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

export function ColorsMultiDeleteDialog() {
  const { multiDeleteDialogOpen, setMultiDeleteDialogOpen, selectedColors, setSelectedColors } = useColors()

  const [deleteColor, { loading }] = useMutation(DELETE_CATALOG_COLOR, {
    refetchQueries: [{ query: GET_ALL_CATALOG_COLORS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedColors.map((color) =>
          deleteColor({ variables: { id: color.id } })
        )
      )
      toast.success(`Successfully deleted ${selectedColors.length} color(s)`)
      setMultiDeleteDialogOpen(false)
      setSelectedColors([])
    } catch (error) {
      logger.error('Bulk color deletion failed', error, { colorCount: selectedColors.length })
      toast.error('Failed to delete some colors')
    }
  }

  return (
    <AlertDialog open={multiDeleteDialogOpen} onOpenChange={setMultiDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {selectedColors.length} color(s). This
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
            {loading ? 'Deleting...' : 'Delete All'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
