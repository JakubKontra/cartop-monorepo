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

export function EnginesMultiDeleteDialog() {
  const { enginesToDelete, setEnginesToDelete } = useEngines()
  const [deleteEngine, { loading }] = useMutation(DELETE_ENGINE, {
    refetchQueries: [{ query: GET_ALL_ENGINES }],
  })

  const handleDelete = async () => {
    if (!enginesToDelete || enginesToDelete.length === 0) return

    try {
      await Promise.all(
        enginesToDelete.map((id) =>
          deleteEngine({
            variables: { id },
          })
        )
      )
      toast.success(`Successfully deleted ${enginesToDelete.length} engine(s)`)
      setEnginesToDelete(null)
    } catch (error: any) {
      toast.error(`Failed to delete engines: ${error.message}`)
    }
  }

  const count = enginesToDelete?.length || 0

  return (
    <AlertDialog
      open={!!enginesToDelete && enginesToDelete.length > 0}
      onOpenChange={() => setEnginesToDelete(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{' '}
            <span className='font-semibold'>{count}</span> {count === 1 ? 'engine' : 'engines'} from
            the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : `Delete ${count} engine${count === 1 ? '' : 's'}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
