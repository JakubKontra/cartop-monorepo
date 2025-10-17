'use client'

import { EnginesProvider } from './components/engines-provider'
import { EnginesTable } from './components/engines-table'
import { EnginesDialogs } from './components/engines-dialogs'
import { EnginesPrimaryButtons } from './components/engines-primary-buttons'

export default function EnginesPage() {
  return (
    <EnginesProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Engines</h1>
            <p className='text-muted-foreground'>
              Manage catalog engines and their specifications
            </p>
          </div>
          <EnginesPrimaryButtons />
        </div>
        <EnginesTable />
        <EnginesDialogs />
      </div>
    </EnginesProvider>
  )
}

export { EngineCreatePage } from './pages/engine-create-page'
export { EngineEditPage } from './pages/engine-edit-page'
export { EngineForm } from './components/engine-form'
export { EnginesProvider, useEngines } from './components/engines-provider'
