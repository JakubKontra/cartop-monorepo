'use client'

import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { CREATE_CAR_REQUEST_LOG } from '../car-requests.graphql'
import { Crown, Loader2 } from 'lucide-react'

interface MarkVipModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  carRequestId: string
  customerName?: string
  onSuccess?: () => void
}

interface FormData {
  reason?: string
}

export function MarkVipModal({
  open,
  onOpenChange,
  carRequestId,
  customerName,
  onSuccess,
}: MarkVipModalProps) {
  const { auth } = useAuthStore()
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      reason: '',
    },
  })

  const [createLog, { loading }] = useMutation(CREATE_CAR_REQUEST_LOG, {
    onCompleted: () => {
      toast.success(`${customerName || 'This customer'} has been marked as a VIP.`)
      reset()
      onOpenChange(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to mark as VIP. Please try again.')
    },
  })

  const onSubmit = (data: FormData) => {
    const message = data.reason
      ? `Marked as VIP: ${data.reason}`
      : 'Customer marked as VIP'

    createLog({
      variables: {
        input: {
          carRequestId,
          message,
          actionType: 'MARKED_VIP',
          metadata: {
            reason: data.reason || null,
            markedAt: new Date().toISOString(),
          },
          authorId: auth.user?.id,
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[450px]'>
        <DialogHeader>
          <div className='bg-primary/10 text-primary mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full'>
            <Crown className='h-6 w-6' />
          </div>
          <DialogTitle className='text-center'>Mark as VIP Customer</DialogTitle>
          <DialogDescription className='text-center'>
            This will flag {customerName || 'this customer'} as a high-priority VIP customer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='reason'>Reason (Optional)</Label>
            <Textarea
              id='reason'
              placeholder='Why is this customer a VIP? (e.g., High-value purchase, repeat customer, special requirements...)'
              rows={4}
              {...register('reason')}
            />
            <p className='text-muted-foreground text-xs'>
              Add context about why this customer should receive priority attention
            </p>
          </div>

          <DialogFooter className='sm:justify-center'>
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
              <Crown className='mr-2 h-4 w-4' />
              Mark as VIP
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
