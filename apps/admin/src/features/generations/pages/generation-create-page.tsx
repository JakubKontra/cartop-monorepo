'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { GenerationForm } from '../components/generation-form'
import { type GenerationFormValues } from '../data/schema'
import { CREATE_CATALOG_MODEL_GENERATION, GET_ALL_CATALOG_MODEL_GENERATIONS } from '../generations.graphql'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'

export function GenerationCreatePage() {
  const navigate = useNavigate()

  const [createGeneration, { loading }] = useMutation(CREATE_CATALOG_MODEL_GENERATION, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODEL_GENERATIONS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: GenerationFormValues) => {
    try {
      // Convert date strings to ISO format for GraphQL DateTime scalar
      const formatDateForGraphQL = (dateString: string | undefined) => {
        if (!dateString) return undefined
        // Convert YYYY-MM-DD to ISO format (YYYY-MM-DDT00:00:00.000Z)
        return new Date(dateString + 'T00:00:00.000Z').toISOString()
      }

      await createGeneration({
        variables: {
          input: {
            name: values.name,
            slug: values.slug || undefined,
            legacySlug: values.legacySlug || undefined,
            modelId: values.modelId,
            brandId: values.brandId || undefined,
            description: values.description || undefined,
            productionStart: formatDateForGraphQL(values.productionStart),
            productionStop: formatDateForGraphQL(values.productionStop),
            wheelbase: values.wheelbase || undefined,
            frontTrack: values.frontTrack || undefined,
            rearTrack: values.rearTrack || undefined,
            length: values.length || undefined,
            width: values.width || undefined,
            height: values.height || undefined,
            trunkSpaceMin: values.trunkSpaceMin || undefined,
            trunkSpaceMax: values.trunkSpaceMax || undefined,
            bodyType: values.bodyType || undefined,
            frontBrakesType: values.frontBrakesType || undefined,
            rearBrakesType: values.rearBrakesType || undefined,
            isActive: values.isActive,
            legacySystemId: values.legacySystemId || undefined,
          },
        },
      })
      toast.success('Generation created successfully')
      navigate({ to: '/generations' })
    } catch (error: unknown) {
      logger.error('Generation creation failed', error, { generationName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to create generation'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/generations' })
  }

  return (
    <CrudPageLayout
      title="Create Generation"
      description="Add a new model generation to the catalog"
      backUrl="/generations"
      backButtonLabel="Back to Generations"
    >
      <GenerationForm
        isEdit={false}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </CrudPageLayout>
  )
}
