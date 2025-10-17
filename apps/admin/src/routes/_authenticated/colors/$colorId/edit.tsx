import { createFileRoute } from '@tanstack/react-router'
import { ColorFormPage } from '@/features/colors/pages/color-form-page'

export const Route = createFileRoute('/_authenticated/colors/$colorId/edit')({
  component: () => {
    const { colorId } = Route.useParams()
    return <ColorFormPage colorId={colorId} isEdit />
  },
})
