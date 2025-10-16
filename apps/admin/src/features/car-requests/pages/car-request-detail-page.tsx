'use client'

import { useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useQuery } from '@apollo/client/react'
import { ArrowLeft, Loader2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GET_CAR_REQUEST } from '../car-requests.graphql'
import { CarRequestActivitySidebar } from '../components/car-request-activity-sidebar'
import { CarRequestCustomerInfoBar } from '../components/car-request-customer-info-bar'
import { CalculationList, CreateCalculationDialog, CalculationDetail } from '@/features/calculations'

export function CarRequestDetailPage() {
  const navigate = useNavigate()
  const { carRequestId } = useParams({
    from: '/_authenticated/car-requests/$carRequestId/',
  })

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedCalculationId, setSelectedCalculationId] = useState<string | null>(null)

  const { data, loading, error, refetch } = useQuery(GET_CAR_REQUEST, {
    variables: { id: carRequestId },
  })

  const carRequest = data?.carRequest

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
          <p className='text-muted-foreground text-sm'>
            Loading car request...
          </p>
        </div>
      </div>
    )
  }

  if (error || !carRequest) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='flex max-w-md flex-col items-center gap-4 text-center'>
          <div className='bg-destructive/10 rounded-full p-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='text-destructive h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
          <div>
            <h2 className='text-lg font-semibold'>Error Loading Car Request</h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              {error?.message || 'Car request not found'}
            </p>
          </div>
          <Button onClick={() => navigate({ to: '/car-requests' })}>
            <ArrowLeft className='h-4 w-4' />
            Back to Car Requests
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-full'>
      {/* Main Content Area */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Header */}
        <div className='bg-background border-b p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => navigate({ to: '/car-requests' })}
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <div>
                <h1 className='text-2xl font-semibold'>Car Request Detail</h1>
                <p className='text-muted-foreground mt-1 text-sm'>
                  {carRequest.brand?.name} {carRequest.model?.name}
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate({
                to: '/car-requests/$carRequestId/edit',
                params: { carRequestId }
              })}
            >
              <Pencil className='h-4 w-4 mr-2' />
              Edit
            </Button>
          </div>
        </div>

        {/* Content with Tabs */}
        <div className='flex-1 overflow-auto'>
          <div className='space-y-0'>
            <div className='px-6 pt-6 pb-6'>
              <CarRequestCustomerInfoBar
                carRequestId={carRequestId}
                carRequest={carRequest}
              />

              <Tabs defaultValue='overview' className='mt-6'>
                <TabsList>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='calculations'>Kalkulace</TabsTrigger>
                </TabsList>

                <TabsContent value='overview' className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Car request details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <dl className='grid grid-cols-2 gap-4'>
                        <div>
                          <dt className='text-sm font-medium text-muted-foreground'>Brand</dt>
                          <dd className='text-sm'>{carRequest.brand?.name || '-'}</dd>
                        </div>
                        <div>
                          <dt className='text-sm font-medium text-muted-foreground'>Model</dt>
                          <dd className='text-sm'>{carRequest.model?.name || '-'}</dd>
                        </div>
                        <div>
                          <dt className='text-sm font-medium text-muted-foreground'>Financing Type</dt>
                          <dd className='text-sm'>{carRequest.financingType}</dd>
                        </div>
                        <div>
                          <dt className='text-sm font-medium text-muted-foreground'>Leasing Company</dt>
                          <dd className='text-sm'>{carRequest.leasingCompany?.name || '-'}</dd>
                        </div>
                        {carRequest.notes && (
                          <div className='col-span-2'>
                            <dt className='text-sm font-medium text-muted-foreground'>Notes</dt>
                            <dd className='text-sm'>{carRequest.notes}</dd>
                          </div>
                        )}
                      </dl>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value='calculations' className='space-y-4'>
                  {selectedCalculationId ? (
                    <div className='space-y-4'>
                      <Button
                        variant='outline'
                        onClick={() => setSelectedCalculationId(null)}
                      >
                        <ArrowLeft className='h-4 w-4 mr-2' />
                        Zpět na seznam
                      </Button>
                      <CalculationDetail calculationId={selectedCalculationId} />
                    </div>
                  ) : (
                    <CalculationList
                      carRequestId={carRequestId}
                      onCreateClick={() => setCreateDialogOpen(true)}
                      onViewClick={(id) => setSelectedCalculationId(id)}
                    />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Sidebar */}
      <CarRequestActivitySidebar
        carRequestId={carRequestId}
        carRequest={carRequest}
      />

      {/* Create Calculation Dialog */}
      <CreateCalculationDialog
        carRequestId={carRequestId}
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={() => {
          refetch()
          setCreateDialogOpen(false)
        }}
      />
    </div>
  )
}
