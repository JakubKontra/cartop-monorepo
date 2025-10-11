'use client'

import { ModelsProvider } from './components/models-provider'
import { ModelsTable } from './components/models-table'
import { ModelsDialogs } from './components/models-dialogs'
import { ModelsPrimaryButtons } from './components/models-primary-buttons'

export default function ModelsPage() {
  return (
    <ModelsProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Models</h1>
            <p className='text-muted-foreground'>
              Manage vehicle models across different brands
            </p>
          </div>
          <ModelsPrimaryButtons />
        </div>
        <ModelsTable />
        <ModelsDialogs />
      </div>
    </ModelsProvider>
  )
}
