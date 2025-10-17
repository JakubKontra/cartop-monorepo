import { createFileRoute } from '@tanstack/react-router'
import { OfferDirectPurchaseCreatePage } from '@/features/offers/pages/offer-direct-purchase-create-page'

export const Route = createFileRoute(
  '/_authenticated/offers/new/direct-purchase'
)({
  component: OfferDirectPurchaseCreatePage,
})
