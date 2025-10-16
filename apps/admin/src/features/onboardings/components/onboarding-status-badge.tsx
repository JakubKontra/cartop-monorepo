import { Badge } from '@/components/ui/badge'
import { type OnboardingStatus } from '@/gql/graphql'
import { CheckCircle2, Clock, AlertCircle, XCircle, HourglassIcon } from 'lucide-react'

interface OnboardingStatusBadgeProps {
  status: OnboardingStatus
}

export function OnboardingStatusBadge({ status }: OnboardingStatusBadgeProps) {
  switch (status) {
    case 'PENDING':
      return (
        <Badge variant='secondary' className='gap-1'>
          <Clock className='h-3 w-3' />
          Pending
        </Badge>
      )
    case 'IN_PROGRESS':
      return (
        <Badge variant='default' className='gap-1 bg-blue-500'>
          <HourglassIcon className='h-3 w-3' />
          In Progress
        </Badge>
      )
    case 'COMPLETE':
      return (
        <Badge variant='default' className='gap-1 bg-green-600'>
          <CheckCircle2 className='h-3 w-3' />
          Complete
        </Badge>
      )
    case 'INCOMPLETE':
      return (
        <Badge variant='default' className='gap-1 bg-yellow-600'>
          <AlertCircle className='h-3 w-3' />
          Incomplete
        </Badge>
      )
    case 'EXPIRED':
      return (
        <Badge variant='destructive' className='gap-1'>
          <XCircle className='h-3 w-3' />
          Expired
        </Badge>
      )
    default:
      return <Badge variant='outline'>{status}</Badge>
  }
}
