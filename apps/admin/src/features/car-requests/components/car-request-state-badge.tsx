'use client'

import { Badge } from '@/components/ui/badge'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CAR_REQUEST_STATES,
  needsFollowUpAfterOffer,
  type CarRequestStateCode,
} from '../constants/states'

interface CarRequestStateBadgeProps {
  stateCode: CarRequestStateCode | null | undefined
  offersSentAt?: string | null
  className?: string
  showAlert?: boolean
}

export function CarRequestStateBadge({
  stateCode,
  offersSentAt,
  className,
  showAlert = true,
}: CarRequestStateBadgeProps) {
  if (!stateCode) {
    return (
      <Badge variant='outline' className={cn('text-muted-foreground', className)}>
        No State
      </Badge>
    )
  }

  const state = CAR_REQUEST_STATES[stateCode]
  if (!state) {
    return (
      <Badge variant='outline' className={cn('text-muted-foreground', className)}>
        Unknown
      </Badge>
    )
  }

  const Icon = state.icon
  const needsFollowUp = showAlert && needsFollowUpAfterOffer(stateCode, offersSentAt)

  return (
    <div className='flex items-center gap-2'>
      <Badge
        variant='outline'
        className={cn('gap-1.5', className)}
        style={{
          borderColor: state.colorHex,
          color: state.colorHex,
        }}
      >
        <Icon className='h-3.5 w-3.5' />
        <span>{state.name}</span>
      </Badge>

      {needsFollowUp && (
        <div
          className='flex items-center gap-1 text-xs font-medium'
          style={{ color: state.colorHex }}
          title='Requires follow-up - offers sent more than 1 day ago'
        >
          <AlertCircle className='h-4 w-4' />
          <span>Follow-up needed</span>
        </div>
      )}
    </div>
  )
}
