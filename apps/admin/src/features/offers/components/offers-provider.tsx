'use client'

import React, { createContext, useContext, useState } from 'react'
import { type Offer } from '../data/types'

interface OffersContextValue {
  selectedOffer: Offer | null
  setSelectedOffer: (offer: Offer | null) => void
  deleteDialogOpen: boolean
  setDeleteDialogOpen: (open: boolean) => void
}

const OffersContext = createContext<OffersContextValue | undefined>(undefined)

export function useOffersContext() {
  const context = useContext(OffersContext)
  if (!context) {
    throw new Error('useOffersContext must be used within OffersProvider')
  }
  return context
}

export function OffersProvider({ children }: { children: React.ReactNode }) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <OffersContext.Provider
      value={{
        selectedOffer,
        setSelectedOffer,
        deleteDialogOpen,
        setDeleteDialogOpen,
      }}
    >
      {children}
    </OffersContext.Provider>
  )
}
