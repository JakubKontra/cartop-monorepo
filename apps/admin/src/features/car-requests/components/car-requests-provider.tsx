import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type CarRequest } from '../types'

type CarRequestsDialogType = 'add' | 'edit' | 'delete'

type CarRequestsContextType = {
  open: CarRequestsDialogType | null
  setOpen: (str: CarRequestsDialogType | null) => void
  currentRow: CarRequest | null
  setCurrentRow: React.Dispatch<React.SetStateAction<CarRequest | null>>
}

const CarRequestsContext = React.createContext<CarRequestsContextType | null>(null)

export function CarRequestsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<CarRequestsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<CarRequest | null>(null)

  return (
    <CarRequestsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CarRequestsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCarRequests = () => {
  const carRequestsContext = React.useContext(CarRequestsContext)

  if (!carRequestsContext) {
    throw new Error('useCarRequests has to be used within <CarRequestsContext>')
  }

  return carRequestsContext
}
