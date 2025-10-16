import { createFileRoute } from '@tanstack/react-router'
import { CarRequestDetailPage } from '@/features/car-requests/pages/car-request-detail-page'

export const Route = createFileRoute('/_authenticated/car-requests/$carRequestId/')({
  component: CarRequestDetailPage,
})
