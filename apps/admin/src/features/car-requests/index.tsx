'use client'

import { CarRequestsProvider } from './components/car-requests-provider'
import { CarRequestsTable } from './components/car-requests-table'
import { CarRequestsDialogs } from './components/car-requests-dialogs'
import { CarRequestsPrimaryButtons } from './components/car-requests-primary-buttons'

export default function CarRequestsPage() {
  return (
    <CarRequestsProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Car Requests</h1>
            <p className='text-muted-foreground'>
              Manage customer car purchase and leasing requests
            </p>
          </div>
          <CarRequestsPrimaryButtons />
        </div>
        <CarRequestsTable />
        <CarRequestsDialogs />
      </div>
    </CarRequestsProvider>
  )
}
