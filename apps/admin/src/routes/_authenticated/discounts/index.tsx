import { createFileRoute } from '@tanstack/react-router'
import DiscountsPage from '@/features/discounts'

export const Route = createFileRoute('/_authenticated/discounts/')({
  component: DiscountsPage,
})
