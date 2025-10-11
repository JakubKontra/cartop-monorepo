'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
            <h1 className='text-3xl font-bold'>Create Model</h1>
            <p className='text-muted-foreground'>
              Add a new model to your catalog
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='flex-1 overflow-y-auto'>
        <div className='mx-auto max-w-3xl'>
          <ModelForm
            isEdit={false}
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  )
}
