import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Generation } from '../types'

type GenerationsDialogType = 'add' | 'edit' | 'delete'

type GenerationsContextType = {
  open: GenerationsDialogType | null
  setOpen: (str: GenerationsDialogType | null) => void
  currentRow: Generation | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Generation | null>>
}

const GenerationsContext = React.createContext<GenerationsContextType | null>(null)

export function GenerationsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<GenerationsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Generation | null>(null)

  return (
    <GenerationsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </GenerationsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGenerations = () => {
  const generationsContext = React.useContext(GenerationsContext)

  if (!generationsContext) {
    throw new Error('useGenerations has to be used within <GenerationsContext>')
  }

  return generationsContext
}
