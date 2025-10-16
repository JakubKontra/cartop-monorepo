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
import { type DocumentTemplate } from '../types'
import { DELETE_DOCUMENT_TEMPLATE, GET_ALL_DOCUMENT_TEMPLATES } from '../document-templates.graphql'

interface DocumentTemplateDeleteDialogProps {
  template: DocumentTemplate
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentTemplateDeleteDialog({
  template,
  open,
  onOpenChange,
}: DocumentTemplateDeleteDialogProps) {
  const [deleteDocumentTemplate, { loading }] = useMutation(DELETE_DOCUMENT_TEMPLATE, {
    refetchQueries: [{ query: GET_ALL_DOCUMENT_TEMPLATES }],
    onCompleted: () => {
      toast.success(`Document template "${template.name}" deleted successfully`)
      onOpenChange(false)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleDelete = () => {
    deleteDocumentTemplate({
      variables: { id: template.id },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the document template <strong>"{template.name}"</strong>.
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
