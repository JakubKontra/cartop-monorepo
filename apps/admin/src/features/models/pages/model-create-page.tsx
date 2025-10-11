'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { ModelForm } from '../components/model-form'
import { type ModelFormValues } from '../data/schema'
import { CREATE_CATALOG_MODEL, GET_ALL_CATALOG_MODELS } from '../models.graphql'

export function ModelCreatePage() {
  const navigate = useNavigate()

  const [createModel, { loading }] = useMutation(CREATE_CATALOG_MODEL, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODELS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: ModelFormValues) => {
    try {
      await createModel({
        variables: {
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || null,
            brandId: values.brandId,
            isActive: values.isActive,
            isHighlighted: values.isHighlighted,
            isRecommended: values.isRecommended,
            legacySystemId: values.legacySystemId || null,
            legacySlug: values.legacySlug || null,
          },
        },
      })
      toast.success('Model created successfully')
      navigate({ to: '/models' })
    } catch (error: any) {
      console.error('Model creation error:', error)
      toast.error(error.message || 'Failed to create model')
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
