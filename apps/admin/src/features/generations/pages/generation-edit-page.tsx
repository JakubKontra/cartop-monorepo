'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { GenerationForm } from '../components/generation-form'
import { type GenerationFormValues } from '../data/schema'
import {
  GET_CATALOG_MODEL_GENERATION,
  UPDATE_CATALOG_MODEL_GENERATION,
  GET_ALL_CATALOG_MODEL_GENERATIONS,
} from '../generations.graphql'
import { toast } from 'sonner'

export function GenerationEditPage() {
  const params = useParams({ from: '/_authenticated/generations/$generationId/' })
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(GET_CATALOG_MODEL_GENERATION, {
    variables: { id: params.generationId },
  })

  const [updateGeneration, { loading: updating }] = useMutation(UPDATE_CATALOG_MODEL_GENERATION, {
    refetchQueries: [
      { query: GET_ALL_CATALOG_MODEL_GENERATIONS, variables: { limit: 1000, offset: 0 } },
      { query: GET_CATALOG_MODEL_GENERATION, variables: { id: params.generationId } },
    ],
  })

  const handleSubmit = async (values: GenerationFormValues) => {
    try {
      // Convert date strings to ISO format for GraphQL DateTime scalar
      const formatDateForGraphQL = (dateString: string | undefined) => {
        if (!dateString) return undefined
        // Convert YYYY-MM-DD to ISO format (YYYY-MM-DDT00:00:00.000Z)
        return new Date(dateString + 'T00:00:00.000Z').toISOString()
      }

      await updateGeneration({
        variables: {
          id: params.generationId,
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
          },
        },
      })
      toast.success('Generation updated successfully')
      navigate({ to: '/generations' })
    } catch (error: any) {
      console.error('Generation update error:', error)
      toast.error(error.message || 'Failed to update generation')
    }
  }

  const handleCancel = () => {
    navigate({ to: '/generations' })
  }

  const generation = data?.catalogModelGeneration

  // Format date strings for input[type="date"]
  const formatDateForInput = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    return dateString.split('T')[0]
  }

  return (
    <CrudPageLayout
      title="Edit Generation"
      description={generation ? `Update ${generation.name} information` : undefined}
      backUrl="/generations"
      loading={loading}
      loadingMessage="Loading generation..."
      error={error || (!generation ? new Error('Generation not found') : null)}
      errorMessage={error?.message || 'Generation not found'}
      backButtonLabel="Back to Generations"
    >
      {generation && (
        <GenerationForm
          defaultValues={{
            name: generation.name,
            slug: generation.slug || '',
            legacySlug: generation.legacySlug,
            modelId: generation.modelId,
            brandId: generation.brandId || '',
            description: generation.description || '',
            productionStart: formatDateForInput(generation.productionStart),
            productionStop: formatDateForInput(generation.productionStop),
            wheelbase: generation.wheelbase || undefined,
            frontTrack: generation.frontTrack || undefined,
            rearTrack: generation.rearTrack || undefined,
            length: generation.length || undefined,
            width: generation.width || undefined,
            height: generation.height || undefined,
            trunkSpaceMin: generation.trunkSpaceMin || undefined,
            trunkSpaceMax: generation.trunkSpaceMax || undefined,
            bodyType: generation.bodyType || null,
            frontBrakesType: generation.frontBrakesType || null,
            rearBrakesType: generation.rearBrakesType || null,
            isActive: generation.isActive,
          }}
          isEdit={true}
          loading={updating}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </CrudPageLayout>
  )
}
