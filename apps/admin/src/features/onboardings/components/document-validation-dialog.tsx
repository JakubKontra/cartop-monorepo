'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@apollo/client/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { documentValidationSchema, type DocumentValidationFormValues } from '../data/schema'
import { toDocumentValidationInput } from '../data/transformers'
import { VALIDATE_DOCUMENT, GET_ONBOARDING } from '../onboardings.graphql'
import { type OnboardingDocument } from '../types'

interface DocumentValidationDialogProps {
  document: OnboardingDocument | null
  onboardingId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentValidationDialog({
  document,
  onboardingId,
  open,
  onOpenChange,
}: DocumentValidationDialogProps) {
  const [validateDocument, { loading }] = useMutation(VALIDATE_DOCUMENT, {
    refetchQueries: [
      { query: GET_ONBOARDING, variables: { id: onboardingId } },
    ],
    onCompleted: () => {
      toast.success('Document validation updated successfully')
      form.reset()
      onOpenChange(false)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const form = useForm<DocumentValidationFormValues>({
    resolver: zodResolver(documentValidationSchema),
    defaultValues: {
      status: 'APPROVED',
      note: '',
    },
  })

  const handleSubmit = (values: DocumentValidationFormValues) => {
    if (!document) return

    const input = toDocumentValidationInput(values)
    validateDocument({
      variables: {
        documentId: document.id,
        input,
      },
    })
  }

  if (!document) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Validate Document</DialogTitle>
          <DialogDescription>
            Review and validate the uploaded document: <strong>{document.documentTemplate.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Document Preview Info */}
          <div className='rounded-lg border p-4 space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>File:</span>
              <span className='text-sm text-muted-foreground'>{document.file.name}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Size:</span>
              <span className='text-sm text-muted-foreground'>{document.file.sizeFormatted}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Uploaded:</span>
              <span className='text-sm text-muted-foreground'>
                {new Date(document.uploadedAt).toLocaleString()}
              </span>
            </div>
            {document.file.url && (
              <div className='pt-2'>
                <a
                  href={document.file.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-blue-600 hover:underline'
                >
                  View Document →
                </a>
              </div>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Validation Status <span className='text-destructive'>*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select validation status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='APPROVED'>Approve</SelectItem>
                        <SelectItem value='REJECTED'>Reject</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose whether to approve or reject this document
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='note'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Provide feedback (required if rejecting)...'
                        className='resize-none'
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional note to the customer explaining the validation decision
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={loading}>
                  {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  Submit Validation
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
