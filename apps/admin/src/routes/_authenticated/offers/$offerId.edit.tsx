import { createFileRoute } from '@tanstack/react-router'
import { OfferEditPage } from '@/features/offers/pages/offer-edit-page'

export const Route = createFileRoute('/_authenticated/offers/$offerId/edit')({
  component: OfferEditPage,
})
