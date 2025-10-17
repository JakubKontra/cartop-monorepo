import { createFileRoute } from '@tanstack/react-router'
import EnginesPage from '@/features/engines'

export const Route = createFileRoute('/_authenticated/engines/')({
  component: EnginesPage,
})
