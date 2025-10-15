'use client'

import { useNavigate, useParams } from '@tanstack/react-router'
import { useQuery, useMutation } from '@apollo/client/react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'
import { extractAllGraphQLErrorMessages } from '@/lib/extract-graphql-error'
import { Button } from '@/components/ui/button'
import {
  GET_CAR_REQUEST,
  UPDATE_CAR_REQUEST,
  GET_ALL_CAR_REQUESTS,
} from '../car-requests.graphql'
import { CarRequestActionsPanel } from '../components/car-request-actions-panel'
import { CarRequestActivitySidebar } from '../components/car-request-activity-sidebar'
import { CarRequestCustomerInfoBar } from '../components/car-request-customer-info-bar'
import { CarRequestForm } from '../components/car-request-form'
import { CarRequestStatusIndicatorPanel } from '../components/car-request-status-indicator-panel'
import { type CarRequestFormValues } from '../data/schema'
import { toFormValues, toUpdateInput } from '../data/transformers'

export function CarRequestEditPage() {
  const navigate = useNavigate()
  const { carRequestId } = useParams({
    from: '/_authenticated/car-requests/$carRequestId/edit',
  })

  const { data, loading, error } = useQuery(GET_CAR_REQUEST, {
    variables: { id: carRequestId },
  })

  const [updateCarRequest, { loading: updating }] = useMutation(
    UPDATE_CAR_REQUEST,
    {
      refetchQueries: [
        { query: GET_ALL_CAR_REQUESTS, variables: { limit: 1000, offset: 0 } },
        { query: GET_CAR_REQUEST, variables: { id: carRequestId } },
      ],
    }
  )

  const handleSubmit = async (values: CarRequestFormValues) => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: toUpdateInput(values),
        },
      })
      toast.success('Car request updated successfully')
      navigate({ to: '/car-requests' })
    } catch (error: unknown) {
      logger.error('Car request update failed', error, {
        carRequestId,
        requestEmail: values.requestEmail,
      })

      // Extract all validation errors from the GraphQL error
      const errorMessages = extractAllGraphQLErrorMessages(error)

      // Display each error in a separate toast
      errorMessages.forEach((message) => {
        toast.error(message)
      })
    }
  }

  const handleCancel = () => {
    navigate({ to: '/car-requests' })
  }

  const carRequest = data?.carRequest

  // Loading state
  if (loading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
          <p className='text-muted-foreground text-sm'>
            Loading car request...
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !carRequest) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='flex max-w-md flex-col items-center gap-4 text-center'>
          <div className='bg-destructive/10 rounded-full p-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='text-destructive h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
          <div>
            <h2 className='text-lg font-semibold'>Error Loading Car Request</h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              {error?.message || 'Car request not found'}
            </p>
          </div>
          <Button onClick={() => navigate({ to: '/car-requests' })}>
            <ArrowLeft className='h-4 w-4' />
            Back to Car Requests
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-full'>
      {/* Main Content Area */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Header */}
        <div className='bg-background border-b p-6'>
          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => navigate({ to: '/car-requests' })}
            >
              <ArrowLeft className='h-4 w-4' />
            </Button>
            <div>
              <h1 className='text-2xl font-semibold'>Edit Car Request</h1>
              <p className='text-muted-foreground mt-1 text-sm'>
                Update request information
              </p>
            </div>
          </div>
        </div>

        {/* Content with Actions Panel and Form */}
        <div className='flex-1 overflow-auto'>
          <div className='space-y-0'>
            <CarRequestActionsPanel carRequestId={carRequestId} />
            <div className='px-6 pt-3 pb-6'>
              <CarRequestStatusIndicatorPanel
                nextCallAt={carRequest.nextCallAt}
                waitingForOffer={carRequest.waitingForOffer}
                confirmedAt={carRequest.confirmedAt}
                relayedAt={carRequest.relayedAt}
                feedbackAt={carRequest.feedbackAt}
                completedAt={carRequest.completedAt}
                closedAt={carRequest.closedAt}
              />
              <CarRequestCustomerInfoBar
                carRequestId={carRequestId}
                carRequest={carRequest}
              />
              {carRequest && (
                <CarRequestForm
                  key={carRequestId}
                  isEdit={true}
                  loading={updating}
                  defaultValues={toFormValues(carRequest)}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Sidebar */}
      <CarRequestActivitySidebar
        carRequestId={carRequestId}
        carRequest={carRequest}
      />
    </div>
  )
}
