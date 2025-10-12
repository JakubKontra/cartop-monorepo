'use client'

import { GenerationsProvider } from './components/generations-provider'
import { GenerationsTable } from './components/generations-table'
import { GenerationsDialogs } from './components/generations-dialogs'
import { GenerationsPrimaryButtons } from './components/generations-primary-buttons'

export default function GenerationsPage() {
  return (
    <GenerationsProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Model Generations</h1>
            <p className='text-muted-foreground'>
              Manage vehicle model generations and their specifications
            </p>
          </div>
          <GenerationsPrimaryButtons />
        </div>
        <GenerationsTable />
        <GenerationsDialogs />
      </div>
    </GenerationsProvider>
  )
}
