'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { CarRequestForm } from '../components/car-request-form'
import { type CarRequestFormValues } from '../data/schema'
import { toFormValues, toUpdateInput } from '../data/transformers'
import { GET_CAR_REQUEST, UPDATE_CAR_REQUEST, GET_ALL_CAR_REQUESTS } from '../car-requests.graphql'

export function CarRequestEditPage() {
  const navigate = useNavigate()
  const { carRequestId } = useParams({ from: '/_authenticated/car-requests/$carRequestId/edit' })

  const { data, loading, error } = useQuery(GET_CAR_REQUEST, {
    variables: { id: carRequestId },
  })

  const [updateCarRequest, { loading: updating }] = useMutation(UPDATE_CAR_REQUEST, {
    refetchQueries: [
      { query: GET_ALL_CAR_REQUESTS, variables: { limit: 1000, offset: 0 } },
      { query: GET_CAR_REQUEST, variables: { id: carRequestId } }
    ],
  })

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
    } catch (error: any) {
      console.error('Car request update error:', error)
      toast.error(error.message || 'Failed to update car request')
    }
  }

  const handleCancel = () => {
    navigate({ to: '/car-requests' })
  }

  const carRequest = data?.carRequest

  return (
    <CrudPageLayout
      title="Edit Car Request"
      description={carRequest ? `Update request information` : undefined}
      backUrl="/car-requests"
      loading={loading}
      loadingMessage="Loading car request..."
      error={error || (!carRequest ? new Error('Car request not found') : null)}
      errorMessage={error?.message || 'Car request not found'}
      backButtonLabel="Back to Car Requests"
    >
      {carRequest && (
        <CarRequestForm
          isEdit={true}
          loading={updating}
          defaultValues={toFormValues(carRequest)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </CrudPageLayout>
  )
}
