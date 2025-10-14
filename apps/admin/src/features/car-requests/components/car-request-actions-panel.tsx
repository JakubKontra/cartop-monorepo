'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
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
import { Button } from '@/components/ui/button'
import { UPDATE_CAR_REQUEST, GET_CAR_REQUEST, GET_ALL_CAR_REQUESTS } from '../car-requests.graphql'
import { logger } from '@/lib/logger'

interface CarRequestActionsPanelProps {
  carRequestId: string
}

export function CarRequestActionsPanel({ carRequestId }: CarRequestActionsPanelProps) {
  const [_showPurchasedModal, setShowPurchasedModal] = useState(false)

  const [updateCarRequest, { loading }] = useMutation(UPDATE_CAR_REQUEST, {
    refetchQueries: [
      { query: GET_ALL_CAR_REQUESTS, variables: { limit: 1000, offset: 0 } },
      { query: GET_CAR_REQUEST, variables: { id: carRequestId } },
    ],
  })

  const handleCallSuccess = async () => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            // Add your logic here - e.g., update status, add notes
            noteInternal: 'Call successful - customer reached',
          },
        },
      })
      toast.success('Call marked as successful')
    } catch (error) {
      logger.error('Failed to mark call as successful', error, { carRequestId })
      toast.error('Failed to update call status')
    }
  }

  const handleCallNotReached = async () => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            noteInternal: 'Call not reached - customer unavailable',
          },
        },
      })
      toast.success('Call marked as not reached')
    } catch (error) {
      logger.error('Failed to mark call as not reached', error, { carRequestId })
      toast.error('Failed to update call status')
    }
  }

  const handleRetryCallTomorrow = async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0, 0) // Set to 9 AM next day

    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            nextCallAt: tomorrow.toISOString(),
            noteInternal: 'Scheduled callback for tomorrow',
          },
        },
      })
      toast.success('Call scheduled for tomorrow at 9:00 AM')
    } catch (error) {
      logger.error('Failed to schedule call for tomorrow', error, { carRequestId })
      toast.error('Failed to schedule callback')
    }
  }

  const handleSendEmailWithQuestion = async () => {
    toast.info('Email functionality coming soon')
    // TODO: Implement email sending logic
  }

  const handlePassedToDealer = async () => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            noteInternal: 'Passed to dealer for follow-up',
            relayedAt: new Date().toISOString(),
          },
        },
      })
      toast.success('Request passed to dealer')
    } catch (error) {
      logger.error('Failed to pass request to dealer', error, { carRequestId })
      toast.error('Failed to update request status')
    }
  }

  const handleWaitingForOffer = async () => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            waitingForOffer: true,
            noteInternal: 'Waiting for offer from dealer',
          },
        },
      })
      toast.success('Marked as waiting for offer')
    } catch (error) {
      logger.error('Failed to mark as waiting for offer', error, { carRequestId })
      toast.error('Failed to update request status')
    }
  }

  const handleMarkAsPurchased = () => {
    setShowPurchasedModal(true)
    // TODO: Implement purchased modal
    toast.info('Mark as purchased functionality coming soon')
  }

  const handleCancel = async () => {
    // TODO: Add confirmation dialog
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            closedAt: new Date().toISOString(),
            noteInternal: 'Request cancelled',
          },
        },
      })
      toast.success('Request cancelled')
    } catch (error) {
      logger.error('Failed to cancel request', error, { carRequestId })
      toast.error('Failed to cancel request')
    }
  }

  return (
    <div className='sticky top-0 z-10 w-full bg-background border-b shadow-sm mb-6'>
      <div className='w-full p-4'>
        <div className='flex flex-wrap gap-3 w-full'>
          <Button
            size='lg'
            style={{ background: '#28a745' }}
            onClick={handleCallSuccess}
            disabled={loading}
            className='flex-1 min-w-[180px]'
          >
            <Phone className='w-5 h-5' />
            <span className='ml-2'>Call Reached</span>
          </Button>

          <Button
            size='lg'
            style={{ background: '#ffc107' }}
            onClick={handleCallNotReached}
            disabled={loading}
            className='flex-1 min-w-[180px]'
          >
            <PhoneMissed className='w-5 h-5' />
            <span className='ml-2'>Not Reached</span>
          </Button>

          <Button
            size='lg'
            style={{ background: '#ffc107' }}
            onClick={handleRetryCallTomorrow}
            disabled={loading}
            className='flex-1 min-w-[180px]'
          >
            <PhoneIncoming className='w-5 h-5' />
            <span className='ml-2'>Try Tomorrow</span>
          </Button>

          <Button
            size='lg'
            style={{ background: '#03bfbf' }}
            onClick={handleSendEmailWithQuestion}
            disabled={loading}
            className='flex-1 min-w-[180px]'
          >
            <MailQuestion className='w-5 h-5' />
            <span className='ml-2'>Send Email</span>
          </Button>

          <Button
            size='lg'
            style={{ background: '#03bfbf' }}
            onClick={handlePassedToDealer}
            disabled={loading}
            className='flex-1 min-w-[180px]'
          >
            <Handshake className='w-5 h-5' />
            <span className='ml-2'>Pass to Dealer</span>
          </Button>

          <Button
            size='lg'
            style={{ background: '#03bfbf' }}
            onClick={handleWaitingForOffer}
            disabled={loading}
            className='flex-1 min-w-[180px]'
          >
            <Clock10 className='w-5 h-5' />
            <span className='ml-2'>Waiting for Offer</span>
          </Button>

          <Button
            size='lg'
            variant='default'
            onClick={handleMarkAsPurchased}
            disabled={loading}
            className='flex-1 min-w-[180px]'
          >
            <ShoppingCart className='w-5 h-5' />
            <span className='ml-2'>Mark as Purchased</span>
          </Button>

          <Button
            size='lg'
            style={{ background: '#dc3545' }}
            onClick={handleCancel}
            disabled={loading}
            className='flex-1 min-w-[180px]'
          >
            <X className='w-5 h-5' />
            <span className='ml-2'>Cancel Request</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
