import { createFileRoute } from '@tanstack/react-router'
import OnboardingDetailPage from '@/features/onboardings/pages/onboarding-detail-page'

export const Route = createFileRoute('/_authenticated/onboardings/$onboardingId/')({
  component: OnboardingDetailPage,
})
