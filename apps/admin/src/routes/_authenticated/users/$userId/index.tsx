import { createFileRoute } from '@tanstack/react-router'
import { UserDetailPage } from '@/features/users/pages/user-detail-page'

export const Route = createFileRoute('/_authenticated/users/$userId/')({
  component: UserDetailPage,
})
