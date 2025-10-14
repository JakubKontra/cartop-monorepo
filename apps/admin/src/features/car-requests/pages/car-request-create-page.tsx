'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { CarRequestForm } from '../components/car-request-form'
import { type CarRequestFormValues } from '../data/schema'
import { toCreateInput } from '../data/transformers'
import { CREATE_CAR_REQUEST, GET_ALL_CAR_REQUESTS } from '../car-requests.graphql'

export function CarRequestCreatePage() {
  const navigate = useNavigate()

  const [createCarRequest, { loading }] = useMutation(CREATE_CAR_REQUEST, {
    refetchQueries: [{ query: GET_ALL_CAR_REQUESTS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: CarRequestFormValues) => {
    try {
      await createCarRequest({
        variables: {
          input: toCreateInput(values),
        },
      })
      toast.success('Car request created successfully')
      navigate({ to: '/car-requests' })
    } catch (error: any) {
      console.error('Car request creation error:', error)
      toast.error(error.message || 'Failed to create car request')
    }
  }

  const handleCancel = () => {
    navigate({ to: '/car-requests' })
  }

  return (
    <CrudPageLayout
      title="Create Car Request"
      description="Add a new car request to the system"
      backUrl="/car-requests"
      backButtonLabel="Back to Car Requests"
    >
      <CarRequestForm
        isEdit={false}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </CrudPageLayout>
  )
}
