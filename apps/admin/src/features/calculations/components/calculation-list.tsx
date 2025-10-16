import { useMemo } from 'react'
import { format } from 'date-fns'
import { CarRequestCalculationStatus } from '@/gql/graphql'
import { useQuery, useMutation } from '@apollo/client/react'
import { cs } from 'date-fns/locale'
import {
  Calculator,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
  FileText,
  Plus,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  GET_CALCULATIONS_BY_CAR_REQUEST,
  SUBMIT_CALCULATION,
  DELETE_CALCULATION,
} from '../queries'

interface CalculationListProps {
  carRequestId: string
  onCreateClick: () => void
  onViewClick: (calculationId: string) => void
}

const statusConfig = {
  [CarRequestCalculationStatus.Draft]: {
    label: 'Koncept',
    icon: FileText,
    variant: 'secondary' as const,
  },
  [CarRequestCalculationStatus.Submitted]: {
    label: 'Odesláno',
    icon: Clock,
    variant: 'default' as const,
  },
  [CarRequestCalculationStatus.InProgress]: {
    label: 'Zpracovává se',
    icon: Calculator,
    variant: 'default' as const,
  },
  [CarRequestCalculationStatus.Completed]: {
    label: 'Dokončeno',
    icon: CheckCircle2,
    variant: 'success' as const,
  },
  [CarRequestCalculationStatus.Rejected]: {
    label: 'Zamítnuto',
    icon: XCircle,
    variant: 'destructive' as const,
  },
  [CarRequestCalculationStatus.Cancelled]: {
    label: 'Zrušeno',
    icon: Ban,
    variant: 'outline' as const,
  },
}

export function CalculationList({
  carRequestId,
  onCreateClick,
  onViewClick,
}: CalculationListProps) {
  const { data, loading, refetch } = useQuery(GET_CALCULATIONS_BY_CAR_REQUEST, {
    variables: { carRequestId },
  })

  const [submitCalculation] = useMutation(SUBMIT_CALCULATION, {
    onCompleted: () => refetch(),
  })

  const [deleteCalculation] = useMutation(DELETE_CALCULATION, {
    onCompleted: () => refetch(),
  })

  const calculations = useMemo(() => {
    return data?.calculationsByCarRequest || []
  }, [data])

  const handleSubmit = async (id: string) => {
    if (confirm('Opravdu chcete odeslat kalkulaci ke zpracování?')) {
      await submitCalculation({ variables: { id } })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Opravdu chcete smazat kalkulaci?')) {
      await deleteCalculation({ variables: { id } })
    }
  }

  if (loading) {
    return <div>Načítání...</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Kalkulace nabídek</CardTitle>
            <CardDescription>
              Historie kalkulačních požadavků pro tento car request
            </CardDescription>
          </div>
          <Button onClick={onCreateClick} size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            Nová kalkulace
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {calculations.length === 0 ? (
          <div className='text-muted-foreground py-8 text-center'>
            <Calculator className='mx-auto mb-4 h-12 w-12 opacity-50' />
            <p>Zatím nebyly vytvořeny žádné kalkulace</p>
            <Button onClick={onCreateClick} variant='outline' className='mt-4'>
              Vytvořit první kalkulaci
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Verze</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Parametry</TableHead>
                <TableHead>Nabídky</TableHead>
                <TableHead>Vytvořeno</TableHead>
                <TableHead>Požadoval</TableHead>
                <TableHead className='text-right'>Akce</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculations.map((calc) => {
                const status = statusConfig[calc.status]
                const StatusIcon = status.icon

                return (
                  <TableRow key={calc.id}>
                    <TableCell className='font-medium'>
                      v{calc.version}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>
                        <StatusIcon className='mr-1 h-3 w-3' />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className='text-sm'>
                        <div>{calc.durationMonths} měsíců</div>
                        <div className='text-muted-foreground'>
                          {calc.annualMileageKm.toLocaleString()} km/rok
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='text-sm'>
                        {calc.offers?.length || 0} nabídek
                        {calc.offers && calc.offers.length > 0 && (
                          <div className='text-muted-foreground'>
                            {calc.offers
                              .map((o) => o.leasingCompany.name)
                              .join(', ')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(calc.createdAt), 'dd.MM.yyyy HH:mm', {
                        locale: cs,
                      })}
                    </TableCell>
                    <TableCell>
                      {calc.requestedBy.firstName} {calc.requestedBy.lastName}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => onViewClick(calc.id)}
                        >
                          Detail
                        </Button>
                        {calc.status === CarRequestCalculationStatus.Draft && (
                          <>
                            <Button
                              variant='default'
                              size='sm'
                              onClick={() => handleSubmit(calc.id)}
                            >
                              Odeslat
                            </Button>
                            <Button
                              variant='destructive'
                              size='sm'
                              onClick={() => handleDelete(calc.id)}
                            >
                              Smazat
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
