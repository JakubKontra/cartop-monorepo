'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import {
  Phone,
  PhoneMissed,
  PhoneIncoming,
  MailQuestion,
  Handshake,
  Clock10,
  X,
  ShoppingCart,
} from 'lucide-react'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  UPDATE_CAR_REQUEST,
  GET_CAR_REQUEST,
  GET_ALL_CAR_REQUESTS,
} from '../car-requests.graphql'

// Button colors
const BUTTON_COLORS = {
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  INFO: '#03bfbf',
  DANGER: '#dc3545',
} as const

// Cancellation reasons with user-friendly labels
const CANCELLATION_REASONS = [
  { value: 'BAD_CREDIT_SCORE', label: 'Bad Credit Score' },
  { value: 'CAR_UNAVAILABLE', label: 'Car Unavailable' },
  { value: 'CHANGED_MIND', label: 'Changed Mind' },
  { value: 'COMPETITOR_OFFER', label: 'Competitor Offer' },
  { value: 'DUPLICATE_REQUEST', label: 'Duplicate Request' },
  { value: 'INELIGIBLE_CUSTOMER', label: 'Ineligible Customer' },
  { value: 'INTERNAL_ERROR', label: 'Internal Error' },
  { value: 'INVALID_CONTACT', label: 'Invalid Contact' },
  { value: 'NO_INTEREST', label: 'No Interest' },
  { value: 'NO_MONEY', label: 'No Money' },
  { value: 'NO_NEED', label: 'No Need' },
  { value: 'NO_OPPORTUNITY', label: 'No Opportunity' },
  { value: 'NO_OTHER', label: 'No Other' },
  { value: 'NO_TIME', label: 'No Time' },
  { value: 'OTHER', label: 'Other' },
  { value: 'PRICE_TOO_HIGH', label: 'Price Too High' },
  { value: 'REJECTED_BY_FINANCE', label: 'Rejected by Finance' },
  { value: 'WAIT_TIME_TOO_LONG', label: 'Wait Time Too Long' },
] as const

interface CarRequestActionsPanelProps {
  carRequestId: string
}

export function CarRequestActionsPanel({
  carRequestId,
}: CarRequestActionsPanelProps) {
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancellationReason, setCancellationReason] = useState('')
  const [cancellationNote, setCancellationNote] = useState('')

  const [updateCarRequest, { loading }] = useMutation(UPDATE_CAR_REQUEST, {
    refetchQueries: [
      { query: GET_ALL_CAR_REQUESTS, variables: { limit: 1000, offset: 0 } },
      { query: GET_CAR_REQUEST, variables: { id: carRequestId } },
    ],
  })

  const resetCancellationForm = () => {
    setCancellationReason('')
    setCancellationNote('')
    setShowCancelModal(false)
  }

  const handleCarRequestUpdate = async (
    input: Record<string, unknown>,
    successMessage: string,
    errorMessage: string
  ) => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input,
        },
      })
      toast.success(successMessage)
    } catch (error) {
      logger.error(errorMessage, error, { carRequestId })
      toast.error(errorMessage)
    }
  }

  const handleCallSuccess = async () => {
    await handleCarRequestUpdate(
      { noteInternal: 'Call successful - customer reached' },
      'Call marked as successful',
      'Failed to update call status'
    )
  }

  const handleCallNotReached = async () => {
    await handleCarRequestUpdate(
      { noteInternal: 'Call not reached - customer unavailable' },
      'Call marked as not reached',
      'Failed to update call status'
    )
  }

  const handleRetryCallTomorrow = async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0, 0) // Set to 9 AM next day

    await handleCarRequestUpdate(
      {
        nextCallAt: tomorrow.toISOString(),
        noteInternal: 'Scheduled callback for tomorrow',
      },
      'Call scheduled for tomorrow at 9:00 AM',
      'Failed to schedule callback'
    )
  }

  const handleSendEmailWithQuestion = async () => {
    toast.info('Email functionality coming soon')
    // TODO: Implement email sending logic
  }

  const handlePassedToDealer = async () => {
    await handleCarRequestUpdate(
      {
        noteInternal: 'Passed to dealer for follow-up',
        relayedAt: new Date().toISOString(),
      },
      'Request passed to dealer',
      'Failed to update request status'
    )
  }

  const handleWaitingForOffer = async () => {
    await handleCarRequestUpdate(
      {
        waitingForOffer: true,
        noteInternal: 'Waiting for offer from dealer',
      },
      'Marked as waiting for offer',
      'Failed to update request status'
    )
  }

  const handleMarkAsPurchased = () => {
    // TODO: Implement purchased modal
    toast.info('Mark as purchased functionality coming soon')
  }

  const handleCancel = () => {
    setShowCancelModal(true)
  }

  const handleConfirmCancel = async () => {
    if (!cancellationReason) {
      toast.error('Please select a cancellation reason')
      return
    }

    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            closedAt: new Date().toISOString(),
            cancellationReason,
            cancellationNote: cancellationNote || undefined,
          },
        },
      })
      toast.success('Request cancelled')
      resetCancellationForm()
    } catch (error) {
      logger.error('Failed to cancel request', error, { carRequestId })
      toast.error('Failed to cancel request')
    }
  }

  return (
    <div className='bg-background sticky top-0 z-10 mb-3 w-full border-b shadow-sm'>
      <div className='w-full p-4'>
        <div className='flex w-full flex-wrap gap-3'>
          <Button
            size='lg'
            style={{ background: BUTTON_COLORS.SUCCESS }}
            onClick={handleCallSuccess}
            disabled={loading}
            className='min-w-[180px] flex-1'
          >
            <Phone className='h-5 w-5' />
            <span className='ml-2'>Call Reached</span>
          </Button>

          <Button
            size='lg'
            style={{ background: BUTTON_COLORS.WARNING }}
            onClick={handleCallNotReached}
            disabled={loading}
            className='min-w-[180px] flex-1'
          >
            <PhoneMissed className='h-5 w-5' />
            <span className='ml-2'>Not Reached</span>
          </Button>

          <Button
            size='lg'
            style={{ background: BUTTON_COLORS.WARNING }}
            onClick={handleRetryCallTomorrow}
            disabled={loading}
            className='min-w-[180px] flex-1'
          >
            <PhoneIncoming className='h-5 w-5' />
            <span className='ml-2'>Try Tomorrow</span>
          </Button>

          <Button
            size='lg'
            style={{ background: BUTTON_COLORS.INFO }}
            onClick={handleSendEmailWithQuestion}
            disabled={loading}
            className='min-w-[180px] flex-1'
          >
            <MailQuestion className='h-5 w-5' />
            <span className='ml-2'>Send Email</span>
          </Button>

          <Button
            size='lg'
            style={{ background: BUTTON_COLORS.INFO }}
            onClick={handlePassedToDealer}
            disabled={loading}
            className='min-w-[180px] flex-1'
          >
            <Handshake className='h-5 w-5' />
            <span className='ml-2'>Pass to Dealer</span>
          </Button>

          <Button
            size='lg'
            style={{ background: BUTTON_COLORS.INFO }}
            onClick={handleWaitingForOffer}
            disabled={loading}
            className='min-w-[180px] flex-1'
          >
            <Clock10 className='h-5 w-5' />
            <span className='ml-2'>Waiting for Offer</span>
          </Button>

          <Button
            size='lg'
            style={{ background: BUTTON_COLORS.SUCCESS }}
            onClick={handleMarkAsPurchased}
            disabled={loading}
            className='min-w-[180px] flex-1'
          >
            <ShoppingCart className='h-5 w-5' />
            <span className='ml-2'>Mark as Purchased</span>
          </Button>

          <Button
            size='lg'
            style={{ background: BUTTON_COLORS.DANGER }}
            onClick={handleCancel}
            disabled={loading}
            className='min-w-[180px] flex-1'
          >
            <X className='h-5 w-5' />
            <span className='ml-2'>Cancel Request</span>
          </Button>
        </div>
      </div>

      {/* Cancellation Modal */}
      <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Cancel Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for cancelling this car request. This information will be recorded for future reference.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='cancellation-reason'>
                Cancellation Reason <span className='text-destructive'>*</span>
              </Label>
              <Select
                value={cancellationReason}
                onValueChange={setCancellationReason}
              >
                <SelectTrigger id='cancellation-reason'>
                  <SelectValue placeholder='Select a reason' />
                </SelectTrigger>
                <SelectContent>
                  {CANCELLATION_REASONS.map((reason) => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='cancellation-note'>Additional Notes (Optional)</Label>
              <Textarea
                id='cancellation-note'
                placeholder='Add any additional context about the cancellation...'
                value={cancellationNote}
                onChange={(e) => setCancellationNote(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={resetCancellationForm}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleConfirmCancel}
              disabled={loading || !cancellationReason}
            >
              {loading ? 'Cancelling...' : 'Confirm Cancellation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
