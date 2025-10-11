import { createFileRoute } from '@tanstack/react-router'
import { UserAddPage } from '@/features/users/pages/user-add-page'

export const Route = createFileRoute('/_authenticated/users/add')({
  component: UserAddPage,
})
