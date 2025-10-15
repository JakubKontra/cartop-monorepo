'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { CarRequestForm } from '../components/car-request-form'
import { type CarRequestFormValues } from '../data/schema'
import { toCreateInput } from '../data/transformers'
import { CREATE_CAR_REQUEST, GET_ALL_CAR_REQUESTS } from '../car-requests.graphql'
import { logger } from '@/lib/logger'
import { extractAllGraphQLErrorMessages } from '@/lib/extract-graphql-error'

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
    } catch (error: unknown) {
      logger.error('Car request creation failed', error, { requestEmail: values.requestEmail })

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
