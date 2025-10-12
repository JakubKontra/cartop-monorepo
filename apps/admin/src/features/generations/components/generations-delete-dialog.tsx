'use client'

import { useMutation } from '@apollo/client/react'
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
import { useGenerations } from './generations-provider'
import { DELETE_CATALOG_MODEL_GENERATION, GET_ALL_CATALOG_MODEL_GENERATIONS } from '../generations.graphql'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function GenerationsDeleteDialog() {
  const { open, setOpen, currentRow } = useGenerations()

  const [deleteGeneration, { loading }] = useMutation(DELETE_CATALOG_MODEL_GENERATION, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODEL_GENERATIONS, variables: { limit: 1000, offset: 0 } }],
    onCompleted: () => {
          toast.success('Generation deleted successfully')
      setOpen(null)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleDelete = async () => {
    if (!currentRow) return

    await deleteGeneration({
      variables: {
        id: currentRow.id,
      },
    })
  }

  return (
    <AlertDialog open={open === 'delete'} onOpenChange={() => setOpen(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the generation &quot;{currentRow?.name}&quot;. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={loading}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
