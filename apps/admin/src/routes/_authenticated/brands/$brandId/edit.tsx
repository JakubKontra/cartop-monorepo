import { createFileRoute } from '@tanstack/react-router'
import { BrandEditPage } from '@/features/brands/pages/brand-edit-page'

export const Route = createFileRoute('/_authenticated/brands/$brandId/edit')({
  component: BrandEditPage,
})
