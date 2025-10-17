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
import { useEquipmentItems } from './equipment-items-provider'
import { DELETE_EQUIPMENT_ITEM, GET_ALL_EQUIPMENT_ITEMS } from '../equipment-items.graphql'
import { logger } from '@/lib/logger'

export function EquipmentItemsDeleteDialog() {
  const { deleteDialogOpen, setDeleteDialogOpen, selectedItem, setSelectedItem } = useEquipmentItems()

  const [deleteItem, { loading }] = useMutation(DELETE_EQUIPMENT_ITEM, {
    refetchQueries: [{ query: GET_ALL_EQUIPMENT_ITEMS, variables: { limit: 1000, offset: 0 } }],
    onCompleted: () => {
      toast.success('Equipment item deleted successfully')
      setDeleteDialogOpen(false)
      setSelectedItem(null)
    },
    onError: (error) => {
      logger.error('Equipment item deletion failed', error, { itemId: selectedItem?.id })
      toast.error(`Failed to delete equipment item: ${error.message}`)
    },
  })

  const handleDelete = async () => {
    if (!selectedItem) return
    await deleteItem({ variables: { id: selectedItem.id } })
  }

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the equipment item{' '}
            <span className='font-semibold'>{selectedItem?.name}</span>. This
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
