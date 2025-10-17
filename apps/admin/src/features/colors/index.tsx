'use client'

import { ColorsProvider } from './components/colors-provider'
import { ColorsTable } from './components/colors-table'
import { ColorsDialogs } from './components/colors-dialogs'
import { ColorsPrimaryButtons } from './components/colors-primary-buttons'

export default function ColorsPage() {
  return (
    <ColorsProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Colors</h1>
            <p className='text-muted-foreground'>
              Manage catalog colors for vehicle exterior and interior
            </p>
          </div>
          <ColorsPrimaryButtons />
        </div>
        <ColorsTable />
        <ColorsDialogs />
      </div>
    </ColorsProvider>
  )
}
