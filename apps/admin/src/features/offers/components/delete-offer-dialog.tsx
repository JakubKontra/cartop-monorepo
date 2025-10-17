'use client'

import { useMutation } from '@apollo/client/react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { offerTypeLabels } from '../data/types'
import { DELETE_OFFER, GET_ALL_OFFERS } from '../offers.graphql'
import { useOffersContext } from './offers-provider'

export function DeleteOfferDialog() {
  const {
    selectedOffer,
    deleteDialogOpen,
    setDeleteDialogOpen,
    setSelectedOffer,
  } = useOffersContext()

  const [deleteOffer, { loading }] = useMutation(DELETE_OFFER, {
    refetchQueries: [{ query: GET_ALL_OFFERS }],
    onCompleted: () => {
      toast.success('Nabídka smazána', {
        description: 'Nabídka byla úspěšně smazána.',
      })
      setDeleteDialogOpen(false)
      setSelectedOffer(null)
    },
    onError: (error) => {
      toast.error('Chyba', {
        description: error.message,
      })
    },
  })

  const handleDelete = () => {
    if (!selectedOffer) return

    deleteOffer({
      variables: {
        id: selectedOffer.id,
      },
    })
  }

  if (!selectedOffer) return null

  const vehicleInfo = selectedOffer.modelGeneration
    ? selectedOffer.modelGeneration.name
    : 'Neznámé vozidlo'

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Opravdu chcete smazat tuto nabídku?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className='space-y-2'>
              <p>
                Tato akce je nevratná. Následující nabídka bude trvale smazána:
              </p>
              <div className='bg-muted space-y-1 rounded-md p-3'>
                <p className='font-medium'>{vehicleInfo}</p>
                <p className='text-sm'>
                  Typ: {offerTypeLabels[selectedOffer.type]}
                </p>
                <p className='text-sm'>
                  Cena: {selectedOffer.totalPrice.toLocaleString('cs-CZ')} Kč
                </p>
                {selectedOffer.description && (
                  <p className='text-muted-foreground text-sm'>
                    {selectedOffer.description}
                  </p>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Zrušit</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Smazat nabídku
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
