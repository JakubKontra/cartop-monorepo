'use client'

import { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { CREATE_CAR_REQUEST_LOG } from '../car-requests.graphql'
import { Loader2 } from 'lucide-react'

interface AddMessageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  carRequestId: string
  onSuccess?: () => void
}

interface FormData {
  message: string
  messageType: 'internal' | 'customer'
}

export function AddMessageModal({
  open,
  onOpenChange,
  carRequestId,
  onSuccess,
}: AddMessageModalProps) {
  const { auth } = useAuthStore()
  const [messageType, setMessageType] = useState<'internal' | 'customer'>('internal')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      message: '',
      messageType: 'internal',
    },
  })

  const [createLog, { loading }] = useMutation(CREATE_CAR_REQUEST_LOG, {
    onCompleted: () => {
      toast.success('Your message has been logged successfully.')
      reset()
      onOpenChange(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add message. Please try again.')
    },
  })

  const onSubmit = (data: FormData) => {
    const actionType = messageType === 'internal' ? 'NOTE_ADDED' : 'MESSAGE_SENT'
    const messagePrefix = messageType === 'internal' ? 'Internal note:' : 'Message sent:'

    createLog({
      variables: {
        input: {
          carRequestId,
          message: `${messagePrefix} ${data.message}`,
          actionType,
          metadata: {
            noteType: messageType,
            messageLength: data.message.length,
          },
          authorId: auth.user?.id,
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Add Message</DialogTitle>
          <DialogDescription>
            Add an internal note or log a customer message for this car request.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='messageType'>Message Type</Label>
            <Select
              value={messageType}
              onValueChange={(value) => setMessageType(value as 'internal' | 'customer')}
            >
              <SelectTrigger id='messageType'>
                <SelectValue placeholder='Select message type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='internal'>Internal Note</SelectItem>
                <SelectItem value='customer'>Customer Message</SelectItem>
              </SelectContent>
            </Select>
            <p className='text-muted-foreground text-xs'>
              {messageType === 'internal'
                ? 'Internal notes are only visible to your team'
                : 'Customer messages represent communications with the customer'}
            </p>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='message'>
              Message <span className='text-destructive'>*</span>
            </Label>
            <Textarea
              id='message'
              placeholder={
                messageType === 'internal'
                  ? 'Add internal notes about this request...'
                  : 'Describe the message or conversation...'
              }
              rows={6}
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 3,
                  message: 'Message must be at least 3 characters',
                },
              })}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && (
              <p className='text-destructive text-sm'>{errors.message.message}</p>
            )}
          </div>

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
              Add Message
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
