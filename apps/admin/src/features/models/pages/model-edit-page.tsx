'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ModelForm } from '../components/model-form'
import { type ModelFormValues } from '../data/schema'
import { GET_CATALOG_MODEL, UPDATE_CATALOG_MODEL, GET_ALL_CATALOG_MODELS } from '../models.graphql'

export function ModelEditPage() {
  const navigate = useNavigate()
  const { modelId } = useParams({ from: '/_authenticated/models/$modelId/edit' })

  const { data, loading: loadingModel, error } = useQuery(GET_CATALOG_MODEL, {
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
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || null,
            brandId: values.brandId,
            isActive: values.isActive,
            isHighlighted: values.isHighlighted,
            isRecommended: values.isRecommended,
          },
        },
      })
      toast.success('Model updated successfully')
      navigate({ to: '/models' })
    } catch (error: any) {
      console.error('Model update error:', error)
      toast.error(error.message || 'Failed to update model')
    }
  }

  const handleCancel = () => {
    navigate({ to: '/models' })
  }

  // Loading state
  if (loadingModel) {
    return (
      <div className='flex h-full flex-1 items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>Loading model...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !data?.catalogModel) {
    return (
      <div className='flex h-full flex-1 flex-col gap-6 p-6'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleCancel}
          >
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <h1 className='text-3xl font-bold'>Edit Model</h1>
        </div>
        <Alert variant='destructive'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'Model not found'}
          </AlertDescription>
        </Alert>
        <Button onClick={handleCancel} className='w-fit'>
          Back to Models
        </Button>
      </div>
    )
  }

  const model = data.catalogModel

  return (
    <div className='flex h-full flex-1 flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleCancel}
          >
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <div>
            <h1 className='text-3xl font-bold'>Edit Model</h1>
            <p className='text-muted-foreground'>
              Update {model.name} information
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='flex-1 overflow-y-auto'>
        <div className='mx-auto max-w-3xl'>
          <ModelForm
            isEdit={true}
            loading={updating}
            defaultValues={{
              name: model.name,
              slug: model.slug,
              description: model.description || '',
              brandId: model.brandId,
              isActive: model.isActive,
              isHighlighted: model.isHighlighted,
              isRecommended: model.isRecommended,
              legacySystemId: model.legacySystemId || '',
              legacySlug: model.legacySlug || '',
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  )
}
