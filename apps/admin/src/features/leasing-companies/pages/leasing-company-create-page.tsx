'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { LeasingCompanyForm } from '../components/leasing-company-form'
import { type LeasingCompanyFormValues } from '../data/schema'
import { toCreateInput } from '../data/transformers'
import { CREATE_LEASING_COMPANY, GET_ALL_LEASING_COMPANIES } from '../leasing-companies.graphql'
import { logger } from '@/lib/logger'

export function LeasingCompanyCreatePage() {
  const navigate = useNavigate()

  const [createLeasingCompany, { loading }] = useMutation(CREATE_LEASING_COMPANY, {
    refetchQueries: [{ query: GET_ALL_LEASING_COMPANIES }],
  })

  const handleSubmit = async (values: LeasingCompanyFormValues) => {
    try {
      await createLeasingCompany({
        variables: {
          input: toCreateInput(values),
        },
      })
      toast.success('Leasing company created successfully')
      navigate({ to: '/leasing-companies' })
    } catch (error: unknown) {
      logger.error('Leasing company creation failed', error, { companyName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to create leasing company'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/leasing-companies' })
  }

  return (
    <CrudPageLayout
      title="Create Leasing Company"
      description="Add a new leasing company to your catalog"
      backUrl="/leasing-companies"
      backButtonLabel="Back to Leasing Companies"
    >
      <LeasingCompanyForm
        isEdit={false}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </CrudPageLayout>
  )
}
