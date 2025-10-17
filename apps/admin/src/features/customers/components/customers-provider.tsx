'use client'

import { createContext, useContext, useState } from 'react'

interface CustomersContextType {
  selectedCustomerId: string | null
  setSelectedCustomerId: (id: string | null) => void
  viewDetailsDialogOpen: boolean
  setViewDetailsDialogOpen: (open: boolean) => void
}

const CustomersContext = createContext<CustomersContextType | undefined>(undefined)

export function useCustomersContext() {
  const context = useContext(CustomersContext)
  if (!context) {
    throw new Error('useCustomersContext must be used within CustomersProvider')
  }
  return context
}

export function CustomersProvider({ children }: { children: React.ReactNode }) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false)

  return (
    <CustomersContext.Provider
      value={{
        selectedCustomerId,
        setSelectedCustomerId,
        viewDetailsDialogOpen,
        setViewDetailsDialogOpen,
      }}
    >
      {children}
    </CustomersContext.Provider>
  )
}
