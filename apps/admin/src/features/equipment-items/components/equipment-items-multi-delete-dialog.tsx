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

export function EquipmentItemsMultiDeleteDialog() {
  const { multiDeleteDialogOpen, setMultiDeleteDialogOpen, selectedItems, setSelectedItems } = useEquipmentItems()

  const [deleteItem, { loading }] = useMutation(DELETE_EQUIPMENT_ITEM, {
    refetchQueries: [{ query: GET_ALL_EQUIPMENT_ITEMS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map((item) =>
          deleteItem({ variables: { id: item.id } })
        )
      )
      toast.success(`Successfully deleted ${selectedItems.length} equipment item(s)`)
      setMultiDeleteDialogOpen(false)
      setSelectedItems([])
    } catch (error) {
      logger.error('Bulk equipment item deletion failed', error, { itemCount: selectedItems.length })
      toast.error('Failed to delete some equipment items')
    }
  }

  return (
    <AlertDialog open={multiDeleteDialogOpen} onOpenChange={setMultiDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {selectedItems.length} equipment item(s). This
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
