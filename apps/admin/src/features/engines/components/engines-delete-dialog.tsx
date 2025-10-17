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
import { toast } from 'sonner'
import { DELETE_ENGINE, GET_ALL_ENGINES } from '../engines.graphql'
import { useEngines } from './engines-provider'

export function EnginesDeleteDialog() {
  const { engineToDelete, setEngineToDelete } = useEngines()
  const [deleteEngine, { loading }] = useMutation(DELETE_ENGINE, {
    refetchQueries: [{ query: GET_ALL_ENGINES }],
    onCompleted: () => {
      toast.success('Engine deleted successfully')
      setEngineToDelete(null)
    },
    onError: (error) => {
      toast.error(`Failed to delete engine: ${error.message}`)
    },
  })

  const handleDelete = async () => {
    if (!engineToDelete) return

    await deleteEngine({
      variables: { id: engineToDelete },
    })
  }

  return (
    <AlertDialog open={!!engineToDelete} onOpenChange={() => setEngineToDelete(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the engine from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
