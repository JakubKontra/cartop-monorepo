'use client'

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { ONBOARDING_STATUS_COLORS, ONBOARDING_STATUS_LABELS, type Onboarding } from '../../data/customer-detail-types'

interface OnboardingProgressIndicatorProps {
  onboarding: Onboarding
  showDetails?: boolean
}

export function OnboardingProgressIndicator({
  onboarding,
  showDetails = true,
}: OnboardingProgressIndicatorProps) {
  // Calculate progress based on documents
  const documents = onboarding.documents || []
  const totalDocuments = documents.length
  const validatedDocuments = documents.filter(
    (doc) => doc.validationStatus === 'APPROVED'
  ).length
  const progress = totalDocuments > 0 ? (validatedDocuments / totalDocuments) * 100 : 0

  // Get status color
  const statusColor = ONBOARDING_STATUS_COLORS[onboarding.status as keyof typeof ONBOARDING_STATUS_COLORS] || 'gray'

  // Get status label
  const statusLabel = ONBOARDING_STATUS_LABELS[onboarding.status as keyof typeof ONBOARDING_STATUS_LABELS] || onboarding.status

  // Determine variant based on status
  const badgeVariant = onboarding.status === 'COMPLETED' ? 'default' :
                       onboarding.status === 'IN_PROGRESS' ? 'secondary' :
                       onboarding.status === 'WAITING_FOR_DOCUMENTS' ? 'outline' :
                       'secondary'

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Badge variant={badgeVariant}>
            {statusLabel}
          </Badge>
          {showDetails && (
            <span className='text-sm text-muted-foreground'>
              {validatedDocuments} / {totalDocuments} dokumentů
            </span>
          )}
        </div>
        <span className='text-sm font-medium'>{Math.round(progress)}%</span>
      </div>
      <Progress
        value={progress}
        className={cn(
          'h-2',
          statusColor === 'green' && '[&>div]:bg-green-500',
          statusColor === 'blue' && '[&>div]:bg-blue-500',
          statusColor === 'yellow' && '[&>div]:bg-yellow-500',
          statusColor === 'gray' && '[&>div]:bg-gray-500',
          statusColor === 'red' && '[&>div]:bg-red-500'
        )}
      />
    </div>
  )
}
