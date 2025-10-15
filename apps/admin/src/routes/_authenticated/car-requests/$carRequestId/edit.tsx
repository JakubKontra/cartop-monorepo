import { createFileRoute } from '@tanstack/react-router'
import { CarRequestEditPage } from '@/features/car-requests/pages/car-request-edit-page'

export const Route = createFileRoute('/_authenticated/car-requests/$carRequestId/edit')({
  component: CarRequestEditPage,
})
