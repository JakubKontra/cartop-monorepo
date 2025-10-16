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
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { onboardingStatusUpdateSchema, type OnboardingStatusUpdateFormValues } from '../data/schema'
import { toUpdateStatusVariables } from '../data/transformers'
import { UPDATE_ONBOARDING_STATUS, GET_ONBOARDING, GET_ALL_ONBOARDINGS } from '../onboardings.graphql'

interface OnboardingStatusUpdateDialogProps {
  onboardingId: string | null
  currentStatus?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OnboardingStatusUpdateDialog({
  onboardingId,
  currentStatus,
  open,
  onOpenChange,
}: OnboardingStatusUpdateDialogProps) {
  const [updateStatus, { loading }] = useMutation(UPDATE_ONBOARDING_STATUS, {
    refetchQueries: [
      { query: GET_ONBOARDING, variables: { id: onboardingId } },
      { query: GET_ALL_ONBOARDINGS },
    ],
    onCompleted: () => {
      toast.success('Onboarding status updated successfully')
      form.reset()
      onOpenChange(false)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const form = useForm<OnboardingStatusUpdateFormValues>({
    resolver: zodResolver(onboardingStatusUpdateSchema),
    defaultValues: {
      status: currentStatus as any || 'PENDING',
    },
  })

  const handleSubmit = (values: OnboardingStatusUpdateFormValues) => {
    if (!onboardingId) return

    const variables = toUpdateStatusVariables(values)
    updateStatus({
      variables: {
        onboardingId,
        ...variables,
      },
    })
  }

  if (!onboardingId) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Update Onboarding Status</DialogTitle>
          <DialogDescription>
            Manually change the status of this onboarding session.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Status <span className='text-destructive'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='PENDING'>Pending</SelectItem>
                      <SelectItem value='IN_PROGRESS'>In Progress</SelectItem>
                      <SelectItem value='COMPLETE'>Complete</SelectItem>
                      <SelectItem value='INCOMPLETE'>Incomplete</SelectItem>
                      <SelectItem value='EXPIRED'>Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the new status for this onboarding
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
                Update Status
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
