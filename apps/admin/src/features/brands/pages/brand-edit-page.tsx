'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { BrandForm } from '../components/brand-form'
import { type BrandFormValues } from '../data/schema'
import { toFormValues, toUpdateInput } from '../data/transformers'
import { GET_CATALOG_BRAND, UPDATE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'
import { logger } from '@/lib/logger'

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
          input: toUpdateInput(values),
        },
      })
      toast.success('Brand updated successfully')
      navigate({ to: '/brands' })
    } catch (error: unknown) {
      logger.error('Brand update failed', error, { brandId, brandName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to update brand'
      toast.error(message)
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
          defaultValues={toFormValues(brand)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </CrudPageLayout>
  )
}
