'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BrandForm } from '../components/brand-form'
import { type BrandFormValues } from '../data/schema'
import { GET_CATALOG_BRAND, UPDATE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'

export function BrandEditPage() {
  const navigate = useNavigate()
  const { brandId } = useParams({ from: '/_authenticated/brands/$brandId/edit' })

  const { data, loading: loadingBrand, error } = useQuery(GET_CATALOG_BRAND, {
    variables: { id: brandId },
  })

  const [updateBrand, { loading: updating }] = useMutation(UPDATE_CATALOG_BRAND, {
    refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: BrandFormValues) => {
    try {
      await updateBrand({
        variables: {
          id: brandId,
          input: {
            name: values.name,
            slug: values.slug,
            description: values.description || null,
            isActive: values.isActive,
            isHighlighted: values.isHighlighted,
            isRecommended: values.isRecommended,
          },
        },
      })
      toast.success('Brand updated successfully')
      navigate({ to: '/brands' })
    } catch (error: any) {
      console.error('Brand update error:', error)
      toast.error(error.message || 'Failed to update brand')
    }
  }

  const handleCancel = () => {
    navigate({ to: '/brands' })
  }

  // Loading state
  if (loadingBrand) {
    return (
      <div className='flex h-full flex-1 items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>Loading brand...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !data?.catalogBrand) {
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
          <h1 className='text-3xl font-bold'>Edit Brand</h1>
        </div>
        <Alert variant='destructive'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'Brand not found'}
          </AlertDescription>
        </Alert>
        <Button onClick={handleCancel} className='w-fit'>
          Back to Brands
        </Button>
      </div>
    )
  }

  const brand = data.catalogBrand

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
            <h1 className='text-3xl font-bold'>Edit Brand</h1>
            <p className='text-muted-foreground'>
              Update {brand.name} information
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='flex-1 overflow-y-auto'>
        <div className='mx-auto max-w-3xl'>
          <BrandForm
            isEdit={true}
            loading={updating}
            defaultValues={{
              name: brand.name,
              slug: brand.slug,
              description: brand.description || '',
              isActive: brand.isActive,
              isHighlighted: brand.isHighlighted,
              isRecommended: brand.isRecommended,
              legacySystemId: brand.legacySystemId || '',
              legacySlug: brand.legacySlug || '',
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  )
}
