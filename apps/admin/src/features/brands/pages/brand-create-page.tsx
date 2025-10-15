'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { BrandForm } from '../components/brand-form'
import { type BrandFormValues } from '../data/schema'
import { toCreateInput } from '../data/transformers'
import { CREATE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'
import { logger } from '@/lib/logger'

export function BrandCreatePage() {
  const navigate = useNavigate()

  const [createBrand, { loading }] = useMutation(CREATE_CATALOG_BRAND, {
    refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: BrandFormValues) => {
    try {
      await createBrand({
        variables: {
          input: toCreateInput(values),
        },
      })
      toast.success('Brand created successfully')
      navigate({ to: '/brands' })
    } catch (error: unknown) {
      logger.error('Brand creation failed', error, { brandName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to create brand'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/brands' })
  }

  return (
    <CrudPageLayout
      title="Create Brand"
      description="Add a new brand to your catalog"
      backUrl="/brands"
      backButtonLabel="Back to Brands"
    >
      <BrandForm
        isEdit={false}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </CrudPageLayout>
  )
}
