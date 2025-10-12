import { createFileRoute } from '@tanstack/react-router'
import GenerationsPage from '@/features/generations'

export const Route = createFileRoute('/_authenticated/generations/')({
  component: GenerationsPage,
})
