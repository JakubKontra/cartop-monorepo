import { createFileRoute } from '@tanstack/react-router'
import { CarRequestCreatePage } from '@/features/car-requests/pages/car-request-create-page'

export const Route = createFileRoute('/_authenticated/car-requests/new')({
  component: CarRequestCreatePage,
})
