import { createFileRoute } from '@tanstack/react-router'
import { UserEditPage } from '@/features/users/pages/user-edit-page'

export const Route = createFileRoute('/_authenticated/users/$userId/edit')({
  component: UserEditPage,
})
