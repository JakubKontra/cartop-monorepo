'use client'

import { useQuery } from '@apollo/client/react'
import { Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomerDetailHeader } from '../components/detail/customer-detail-header'
import { CustomerStatsCards } from '../components/detail/customer-stats-cards'
import { CustomerOverviewTab } from '../components/detail/tabs/customer-overview-tab'
import { CustomerRequestsTab } from '../components/detail/tabs/customer-requests-tab'
import { CustomerCalculationsTab } from '../components/detail/tabs/customer-calculations-tab'
import { CustomerOnboardingsTab } from '../components/detail/tabs/customer-onboardings-tab'
import { CustomerDocumentsTab } from '../components/detail/tabs/customer-documents-tab'
import { CustomerActivityTab } from '../components/detail/tabs/customer-activity-tab'
import { GET_CUSTOMER_DETAIL, GET_USER_ACTIVITY, GET_ONBOARDINGS_WITH_DOCUMENTS } from '../customer-detail.graphql'
import { GET_ALL_CAR_REQUESTS } from '@/features/car-requests/car-requests.graphql'
import { GET_CALCULATIONS_BY_CAR_REQUEST } from '@/features/calculations/queries'
import { type CustomerStats } from '../data/customer-detail-types'
import { useIsAdmin } from '@/hooks/use-permission'
import { useMemo } from 'react'

interface CustomerDetailPageProps {
  customerId: string
}

export function CustomerDetailPage({ customerId }: CustomerDetailPageProps) {
  const isAdmin = useIsAdmin()
  // Fetch customer detail
  const { data: customerData, loading: customerLoading, error: customerError } = useQuery(
    GET_CUSTOMER_DETAIL,
    { variables: { id: customerId } }
  )

  // Fetch all car requests and filter by customer
  const { data: requestsData, loading: requestsLoading } = useQuery(
    GET_ALL_CAR_REQUESTS,
    { variables: { limit: 1000, offset: 0 } }
  )

  // Fetch all onboardings with full document details
  const { data: onboardingsData, loading: onboardingsLoading } = useQuery(
    GET_ONBOARDINGS_WITH_DOCUMENTS,
    { variables: {} }
  )

  // Fetch user activity
  const { data: activityData, loading: activityLoading } = useQuery(
    GET_USER_ACTIVITY,
    { variables: { userId: customerId, limit: 100 } }
  )

  // Filter car requests for this customer
  const customerRequests = useMemo(() => {
    if (!requestsData?.allCarRequests) return []
    return requestsData.allCarRequests.filter(
      (request) => request.customer?.id === customerId
    )
  }, [requestsData, customerId])

  // Get all calculations for customer's requests
  const customerCalculations = useMemo(() => {
    // Note: We would need to query calculations for each request
    // For now, returning empty array - will be populated when user opens the tab
    return []
  }, [])

  // Filter onboardings for this customer's requests
  const customerOnboardings = useMemo(() => {
    if (!onboardingsData?.allOnboardings || customerRequests.length === 0) return []
    const requestIds = customerRequests.map((r) => r.id)
    return onboardingsData.allOnboardings.filter(
      (onboarding) => requestIds.includes(onboarding.carRequest.id)
    )
  }, [onboardingsData, customerRequests])

  // Get all documents from all onboardings
  const customerDocuments = useMemo(() => {
    return customerOnboardings.flatMap((onboarding) => onboarding.documents || [])
  }, [customerOnboardings])

  // Calculate statistics
  const stats: CustomerStats = useMemo(() => {
    const totalRequests = customerRequests.length
    const activeRequests = customerRequests.filter(
      (r) => !r.status?.isFinal
    ).length
    const completedRequests = customerRequests.filter(
      (r) => r.status?.isFinal
    ).length
    const totalOnboardings = customerOnboardings.length
    const completedOnboardings = customerOnboardings.filter(
      (o) => o.status === 'COMPLETED' || o.completedAt
    ).length
    const onboardingProgress = totalOnboardings > 0
      ? Math.round((completedOnboardings / totalOnboardings) * 100)
      : 0

    return {
      totalRequests,
      activeRequests,
      completedRequests,
      totalOnboardings,
      completedOnboardings,
      onboardingProgress,
    }
  }, [customerRequests, customerOnboardings])

  const customer = customerData?.user
  const activities = activityData?.userActivity || []
  const loading = customerLoading || requestsLoading || onboardingsLoading || activityLoading

  if (customerError) {
    return (
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <Alert variant='destructive'>
          <AlertDescription>
            Chyba při načítání zákazníka: {customerError.message}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (customerLoading) {
    return (
      <div className='flex h-full flex-1 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (!customer) {
    return (
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <Alert variant='destructive'>
          <AlertDescription>Zákazník nenalezen</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className='flex h-full flex-1 flex-col gap-6 p-4'>
      <CustomerDetailHeader customer={customer} />

      {loading ? (
        <div className='flex items-center justify-center py-8'>
          <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
        </div>
      ) : (
        <>
          <CustomerStatsCards stats={stats} />

          <Tabs defaultValue='overview' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='overview'>Přehled</TabsTrigger>
              <TabsTrigger value='requests'>
                Poptávky ({customerRequests.length})
              </TabsTrigger>
              <TabsTrigger value='calculations'>
                Kalkulace ({customerCalculations.length})
              </TabsTrigger>
              <TabsTrigger value='onboardings'>
                Onboardingy ({customerOnboardings.length})
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger value='documents'>
                  Dokumenty ({customerDocuments.length})
                </TabsTrigger>
              )}
              <TabsTrigger value='activity'>Aktivita</TabsTrigger>
            </TabsList>

            <TabsContent value='overview' className='space-y-4'>
              <CustomerOverviewTab
                customer={customer}
                recentActivity={activities.slice(0, 5)}
              />
            </TabsContent>

            <TabsContent value='requests' className='space-y-4'>
              <CustomerRequestsTab requests={customerRequests} />
            </TabsContent>

            <TabsContent value='calculations' className='space-y-4'>
              <CustomerCalculationsTab calculations={customerCalculations} />
            </TabsContent>

            <TabsContent value='onboardings' className='space-y-4'>
              <CustomerOnboardingsTab onboardings={customerOnboardings} />
            </TabsContent>

            {isAdmin && (
              <TabsContent value='documents' className='space-y-4'>
                <CustomerDocumentsTab documents={customerDocuments} />
              </TabsContent>
            )}

            <TabsContent value='activity' className='space-y-4'>
              <CustomerActivityTab activities={activities} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
