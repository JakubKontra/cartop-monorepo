'use client'

import { ClipboardList, CheckCircle2, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type CustomerStats } from '../../data/customer-detail-types'

interface CustomerStatsCardsProps {
  stats: CustomerStats
}

export function CustomerStatsCards({ stats }: CustomerStatsCardsProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Celkem poptávek</CardTitle>
          <ClipboardList className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.totalRequests}</div>
          <p className='text-xs text-muted-foreground'>Všechny poptávky vozů</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Aktivní poptávky</CardTitle>
          <Clock className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.activeRequests}</div>
          <p className='text-xs text-muted-foreground'>Probíhající poptávky</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Dokončeno</CardTitle>
          <CheckCircle2 className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.completedRequests}</div>
          <p className='text-xs text-muted-foreground'>Dokončené poptávky</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Pokrok onboardingu
          </CardTitle>
          <TrendingUp className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.onboardingProgress}%</div>
          <p className='text-xs text-muted-foreground'>
            {stats.completedOnboardings} z {stats.totalOnboardings} dokončeno
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
