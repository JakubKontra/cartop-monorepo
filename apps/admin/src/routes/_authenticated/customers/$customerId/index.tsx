import { createFileRoute } from '@tanstack/react-router'
import { CustomerDetailPage } from '@/features/customers/pages/customer-detail-page'

export const Route = createFileRoute('/_authenticated/customers/$customerId/')({
  component: CustomerDetailPageWrapper,
})

function CustomerDetailPageWrapper() {
  const { customerId } = Route.useParams()
  return <CustomerDetailPage customerId={customerId} />
}
