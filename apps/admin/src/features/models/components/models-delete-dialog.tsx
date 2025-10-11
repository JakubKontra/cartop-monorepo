'use client'

import { GenericDeleteDialog } from '@/components/generic-delete-dialog'
import { type Model } from '../types'
import { DELETE_CATALOG_MODEL, GET_ALL_CATALOG_MODELS } from '../models.graphql'

type ModelDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Model
}

export function ModelsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ModelDeleteDialogProps) {
  return (
    <GenericDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      entityType="model"
      entity={currentRow}
      confirmField="name"
      mutation={DELETE_CATALOG_MODEL}
      mutationOptions={{
        refetchQueries: [{ query: GET_ALL_CATALOG_MODELS, variables: { limit: 1000, offset: 0 } }],
      }}
    />
  )
}
