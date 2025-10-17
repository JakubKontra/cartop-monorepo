import { createFileRoute } from '@tanstack/react-router'
import OffersPage from '@/features/offers'

export const Route = createFileRoute('/_authenticated/offers/')({
  component: OffersPage,
})
