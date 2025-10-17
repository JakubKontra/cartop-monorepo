import { createFileRoute } from '@tanstack/react-router'
import { OfferIndividualCreatePage } from '@/features/offers/pages/offer-individual-create-page'

export const Route = createFileRoute('/_authenticated/offers/new/individual')({
  component: OfferIndividualCreatePage,
})
