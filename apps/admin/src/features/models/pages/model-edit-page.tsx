'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { ModelForm } from '../components/model-form'
import { type ModelFormValues } from '../data/schema'
import { toFormValues, toUpdateInput } from '../data/transformers'
import { GET_CATALOG_MODEL, UPDATE_CATALOG_MODEL, GET_ALL_CATALOG_MODELS } from '../models.graphql'
import { logger } from '@/lib/logger'

export function ModelEditPage() {
  const navigate = useNavigate()
  const { modelId } = useParams({ from: '/_authenticated/models/$modelId/edit' })

  const { data, loading, error } = useQuery(GET_CATALOG_MODEL, {
    variables: { id: modelId },
  })

  const [updateModel, { loading: updating }] = useMutation(UPDATE_CATALOG_MODEL, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODELS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: ModelFormValues) => {
    try {
      await updateModel({
        variables: {
          id: modelId,
          input: toUpdateInput(values),
        },
      })
      toast.success('Model updated successfully')
      navigate({ to: '/models' })
    } catch (error: unknown) {
      logger.error('Model update failed', error, { modelId, modelName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to update model'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/models' })
  }

  const model = data?.catalogModel

  return (
    <CrudPageLayout
      title="Edit Model"
      description={model ? `Update ${model.name} information` : undefined}
      backUrl="/models"
      loading={loading}
      loadingMessage="Loading model..."
      error={error || (!model ? new Error('Model not found') : null)}
      errorMessage={error?.message || 'Model not found'}
      backButtonLabel="Back to Models"
    >
      {model && (
        <ModelForm
          isEdit={true}
          loading={updating}
          defaultValues={toFormValues(model)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </CrudPageLayout>
  )
}
