import { createFileRoute } from '@tanstack/react-router'
import { ColorFormPage } from '@/features/colors/pages/color-form-page'

export const Route = createFileRoute('/_authenticated/colors/new')({
  component: () => <ColorFormPage />,
})
