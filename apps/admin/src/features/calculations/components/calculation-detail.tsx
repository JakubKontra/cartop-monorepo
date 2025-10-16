import { useState } from 'react'
import { format } from 'date-fns'
import { CarRequestCalculationStatus } from '@/gql/graphql'
import { useQuery } from '@apollo/client/react'
import { cs } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { GET_CALCULATION } from '../queries'
import { AddOfferQuoteDialog } from './add-offer-quote-dialog'

interface CalculationDetailProps {
  calculationId: string
}

export function CalculationDetail({ calculationId }: CalculationDetailProps) {
  const [addOfferDialogOpen, setAddOfferDialogOpen] = useState(false)

  const { data, loading, refetch } = useQuery(GET_CALCULATION, {
    variables: { id: calculationId },
  })

  if (loading) {
    return <div>Načítání...</div>
  }

  const calculation = data?.calculation

  if (!calculation) {
    return <div>Kalkulace nenalezena</div>
  }

  const canAddOffers =
    calculation.status === CarRequestCalculationStatus.InProgress ||
    calculation.status === CarRequestCalculationStatus.Submitted

  return (
    <div className='space-y-6'>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>
                Kalkulace v{calculation.version} -{' '}
                {calculation.carRequest.brand?.name}{' '}
                {calculation.carRequest.model?.name}
              </CardTitle>
              <CardDescription>
                Vytvořeno{' '}
                {format(new Date(calculation.createdAt), 'dd.MM.yyyy HH:mm', {
                  locale: cs,
                })}
              </CardDescription>
            </div>
            <Badge>{calculation.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm font-medium'>Doba trvání</div>
              <div className='text-2xl'>
                {calculation.durationMonths} měsíců
              </div>
            </div>
            <div>
              <div className='text-sm font-medium'>Roční nájezd</div>
              <div className='text-2xl'>
                {calculation.annualMileageKm.toLocaleString()} km
              </div>
            </div>
          </div>

          {calculation.notes && (
            <div>
              <div className='mb-1 text-sm font-medium'>Poznámky</div>
              <div className='text-muted-foreground text-sm'>
                {calculation.notes}
              </div>
            </div>
          )}

          {calculation.internalNotes && (
            <div>
              <div className='mb-1 text-sm font-medium'>Interní poznámky</div>
              <div className='text-muted-foreground text-sm'>
                {calculation.internalNotes}
              </div>
            </div>
          )}

          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='font-medium'>Požadoval:</span>{' '}
              {calculation.requestedBy.firstName}{' '}
              {calculation.requestedBy.lastName}
            </div>
            {calculation.assignedTo && (
              <div>
                <span className='font-medium'>Přiřazeno:</span>{' '}
                {calculation.assignedTo.firstName}{' '}
                {calculation.assignedTo.lastName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Items */}
      {calculation.items && calculation.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Konfigurace vozu</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Typ</TableHead>
                  <TableHead>Název</TableHead>
                  <TableHead>Popis</TableHead>
                  <TableHead className='text-right'>Dopad na cenu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculation.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant='outline'>{item.itemType}</Badge>
                    </TableCell>
                    <TableCell className='font-medium'>{item.name}</TableCell>
                    <TableCell className='text-muted-foreground'>
                      {item.description || '-'}
                    </TableCell>
                    <TableCell className='text-right'>
                      {item.priceImpact
                        ? `${item.priceImpact.toLocaleString()} Kč`
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Offers */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Nabídky od leasing společností</CardTitle>
              <CardDescription>
                Porovnání nabídek různých poskytovatelů
              </CardDescription>
            </div>
            {canAddOffers && (
              <Button onClick={() => setAddOfferDialogOpen(true)}>
                Přidat nabídku
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!calculation.offers || calculation.offers.length === 0 ? (
            <div className='text-muted-foreground py-8 text-center'>
              Zatím nebyly přidány žádné nabídky
            </div>
          ) : (
            <div className='space-y-4'>
              {calculation.offers.map((offer) => (
                <Card key={offer.id}>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <CardTitle className='text-lg'>
                        {offer.leasingCompany.name}
                      </CardTitle>
                      <Badge>{offer.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <div className='text-sm font-medium'>
                          Měsíční splátka
                        </div>
                        <div className='text-2xl'>
                          {offer.monthlyPayment?.toLocaleString()} Kč
                        </div>
                      </div>
                      <div>
                        <div className='text-sm font-medium'>Akontace</div>
                        <div className='text-2xl'>
                          {offer.downPayment?.toLocaleString() || 0} Kč
                        </div>
                      </div>
                      <div>
                        <div className='text-sm font-medium'>Celková cena</div>
                        <div className='text-2xl'>
                          {offer.totalPrice?.toLocaleString()} Kč
                        </div>
                      </div>
                    </div>

                    {(offer.includesService ||
                      offer.includesWinterTires ||
                      offer.includesGap ||
                      offer.includesAssistance) && (
                      <>
                        <Separator className='my-4' />
                        <div>
                          <div className='mb-2 text-sm font-medium'>
                            Zahrnuto v ceně
                          </div>
                          <div className='flex gap-2'>
                            {offer.includesService && (
                              <Badge variant='secondary'>Servis</Badge>
                            )}
                            {offer.includesWinterTires && (
                              <Badge variant='secondary'>Zimní pneu</Badge>
                            )}
                            {offer.includesGap && (
                              <Badge variant='secondary'>GAP pojištění</Badge>
                            )}
                            {offer.includesAssistance && (
                              <Badge variant='secondary'>Asistence</Badge>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {offer.notes && (
                      <>
                        <Separator className='my-4' />
                        <div>
                          <div className='mb-1 text-sm font-medium'>
                            Poznámky
                          </div>
                          <div className='text-muted-foreground text-sm'>
                            {offer.notes}
                          </div>
                        </div>
                      </>
                    )}

                    {offer.quotedBy && (
                      <div className='text-muted-foreground mt-4 text-sm'>
                        Nabídku vytvořil {offer.quotedBy.firstName}{' '}
                        {offer.quotedBy.lastName} dne{' '}
                        {offer.quotedAt &&
                          format(new Date(offer.quotedAt), 'dd.MM.yyyy HH:mm', {
                            locale: cs,
                          })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddOfferQuoteDialog
        calculationId={calculationId}
        open={addOfferDialogOpen}
        onOpenChange={setAddOfferDialogOpen}
        onSuccess={() => {
          refetch()
          setAddOfferDialogOpen(false)
        }}
      />
    </div>
  )
}
