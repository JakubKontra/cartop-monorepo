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
import { type LeasingCompany } from '../types'
import {  DELETE_LEASING_COMPANY, GET_ALL_LEASING_COMPANIES } from '../leasing-companies.graphql'

interface LeasingCompanyDeleteDialogProps {
  company: LeasingCompany
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeasingCompanyDeleteDialog({
  company,
  open,
  onOpenChange,
}: LeasingCompanyDeleteDialogProps) {
  const [deleteLeasingCompany, { loading }] = useMutation(DELETE_LEASING_COMPANY, {
    refetchQueries: [{ query: GET_ALL_LEASING_COMPANIES }],
    onCompleted: () => {
      toast.success(`Leasing company "${company.name}" deleted successfully`)
      onOpenChange(false)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleDelete = () => {
    deleteLeasingCompany({
      variables: { id: company.id },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the leasing company <strong>"{company.name}"</strong>.
            This action cannot be undone.
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
