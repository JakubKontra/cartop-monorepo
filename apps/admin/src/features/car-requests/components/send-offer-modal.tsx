'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { CREATE_CAR_REQUEST_LOG, GET_ALL_OFFERS } from '../car-requests.graphql'
import { Send, Loader2, AlertCircle, Car, DollarSign } from 'lucide-react'

interface SendOfferModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  carRequestId: string
  customerName?: string
  onSuccess?: () => void
}

interface FormData {
  selectedOfferIds: string[]
  message: string
}

export function SendOfferModal({
  open,
  onOpenChange,
  carRequestId,
  customerName,
  onSuccess,
}: SendOfferModalProps) {
  const { auth } = useAuthStore()
  const [selectedOfferIds, setSelectedOfferIds] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      selectedOfferIds: [],
      message: '',
    },
  })

  // Fetch all available offers
  const { data: offersData, loading: offersLoading, error: offersError } = useQuery(GET_ALL_OFFERS)

  const [createLog, { loading: sendingOffer }] = useMutation(CREATE_CAR_REQUEST_LOG, {
    onCompleted: () => {
      toast.success(`${selectedOfferIds.length} offer(s) sent to ${customerName || 'the customer'}.`)
      reset()
      setSelectedOfferIds([])
      onOpenChange(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send offers. Please try again.')
    },
  })

  const onSubmit = (data: FormData) => {
    if (selectedOfferIds.length === 0) {
      toast.error('Please select at least one offer to send.')
      return
    }

    const offers = offersData?.allOffers?.filter((offer) =>
      selectedOfferIds.includes(offer.id)
    )

    const offerDetails = offers
      ?.map((offer) => {
        const brandName = offer.brand?.name || 'Unknown'
        const modelName = offer.model?.name || 'Unknown'
        const price = new Intl.NumberFormat('cs-CZ', {
          style: 'currency',
          currency: 'CZK',
        }).format(offer.totalPrice)

        return `${brandName} ${modelName} - ${price}`
      })
      .join(', ')

    const message = data.message
      ? `Offers sent: ${offerDetails}. Note: ${data.message}`
      : `Offers sent: ${offerDetails}`

    createLog({
      variables: {
        input: {
          carRequestId,
          message,
          actionType: 'OFFER_SENT',
          metadata: {
            offerIds: selectedOfferIds,
            offerCount: selectedOfferIds.length,
            customerNote: data.message || null,
            sentAt: new Date().toISOString(),
          },
          authorId: auth.user?.id,
        },
      },
    })
  }

  const handleOfferToggle = (offerId: string, checked: boolean) => {
    setSelectedOfferIds((prev) =>
      checked ? [...prev, offerId] : prev.filter((id) => id !== offerId)
    )
  }

  const activeOffers = offersData?.allOffers?.filter(
    (offer) => offer.isActive && offer.isPublic
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getOfferTypeLabel = (type: string) => {
    switch (type) {
      case 'OPERATIONAL_LEASING':
        return 'Operational Leasing'
      case 'DIRECT_PURCHASE':
        return 'Direct Purchase'
      case 'INDIVIDUAL':
        return 'Individual Offer'
      default:
        return type
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[700px] max-h-[90vh]'>
        <DialogHeader>
          <DialogTitle>Send Offers to Customer</DialogTitle>
          <DialogDescription>
            Select one or more offers to send to {customerName || 'the customer'}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
          {offersError && (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertDescription>
                Failed to load offers. Please try refreshing the page.
              </AlertDescription>
            </Alert>
          )}

          {offersLoading && (
            <div className='flex items-center justify-center py-8'>
              <Loader2 className='h-6 w-6 animate-spin' />
              <span className='ml-2 text-muted-foreground'>Loading offers...</span>
            </div>
          )}

          {!offersLoading && activeOffers && activeOffers.length === 0 && (
            <Alert>
              <AlertCircle className='h-4 w-4' />
              <AlertDescription>
                No active offers available. Please create offers first.
              </AlertDescription>
            </Alert>
          )}

          {!offersLoading && activeOffers && activeOffers.length > 0 && (
            <>
              <div className='space-y-2'>
                <Label>
                  Select Offers <span className='text-destructive'>*</span>
                </Label>
                <ScrollArea className='h-[300px] rounded-md border p-4'>
                  <div className='space-y-3'>
                    {activeOffers.map((offer) => (
                      <div
                        key={offer.id}
                        className='flex items-start space-x-3 rounded-lg border p-3 hover:bg-accent'
                      >
                        <Checkbox
                          id={offer.id}
                          checked={selectedOfferIds.includes(offer.id)}
                          onCheckedChange={(checked) =>
                            handleOfferToggle(offer.id, checked as boolean)
                          }
                        />
                        <div className='flex-1 space-y-1'>
                          <label
                            htmlFor={offer.id}
                            className='flex cursor-pointer items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            <div className='flex items-center gap-2'>
                              <Car className='h-4 w-4 text-muted-foreground' />
                              <span>
                                {offer.brand?.name || 'Unknown'} {offer.model?.name || 'Unknown'}
                              </span>
                              <span className='text-muted-foreground text-xs'>
                                ({getOfferTypeLabel(offer.type)})
                              </span>
                            </div>
                            <div className='flex items-center gap-1 font-bold'>
                              <DollarSign className='h-4 w-4' />
                              {formatPrice(offer.totalPrice)}
                            </div>
                          </label>
                          {offer.description && (
                            <p className='text-muted-foreground text-xs line-clamp-2'>
                              {offer.description}
                            </p>
                          )}
                          {offer.monthlyPayment && (
                            <p className='text-muted-foreground text-xs'>
                              Monthly: {formatPrice(offer.monthlyPayment)} × {offer.leasingDurationMonths} months
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                {selectedOfferIds.length > 0 && (
                  <p className='text-muted-foreground text-xs'>
                    {selectedOfferIds.length} offer(s) selected
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='message'>Additional Message (Optional)</Label>
                <Textarea
                  id='message'
                  placeholder='Add any additional notes or context for the customer...'
                  rows={3}
                  {...register('message')}
                />
                <p className='text-muted-foreground text-xs'>
                  This note is for internal purposes and will be logged with the offer
                </p>
              </div>
            </>
          )}

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={sendingOffer}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={sendingOffer || offersLoading || selectedOfferIds.length === 0}
            >
              {sendingOffer && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              <Send className='mr-2 h-4 w-4' />
              Send {selectedOfferIds.length > 0 ? `(${selectedOfferIds.length})` : ''} Offer(s)
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
