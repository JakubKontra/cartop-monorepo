'use client'

import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { CarRequestsProvider } from './components/car-requests-provider'
import { CarRequestsTable } from './components/car-requests-table'
import { CarRequestsKanban } from './components/car-requests-kanban'
import { CarRequestsDialogs } from './components/car-requests-dialogs'
import { CarRequestsPrimaryButtons } from './components/car-requests-primary-buttons'
import { CarRequestsViewToggle, type ViewType } from './components/car-requests-view-toggle'
import { CarRequestsTabs } from './components/car-requests-tabs'
import { CarRequestsQuickFilters } from './components/car-requests-quick-filters'
import { GET_ALL_CAR_REQUESTS } from './car-requests.graphql'
import { useCarRequestsFilters } from './hooks/use-car-requests-filters'
import { Loader2 } from 'lucide-react'

export default function CarRequestsPage() {
  const [activeView, setActiveView] = useState<ViewType>('table')

  // Fetch all car requests
  const { data, loading } = useQuery(GET_ALL_CAR_REQUESTS, {
    variables: { limit: 1000, offset: 0 },
  })

  const carRequests = data?.allCarRequests || []

  // Use the filters hook
  const {
    activeSection,
    activeStateFilter,
    filteredRequests,
    sectionCounts,
    stateCounts,
    setActiveSection,
    setActiveStateFilter,
  } = useCarRequestsFilters({ requests: carRequests })

  if (loading && carRequests.length === 0) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

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
          <div className='flex items-center gap-3'>
            <CarRequestsViewToggle
              activeView={activeView}
              onViewChange={setActiveView}
            />
            <CarRequestsPrimaryButtons />
          </div>
        </div>

        {/* Section Tabs */}
        <CarRequestsTabs
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          counts={sectionCounts}
        />

        {/* Quick State Filters */}
        <CarRequestsQuickFilters
          activeFilter={activeStateFilter}
          onFilterChange={setActiveStateFilter}
          counts={stateCounts}
        />

        {/* View Content */}
        {activeView === 'table' ? <CarRequestsTable /> : <CarRequestsKanban />}

        <CarRequestsDialogs />
      </div>
    </CarRequestsProvider>
  )
}
