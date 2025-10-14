// Re-export types from transformers for consistent usage
export type { CarRequest, CarRequestListItem } from '../data/transformers'

export interface CarRequestsContextValue {
  open: 'delete' | null
  setOpen: (open: 'delete' | null) => void
  currentRow: import('../data/transformers').CarRequestListItem | null
  setCurrentRow: (row: import('../data/transformers').CarRequestListItem | null) => void
}
