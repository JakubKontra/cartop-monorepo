import { useQuery } from '@apollo/client/react'
import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CAR_REQUESTS_DASHBOARD_STATS_QUERY } from './car-requests-dashboard.graphql'
import { DashboardAgentTable } from './components/dashboard-agent-table'
import { DashboardBrandChart } from './components/dashboard-brand-chart'
import { DashboardOverviewCards } from './components/dashboard-overview-cards'
import { DashboardTimelineChart } from './components/dashboard-timeline-chart'

export function CarRequestsDashboardPage() {
  const { data, loading, error } = useQuery(
    CAR_REQUESTS_DASHBOARD_STATS_QUERY,
    {
      fetchPolicy: 'cache-and-network',
    }
  )

  if (loading && !data) {
    return (
      <div className='container mx-auto space-y-6 p-6'>
        <div>
          <h1 className='mb-2 text-3xl font-bold'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Přehled statistik a výkonnosti
          </p>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className='h-4 w-[100px]' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-8 w-[60px]' />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          <Skeleton className='h-[400px]' />
          <Skeleton className='h-[400px]' />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto p-6'>
        <Alert variant='destructive'>
          <AlertCircleIcon className='h-4 w-4' />
          <AlertTitle>Chyba při načítání dat</AlertTitle>
          <AlertDescription>
            {error.message ||
              'Nepodařilo se načíst data dashboardu. Zkuste to prosím později.'}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!data?.carRequestsDashboardStats) {
    return (
      <div className='container mx-auto p-6'>
        <Alert>
          <AlertCircleIcon className='h-4 w-4' />
          <AlertTitle>Žádná data</AlertTitle>
          <AlertDescription>
            Dashboard nemá k dispozici žádná data k zobrazení.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const stats = data.carRequestsDashboardStats

  return (
    <div className='container mx-auto space-y-6 p-6'>
      {/* Header */}
      <div>
        <h1 className='mb-2 text-3xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground'>Přehled statistik a výkonnosti</p>
      </div>

      {/* Overview Cards */}
      <DashboardOverviewCards data={stats.overview} />

      {/* Charts Row 1 */}
      <div className='grid gap-6 md:grid-cols-2'>
        <DashboardBrandChart data={stats.topBrands} />
        <DashboardTimelineChart data={stats.timeline} />
      </div>

      {/* Agent Performance Table */}
      <DashboardAgentTable data={stats.agentPerformance} />

      {/* Leasing Companies & Funnel */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Leasing Companies Card */}
        <Card>
          <CardHeader>
            <CardTitle>Leasingové společnosti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {stats.leasingCompanies.length === 0 ? (
                <div className='text-muted-foreground py-8 text-center'>
                  Žádná data k zobrazení
                </div>
              ) : (
                stats.leasingCompanies.map((company) => (
                  <div
                    key={company.leasingCompanyId}
                    className='flex items-center justify-between border-b pb-3 last:border-0'
                  >
                    <div>
                      <p className='font-medium'>
                        {company.leasingCompanyName}
                      </p>
                      <p className='text-muted-foreground text-sm'>
                        {company.calculationsCount} kalkulací,{' '}
                        {company.completedOnboardingsCount} dokončených
                        onboardingů
                      </p>
                    </div>
                    {company.conversionRate !== null &&
                      company.conversionRate !== undefined && (
                        <div className='text-right'>
                          <p className='text-sm font-medium'>
                            {company.conversionRate.toFixed(1)}%
                          </p>
                          <p className='text-muted-foreground text-xs'>
                            konverze
                          </p>
                        </div>
                      )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel Card */}
        <Card>
          <CardHeader>
            <CardTitle>Konverzní trychtýř</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <FunnelItem
                label='Vytvořené poptávky'
                value={stats.funnel.created}
                total={stats.funnel.created}
              />
              <FunnelItem
                label='S nabídkami'
                value={stats.funnel.hasOffers}
                total={stats.funnel.created}
              />
              <FunnelItem
                label='Vybraná leasingová společnost'
                value={stats.funnel.leasingCompanySelected}
                total={stats.funnel.created}
              />
              <FunnelItem
                label='Dokončený onboarding'
                value={stats.funnel.onboardingComplete}
                total={stats.funnel.created}
              />
              <FunnelItem
                label='Objednáno'
                value={stats.funnel.ordered}
                total={stats.funnel.created}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface FunnelItemProps {
  label: string
  value: number
  total: number
}

function FunnelItem({ label, value, total }: FunnelItemProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  return (
    <div>
      <div className='mb-1 flex items-center justify-between'>
        <span className='text-sm font-medium'>{label}</span>
        <span className='text-muted-foreground text-sm'>
          {value.toLocaleString('cs-CZ')} ({percentage.toFixed(0)}%)
        </span>
      </div>
      <div className='bg-muted h-2 w-full rounded-full'>
        <div
          className='bg-primary h-2 rounded-full transition-all'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
