import { createFileRoute } from '@tanstack/react-router'
import CarRequestsPage from '@/features/car-requests'

export const Route = createFileRoute('/_authenticated/car-requests/')({
  component: CarRequestsPage,
})
