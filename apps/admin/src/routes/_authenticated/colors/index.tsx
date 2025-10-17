import { createFileRoute } from '@tanstack/react-router'
import ColorsPage from '@/features/colors'

export const Route = createFileRoute('/_authenticated/colors/')({
  component: ColorsPage,
})
