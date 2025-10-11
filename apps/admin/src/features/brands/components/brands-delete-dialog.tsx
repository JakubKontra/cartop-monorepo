'use client'

import { GenericDeleteDialog } from '@/components/generic-delete-dialog'
import { type Brand } from '../types'
import { DELETE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'

type BrandDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Brand
}

export function BrandsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: BrandDeleteDialogProps) {
  return (
    <GenericDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      entityType="brand"
      entity={currentRow}
      confirmField="name"
      mutation={DELETE_CATALOG_BRAND}
      mutationOptions={{
        refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS, variables: { limit: 1000, offset: 0 } }],
      }}
    />
  )
}
