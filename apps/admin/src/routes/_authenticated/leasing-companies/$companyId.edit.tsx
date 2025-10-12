import { createFileRoute } from '@tanstack/react-router'
import { LeasingCompanyEditPage } from '@/features/leasing-companies/pages/leasing-company-edit-page'

export const Route = createFileRoute('/_authenticated/leasing-companies/$companyId/edit')({
  component: LeasingCompanyEditPage,
})
