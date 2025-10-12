'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { LeasingCompanyForm } from '../components/leasing-company-form'
import { type LeasingCompanyFormValues } from '../data/schema'
import { CREATE_LEASING_COMPANY, GET_ALL_LEASING_COMPANIES } from '../leasing-companies.graphql'

export function LeasingCompanyCreatePage() {
  const navigate = useNavigate()

  const [createLeasingCompany, { loading }] = useMutation(CREATE_LEASING_COMPANY, {
    refetchQueries: [{ query: GET_ALL_LEASING_COMPANIES }],
  })

  const handleSubmit = async (values: LeasingCompanyFormValues) => {
    try {
      await createLeasingCompany({
        variables: {
          input: {
            name: values.name,
            link: values.link || null,
            logoId: values.logoId || null,
          },
        },
      })
      toast.success('Leasing company created successfully')
      navigate({ to: '/leasing-companies' })
    } catch (error: any) {
      console.error('Leasing company creation error:', error)
      toast.error(error.message || 'Failed to create leasing company')
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
