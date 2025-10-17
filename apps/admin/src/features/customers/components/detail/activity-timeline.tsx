'use client'

import { formatDate } from 'date-fns'
import { cs } from 'date-fns/locale'
import { Plus, Edit, Trash2, Activity } from 'lucide-react'
import { type ActivityLog } from '../../data/customer-detail-types'

interface ActivityTimelineProps {
  activities: ActivityLog[]
}

function getActionIcon(action: string) {
  switch (action) {
    case 'CREATE':
      return <Plus className='h-4 w-4' />
    case 'UPDATE':
      return <Edit className='h-4 w-4' />
    case 'DELETE':
      return <Trash2 className='h-4 w-4' />
    default:
      return <Activity className='h-4 w-4' />
  }
}

function getActionLabel(action: string) {
  switch (action) {
    case 'CREATE':
      return 'Vytvořeno'
    case 'UPDATE':
      return 'Upraveno'
    case 'DELETE':
      return 'Smazáno'
    default:
      return action
  }
}

function getEntityLabel(entityName: string) {
  const labels: Record<string, string> = {
    CarRequest: 'Poptávka vozu',
    CarRequestCalculation: 'Kalkulace',
    Onboarding: 'Onboarding',
    OnboardingDocument: 'Dokument',
    File: 'Soubor',
    User: 'Uživatel',
  }
  return labels[entityName] || entityName
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className='text-center py-8 text-muted-foreground'>
        <Activity className='h-12 w-12 mx-auto mb-2 opacity-20' />
        <p>Žádná aktivita nenalezena</p>
      </div>
    )
  }

  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = formatDate(new Date(activity.createdAt), 'PPP', { locale: cs })
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, ActivityLog[]>)

  return (
    <div className='space-y-6'>
      {Object.entries(groupedActivities).map(([date, dayActivities]) => (
        <div key={date}>
          <h3 className='text-sm font-semibold mb-3 text-muted-foreground'>
            {date}
          </h3>
          <div className='space-y-3 border-l-2 pl-4 ml-2'>
            {dayActivities.map((activity) => (
              <div key={activity.id} className='relative'>
                <div className='absolute -left-[1.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted'>
                  {getActionIcon(activity.action)}
                </div>
                <div className='rounded-lg border p-3 hover:bg-muted/50 transition-colors'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>
                        {getActionLabel(activity.action)} -{' '}
                        {getEntityLabel(activity.entityName)}
                      </p>
                      {activity.changes && (
                        <p className='text-xs text-muted-foreground mt-1'>
                          {activity.changes}
                        </p>
                      )}
                    </div>
                    <span className='text-xs text-muted-foreground whitespace-nowrap ml-4'>
                      {formatDate(new Date(activity.createdAt), 'HH:mm')}
                    </span>
                  </div>
                  {activity.ipAddress && (
                    <p className='text-xs text-muted-foreground mt-2'>
                      IP: {activity.ipAddress}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
