'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandForm } from '../components/brand-form'
import { type BrandFormValues } from '../data/schema'
import { CREATE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'

export function BrandCreatePage() {
  const navigate = useNavigate()

  const [createBrand, { loading }] = useMutation(CREATE_CATALOG_BRAND, {
    refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: BrandFormValues) => {
    try {
      await createBrand({
        variables: {
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || null,
            isActive: values.isActive,
            isHighlighted: values.isHighlighted,
            isRecommended: values.isRecommended,
            legacySystemId: values.legacySystemId || null,
            legacySlug: values.legacySlug || null,
          },
        },
      })
      toast.success('Brand created successfully')
      navigate({ to: '/brands' })
    } catch (error: any) {
      console.error('Brand creation error:', error)
      toast.error(error.message || 'Failed to create brand')
    }
  }

  const handleCancel = () => {
    navigate({ to: '/brands' })
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
            <h1 className='text-3xl font-bold'>Create Brand</h1>
            <p className='text-muted-foreground'>
              Add a new brand to your catalog
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='flex-1 overflow-y-auto'>
        <div className='mx-auto max-w-3xl'>
          <BrandForm
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
