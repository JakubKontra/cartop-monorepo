import { createFileRoute } from '@tanstack/react-router'
import { OfferOperationalLeasingCreatePage } from '@/features/offers/pages/offer-operational-leasing-create-page'

export const Route = createFileRoute(
  '/_authenticated/offers/new/operational-leasing'
)({
  component: OfferOperationalLeasingCreatePage,
})
