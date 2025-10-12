'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { BrandForm } from '../components/brand-form'
import { type BrandFormValues } from '../data/schema'
import { GET_CATALOG_BRAND, UPDATE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'

export function BrandEditPage() {
  const navigate = useNavigate()
  const { brandId } = useParams({ from: '/_authenticated/brands/$brandId/edit' })

  const { data, loading, error } = useQuery(GET_CATALOG_BRAND, {
    variables: { id: brandId },
  })

  const [updateBrand, { loading: updating }] = useMutation(UPDATE_CATALOG_BRAND, {
    refetchQueries: [
      { query: GET_ALL_CATALOG_BRANDS, variables: { limit: 1000, offset: 0 } },
      { query: GET_CATALOG_BRAND, variables: { id: brandId } }
    ],
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
            logoId: values.logoId || null,
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

  const brand = data?.catalogBrand

  return (
    <CrudPageLayout
      title="Edit Brand"
      description={brand ? `Update ${brand.name} information` : undefined}
      backUrl="/brands"
      loading={loading}
      loadingMessage="Loading brand..."
      error={error || (!brand ? new Error('Brand not found') : null)}
      errorMessage={error?.message || 'Brand not found'}
      backButtonLabel="Back to Brands"
    >
      {brand && (
        <BrandForm
          isEdit={true}
          loading={updating}
          logoUrl={brand.logo?.url}
          defaultValues={{
            name: brand.name,
            slug: brand.slug,
            description: brand.description || '',
            logoId: brand.logoId || '',
            isActive: brand.isActive,
            isHighlighted: brand.isHighlighted,
            isRecommended: brand.isRecommended,
            legacySystemId: brand.legacySystemId || '',
            legacySlug: brand.legacySlug || '',
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </CrudPageLayout>
  )
}
