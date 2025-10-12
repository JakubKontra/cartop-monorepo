'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { GenerationForm } from '../components/generation-form'
import { type GenerationFormValues } from '../data/schema'
import {
  GET_CATALOG_MODEL_GENERATION,
  UPDATE_CATALOG_MODEL_GENERATION,
  GET_ALL_CATALOG_MODEL_GENERATIONS,
} from '../generations.graphql'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export function GenerationEditPage() {
  const params = useParams({ from: '/_authenticated/generations/$generationId/' })
  const navigate = useNavigate()

  const { data, loading: loadingGeneration, error } = useQuery(GET_CATALOG_MODEL_GENERATION, {
    variables: { id: params.generationId },
  })

  const [updateGeneration, { loading: updating }] = useMutation(UPDATE_CATALOG_MODEL_GENERATION, {
    refetchQueries: [
      { query: GET_ALL_CATALOG_MODEL_GENERATIONS, variables: { limit: 1000, offset: 0 } },
      { query: GET_CATALOG_MODEL_GENERATION, variables: { id: params.generationId } },
    ],
    onCompleted: () => {
      toast.success('Generation updated successfully')
      navigate({ to: '/generations' })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = async (values: GenerationFormValues) => {
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
          id: params.generationId,
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
  }

  const handleCancel = () => {
    navigate({ to: '/generations' })
  }

  if (loadingGeneration) {
    return (
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <Skeleton className='h-20 w-full' />
        <Skeleton className='h-[600px] w-full' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load generation: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const generation = data?.catalogModelGeneration

  if (!generation) {
    return (
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <Alert>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>Generation not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  // Format date strings for input[type="date"]
  const formatDateForInput = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    return dateString.split('T')[0]
  }

  const defaultValues: Partial<GenerationFormValues> = {
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
  }

  return (
    <div className='flex h-full flex-1 flex-col gap-4 p-4'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Edit Generation</h1>
        <p className='text-muted-foreground'>
          Update the generation information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generation Details</CardTitle>
          <CardDescription>
            Update the information below to modify the generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GenerationForm
            defaultValues={defaultValues}
            isEdit={true}
            loading={updating}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  )
}
