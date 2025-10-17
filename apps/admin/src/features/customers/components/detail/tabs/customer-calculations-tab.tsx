'use client'

import { formatDate } from 'date-fns'
import { cs } from 'date-fns/locale'
import { Calculator } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type Calculation, CALCULATION_STATUS_LABELS } from '../../../data/customer-detail-types'

interface CustomerCalculationsTabProps {
  calculations: Calculation[]
}

export function CustomerCalculationsTab({ calculations }: CustomerCalculationsTabProps) {
  if (calculations.length === 0) {
    return (
      <Card>
        <CardContent className='py-12'>
          <div className='text-center text-muted-foreground'>
            <Calculator className='h-12 w-12 mx-auto mb-2 opacity-20' />
            <p>Žádné kalkulace nenalezeny</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'DRAFT':
      case 'PENDING':
        return 'secondary'
      case 'IN_PROGRESS':
        return 'default'
      case 'COMPLETED':
      case 'ACCEPTED':
        return 'default'
      case 'REJECTED':
        return 'destructive'
      case 'SENT':
        return 'default'
      default:
        return 'secondary'
    }
  }

  return (
    <Card>
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Měsíční splátka</TableHead>
              <TableHead>Akontace</TableHead>
              <TableHead>Zbytková hodnota</TableHead>
              <TableHead>Celkové náklady</TableHead>
              <TableHead>Úroková sazba</TableHead>
              <TableHead>Stav</TableHead>
              <TableHead>Přiřazeno</TableHead>
              <TableHead>Vytvořeno</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calculations.map((calculation) => (
              <TableRow key={calculation.id}>
                <TableCell>
                  <span className='text-sm text-muted-foreground'>-</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-muted-foreground'>-</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-muted-foreground'>-</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-muted-foreground'>-</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm text-muted-foreground'>-</span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(calculation.status || 'DRAFT')}>
                    {CALCULATION_STATUS_LABELS[calculation.status as keyof typeof CALCULATION_STATUS_LABELS] || calculation.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {calculation.assignedTo ? (
                    <span className='text-sm'>
                      {calculation.assignedTo.firstName} {calculation.assignedTo.lastName}
                    </span>
                  ) : (
                    <span className='text-sm text-muted-foreground'>Nepřiřazeno</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className='text-sm text-muted-foreground'>
                    {formatDate(new Date(calculation.createdAt), 'PPP', { locale: cs })}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
