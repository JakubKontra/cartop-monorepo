'use client'

import { useQuery } from '@apollo/client/react'
import { Loader2, PackageOpen } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { OffersDialogs } from './components/offers-dialogs'
import { OffersPrimaryButtons } from './components/offers-primary-buttons'
import { OffersProvider } from './components/offers-provider'
import { OffersTable } from './components/offers-table'
import { GET_ALL_OFFERS } from './offers.graphql'

export default function OffersPage() {
  const { data, loading, error } = useQuery(GET_ALL_OFFERS)

  const offers = data?.allOffers || []

  return (
    <OffersProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Nabídky</h1>
            <p className='text-muted-foreground'>
              Správa leasingových a prodejních nabídek vozidel
            </p>
          </div>
          <OffersPrimaryButtons />
        </div>

        {loading && (
          <div className='flex h-64 items-center justify-center'>
            <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
          </div>
        )}

        {error && (
          <Alert variant='destructive'>
            <AlertDescription>
              Chyba při načítání nabídek: {error.message}
            </AlertDescription>
          </Alert>
        )}

        {!loading && !error && offers.length === 0 && (
          <div className='text-muted-foreground flex h-64 flex-col items-center justify-center'>
            <PackageOpen className='mb-4 h-12 w-12 opacity-20' />
            <p>Žádné nabídky nenalezeny</p>
            <p className='mt-2 text-sm'>
              Začněte přidáním nové nabídky pomocí tlačítka výše
            </p>
          </div>
        )}

        {!loading && !error && offers.length > 0 && (
          <OffersTable data={offers} />
        )}

        <OffersDialogs />
      </div>
    </OffersProvider>
  )
}
