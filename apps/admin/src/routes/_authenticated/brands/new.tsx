import { createFileRoute } from '@tanstack/react-router'
import { BrandCreatePage } from '@/features/brands/pages/brand-create-page'

export const Route = createFileRoute('/_authenticated/brands/new')({
  component: BrandCreatePage,
})
