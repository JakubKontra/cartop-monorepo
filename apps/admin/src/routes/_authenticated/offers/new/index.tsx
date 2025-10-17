import { createFileRoute } from '@tanstack/react-router'
import { OfferCreatePage } from '@/features/offers/pages/offer-create-page'

export const Route = createFileRoute('/_authenticated/offers/new/')({
  component: OfferCreatePage,
})
