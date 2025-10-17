'use client'

import { formatDate } from 'date-fns'
import { cs } from 'date-fns/locale'
import { ClipboardList, ExternalLink, MoreHorizontal } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type CarRequest, CAR_REQUEST_STATUS_LABELS } from '../../../data/customer-detail-types'

interface CustomerRequestsTabProps {
  requests: CarRequest[]
}

export function CustomerRequestsTab({ requests }: CustomerRequestsTabProps) {
  const navigate = useNavigate()
  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className='py-12'>
          <div className='text-center text-muted-foreground'>
            <ClipboardList className='h-12 w-12 mx-auto mb-2 opacity-20' />
            <p>Žádné poptávky nenalezeny</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'secondary'
      case 'IN_PROGRESS':
        return 'default'
      case 'COMPLETED':
        return 'default'
      case 'CANCELLED':
      case 'REJECTED':
        return 'destructive'
      case 'ACCEPTED':
      case 'QUOTED':
        return 'default'
      default:
        return 'secondary'
    }
  }

  return (
    <Card>
      <CardContent className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Značka / Model</TableHead>
              <TableHead>Rozpočet</TableHead>
              <TableHead>Doba leasingu</TableHead>
              <TableHead>Stav</TableHead>
              <TableHead>Přiřazeno</TableHead>
              <TableHead>Vytvořeno</TableHead>
              <TableHead className='w-[80px]'>Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.id}
                className='cursor-pointer hover:bg-muted/50'
                onClick={() => {
                  navigate({
                    to: '/car-requests/$carRequestId',
                    params: { carRequestId: request.id }
                  })
                }}
              >
                <TableCell>
                  <div>
                    <p className='font-medium'>
                      {request.brand?.name || 'Bez značky'}
                    </p>
                    {request.model && (
                      <p className='text-sm text-muted-foreground'>
                        {request.model.name}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-muted-foreground'>-</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-muted-foreground'>-</span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(request.status?.code || 'NEW')}>
                    {request.status?.name || 'Nová'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {request.assignedAgent ? (
                    <span className='text-sm'>
                      {request.assignedAgent.firstName} {request.assignedAgent.lastName}
                    </span>
                  ) : (
                    <span className='text-sm text-muted-foreground'>Nepřiřazeno</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className='text-sm text-muted-foreground'>
                    {formatDate(new Date(request.createdAt), 'PPP', { locale: cs })}
                  </span>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                        onClick={() => {
                          navigate({
                            to: '/car-requests/$carRequestId',
                            params: { carRequestId: request.id }
                          })
                        }}
                      >
                        <ExternalLink className='mr-2 h-4 w-4' />
                        Otevřít detail
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
