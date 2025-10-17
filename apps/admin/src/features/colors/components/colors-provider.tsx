'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { Color } from './colors-columns'

interface ColorsContextType {
  deleteDialogOpen: boolean
  setDeleteDialogOpen: (open: boolean) => void
  multiDeleteDialogOpen: boolean
  setMultiDeleteDialogOpen: (open: boolean) => void
  selectedColor: Color | null
  setSelectedColor: (color: Color | null) => void
  selectedColors: Color[]
  setSelectedColors: (colors: Color[]) => void
}

const ColorsContext = createContext<ColorsContextType | undefined>(undefined)

export function ColorsProvider({ children }: { children: ReactNode }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [multiDeleteDialogOpen, setMultiDeleteDialogOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [selectedColors, setSelectedColors] = useState<Color[]>([])

  return (
    <ColorsContext.Provider
      value={{
        deleteDialogOpen,
        setDeleteDialogOpen,
        multiDeleteDialogOpen,
        setMultiDeleteDialogOpen,
        selectedColor,
        setSelectedColor,
        selectedColors,
        setSelectedColors,
      }}
    >
      {children}
    </ColorsContext.Provider>
  )
}

export function useColors() {
  const context = useContext(ColorsContext)
  if (context === undefined) {
    throw new Error('useColors must be used within a ColorsProvider')
  }
  return context
}
