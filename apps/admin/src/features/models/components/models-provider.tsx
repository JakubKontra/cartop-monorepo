import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Model } from '../types'

type ModelsDialogType = 'add' | 'edit' | 'delete'

type ModelsContextType = {
  open: ModelsDialogType | null
  setOpen: (str: ModelsDialogType | null) => void
  currentRow: Model | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Model | null>>
}

const ModelsContext = React.createContext<ModelsContextType | null>(null)

export function ModelsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ModelsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Model | null>(null)

  return (
    <ModelsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ModelsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModels = () => {
  const modelsContext = React.useContext(ModelsContext)

  if (!modelsContext) {
    throw new Error('useModels has to be used within <ModelsContext>')
  }

  return modelsContext
}
