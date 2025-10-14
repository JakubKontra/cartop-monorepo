'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { ModelForm } from '../components/model-form'
import { type ModelFormValues } from '../data/schema'
import { toCreateInput } from '../data/transformers'
import { CREATE_CATALOG_MODEL, GET_ALL_CATALOG_MODELS } from '../models.graphql'
import { logger } from '@/lib/logger'

export function ModelCreatePage() {
  const navigate = useNavigate()

  const [createModel, { loading }] = useMutation(CREATE_CATALOG_MODEL, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODELS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: ModelFormValues) => {
    try {
      await createModel({
        variables: {
          input: toCreateInput(values),
        },
      })
      toast.success('Model created successfully')
      navigate({ to: '/models' })
    } catch (error: unknown) {
      logger.error('Model creation failed', error, { modelName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to create model'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/models' })
  }

  return (
    <CrudPageLayout
      title="Create Model"
      description="Add a new model to your catalog"
      backUrl="/models"
      backButtonLabel="Back to Models"
    >
      <ModelForm
        isEdit={false}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </CrudPageLayout>
  )
}
