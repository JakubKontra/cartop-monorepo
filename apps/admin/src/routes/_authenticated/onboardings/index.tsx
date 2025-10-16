import { createFileRoute } from '@tanstack/react-router'
import OnboardingsListPage from '@/features/onboardings/pages/onboardings-list-page'

export const Route = createFileRoute('/_authenticated/onboardings/')({
  component: OnboardingsListPage,
})
