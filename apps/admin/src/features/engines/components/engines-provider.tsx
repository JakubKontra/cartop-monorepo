'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface EnginesContextValue {
  engineToDelete: string | null
  setEngineToDelete: (id: string | null) => void
  enginesToDelete: string[] | null
  setEnginesToDelete: (ids: string[] | null) => void
}

const EnginesContext = createContext<EnginesContextValue | undefined>(undefined)

export function EnginesProvider({ children }: { children: ReactNode }) {
  const [engineToDelete, setEngineToDelete] = useState<string | null>(null)
  const [enginesToDelete, setEnginesToDelete] = useState<string[] | null>(null)

  return (
    <EnginesContext.Provider
      value={{
        engineToDelete,
        setEngineToDelete,
        enginesToDelete,
        setEnginesToDelete,
      }}
    >
      {children}
    </EnginesContext.Provider>
  )
}

export function useEngines() {
  const context = useContext(EnginesContext)
  if (!context) {
    throw new Error('useEngines must be used within EnginesProvider')
  }
  return context
}
