'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity } from 'lucide-react'
import { ActivityTimeline } from '../activity-timeline'
import { type ActivityLog } from '../../../data/customer-detail-types'

interface CustomerActivityTabProps {
  activities: ActivityLog[]
}

export function CustomerActivityTab({ activities }: CustomerActivityTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Activity className='h-5 w-5' />
          Celá aktivita zákazníka
        </CardTitle>
        <p className='text-sm text-muted-foreground'>
          Kompletní historie všech akcí a změn
        </p>
      </CardHeader>
      <CardContent>
        <ActivityTimeline activities={activities} />
      </CardContent>
    </Card>
  )
}
