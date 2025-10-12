import { createFileRoute } from '@tanstack/react-router'
import { LeasingCompanyCreatePage } from '@/features/leasing-companies/pages/leasing-company-create-page'

export const Route = createFileRoute('/_authenticated/leasing-companies/new')({
  component: LeasingCompanyCreatePage,
})
