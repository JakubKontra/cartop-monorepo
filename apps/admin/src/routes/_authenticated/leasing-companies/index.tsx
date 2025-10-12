import { createFileRoute } from '@tanstack/react-router'
import LeasingCompaniesPage from '@/features/leasing-companies'

export const Route = createFileRoute('/_authenticated/leasing-companies/')({
  component: LeasingCompaniesPage,
})
