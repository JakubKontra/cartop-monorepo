'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { LeasingCompanyForm } from '../components/leasing-company-form'
import { type LeasingCompanyFormValues } from '../data/schema'
import { toFormValues, toUpdateInput } from '../data/transformers'
import { GET_LEASING_COMPANY, UPDATE_LEASING_COMPANY, GET_ALL_LEASING_COMPANIES } from '../leasing-companies.graphql'
import { logger } from '@/lib/logger'

export function LeasingCompanyEditPage() {
  const navigate = useNavigate()
  const { companyId } = useParams({ from: '/_authenticated/leasing-companies/$companyId/edit' })

  const { data, loading, error } = useQuery(GET_LEASING_COMPANY, {
    variables: { id: companyId },
  })

  const [updateLeasingCompany, { loading: updating }] = useMutation(UPDATE_LEASING_COMPANY, {
    refetchQueries: [
      { query: GET_ALL_LEASING_COMPANIES },
      { query: GET_LEASING_COMPANY, variables: { id: companyId } }
    ],
  })

  const handleSubmit = async (values: LeasingCompanyFormValues) => {
    try {
      await updateLeasingCompany({
        variables: {
          id: companyId,
          input: toUpdateInput(values),
        },
      })
      toast.success('Leasing company updated successfully')
      navigate({ to: '/leasing-companies' })
    } catch (error: unknown) {
      logger.error('Leasing company update failed', error, { companyId, companyName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to update leasing company'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/leasing-companies' })
  }

  const leasingCompany = data?.leasingCompany

  return (
    <CrudPageLayout
      title="Edit Leasing Company"
      description={leasingCompany ? `Update ${leasingCompany.name} information` : undefined}
      backUrl="/leasing-companies"
      loading={loading}
      loadingMessage="Loading leasing company..."
      error={error || (!leasingCompany ? new Error('Leasing company not found') : null)}
      errorMessage={error?.message || 'Leasing company not found'}
      backButtonLabel="Back to Leasing Companies"
    >
      {leasingCompany && (
        <LeasingCompanyForm
          isEdit={true}
          loading={updating}
          logoUrl={leasingCompany.logo?.url}
          defaultValues={toFormValues(leasingCompany)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </CrudPageLayout>
  )
}
