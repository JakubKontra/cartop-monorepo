'use client'

import { ColorsDeleteDialog } from './colors-delete-dialog'
import { ColorsMultiDeleteDialog } from './colors-multi-delete-dialog'

export function ColorsDialogs() {
  return (
    <>
      <ColorsDeleteDialog />
      <ColorsMultiDeleteDialog />
    </>
  )
}
