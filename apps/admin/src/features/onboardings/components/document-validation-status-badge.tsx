import { Badge } from '@/components/ui/badge'
import { type DocumentValidationStatus } from '@/gql/graphql'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'

interface DocumentValidationStatusBadgeProps {
  status: DocumentValidationStatus
}

export function DocumentValidationStatusBadge({ status }: DocumentValidationStatusBadgeProps) {
  switch (status) {
    case 'PENDING':
      return (
        <Badge variant='secondary' className='gap-1'>
          <Clock className='h-3 w-3' />
          Pending
        </Badge>
      )
    case 'APPROVED':
      return (
        <Badge variant='default' className='gap-1 bg-green-600'>
          <CheckCircle2 className='h-3 w-3' />
          Approved
        </Badge>
      )
    case 'REJECTED':
      return (
        <Badge variant='destructive' className='gap-1'>
          <XCircle className='h-3 w-3' />
          Rejected
        </Badge>
      )
    default:
      return <Badge variant='outline'>{status}</Badge>
  }
}
