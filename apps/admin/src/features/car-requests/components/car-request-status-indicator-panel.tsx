'use client'

import { format } from 'date-fns'
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Hourglass,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CarRequestStatusIndicatorPanelProps {
  nextCallAt?: Date | string | null
  waitingForOffer?: boolean
  confirmedAt?: Date | string | null
  relayedAt?: Date | string | null
  feedbackAt?: Date | string | null
  completedAt?: Date | string | null
  closedAt?: Date | string | null
}

export function CarRequestStatusIndicatorPanel({
  nextCallAt,
  waitingForOffer,
  confirmedAt,
  relayedAt,
  feedbackAt,
  completedAt,
  closedAt,
}: CarRequestStatusIndicatorPanelProps) {
  const formatDate = (date?: Date | string | null) => {
    if (!date) return null
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      return format(dateObj, 'PPp') // e.g., "Apr 29, 2024, 9:00 AM"
    } catch {
      return null
    }
  }

  const formatDateShort = (date?: Date | string | null) => {
    if (!date) return null
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      return format(dateObj, 'MMM d, HH:mm') // e.g., "Apr 29, 14:30"
    } catch {
      return null
    }
  }

  const indicators = [
    {
      label: 'Next Call',
      value: formatDate(nextCallAt),
      shortValue: formatDateShort(nextCallAt),
      icon: PhoneCall,
      bgColor: nextCallAt ? 'bg-blue-600' : 'bg-muted',
      textColor: nextCallAt ? 'text-white' : 'text-muted-foreground',
      priority: true,
      show: true,
    },
    {
      label: 'Waiting for Offer',
      value: waitingForOffer ? 'Yes' : 'No',
      shortValue: waitingForOffer ? 'Yes' : 'No',
      icon: Hourglass,
      bgColor: waitingForOffer ? 'bg-amber-600' : 'bg-muted',
      textColor: waitingForOffer ? 'text-white' : 'text-muted-foreground',
      priority: true,
      show: true,
    },
    {
      label: 'Confirmed',
      value: formatDate(confirmedAt),
      shortValue: formatDateShort(confirmedAt),
      icon: CheckCircle2,
      bgColor: confirmedAt ? 'bg-green-600' : 'bg-muted',
      textColor: confirmedAt ? 'text-white' : 'text-muted-foreground',
      priority: false,
      show: confirmedAt || relayedAt || feedbackAt,
    },
    {
      label: 'Relayed',
      value: formatDate(relayedAt),
      shortValue: formatDateShort(relayedAt),
      icon: Calendar,
      bgColor: relayedAt ? 'bg-purple-600' : 'bg-muted',
      textColor: relayedAt ? 'text-white' : 'text-muted-foreground',
      priority: false,
      show: confirmedAt || relayedAt || feedbackAt,
    },
    {
      label: 'Feedback',
      value: formatDate(feedbackAt),
      shortValue: formatDateShort(feedbackAt),
      icon: Clock,
      bgColor: feedbackAt ? 'bg-cyan-600' : 'bg-muted',
      textColor: feedbackAt ? 'text-white' : 'text-muted-foreground',
      priority: false,
      show: confirmedAt || relayedAt || feedbackAt,
    },
    {
      label: 'Completed',
      value: formatDate(completedAt),
      shortValue: formatDateShort(completedAt),
      icon: CheckCircle2,
      bgColor: completedAt ? 'bg-green-700' : 'bg-muted',
      textColor: completedAt ? 'text-white' : 'text-muted-foreground',
      priority: false,
      show: completedAt || closedAt,
    },
    {
      label: 'Closed',
      value: formatDate(closedAt),
      shortValue: formatDateShort(closedAt),
      icon: XCircle,
      bgColor: closedAt ? 'bg-red-600' : 'bg-muted',
      textColor: closedAt ? 'text-white' : 'text-muted-foreground',
      priority: false,
      show: completedAt || closedAt,
    },
  ]

  return (
    <div className='mb-4 p-4'>
      <div className='flex flex-wrap items-center gap-3'>
        {indicators
          .filter((indicator) => indicator.show)
          .map((indicator) => {
            const Icon = indicator.icon
            return (
              <div
                key={indicator.label}
                className={`flex items-center gap-3 ${indicator.bgColor} ${indicator.textColor} rounded-lg px-4 py-3 shadow-sm transition-all hover:shadow-md ${
                  indicator.priority
                    ? 'ring-primary/20 ring-2 ring-offset-2'
                    : ''
                }`}
              >
                <Icon className='h-5 w-5 shrink-0' />
                <div className='flex flex-col'>
                  <span className='text-xs font-medium opacity-90'>
                    {indicator.label}
                  </span>
                  {indicator.value ? (
                    <span className='font-bo ld text-sm leading-tight'>
                      {indicator.shortValue || indicator.value}
                    </span>
                  ) : (
                    <Badge variant='outline' className='mt-0.5 w-fit text-xs'>
                      Not set
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
