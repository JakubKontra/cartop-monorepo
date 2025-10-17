'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@apollo/client/react'
import { useNavigate, Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UPDATE_OFFER, GET_ALL_OFFERS, GET_OFFER_BY_ID } from '../offers.graphql'
import type { Offer } from '../data/types'

const formSchema = z.object({
  totalPrice: z.coerce.number().min(0, 'Cena musí být kladná').optional(),
  monthlyPayment: z.coerce.number().min(0).optional(),
  slug: z.string().min(2).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  internalNotes: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export function OfferEditPage() {
  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const offerId = params.offerId as string

  const { data: offerData, loading: offerLoading } = useQuery(GET_OFFER_BY_ID, {
    variables: { id: offerId },
    skip: !offerId,
  })

  const offer = offerData?.offer as Offer | undefined

  const [updateOffer, { loading }] = useMutation(UPDATE_OFFER, {
    refetchQueries: [{ query: GET_ALL_OFFERS }],
    onCompleted: () => {
      toast.success('Nabídka aktualizována', {
        description: 'Nabídka byla úspěšně aktualizována.',
      })
      navigate({ to: '/offers' })
    },
    onError: (error) => {
      toast.error('Chyba', {
        description: error.message,
      })
    },
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  // Reset form when offer loads
  useEffect(() => {
    if (offer) {
      form.reset({
        totalPrice: offer.totalPrice,
        monthlyPayment: offer.monthlyPayment || undefined,
        slug: offer.slug || undefined,
        description: offer.description || undefined,
        isActive: offer.isActive,
        isPublic: offer.isPublic,
        internalNotes: offer.internalNotes || undefined,
      })
    }
  }, [offer, form])

  const onSubmit = (data: FormData) => {
    if (!offer) return

    // Only send changed fields
    const changedFields: Partial<FormData> = {}
    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof FormData
      if (data[typedKey] !== undefined) {
        changedFields[typedKey] = data[typedKey]
      }
    })

    updateOffer({
      variables: {
        id: offer.id,
        input: changedFields,
      },
    })
  }

  if (offerLoading) {
    return (
      <div className='container mx-auto max-w-4xl py-6'>
        <div className='flex items-center justify-center py-12'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      </div>
    )
  }

  if (!offer) {
    return (
      <div className='container mx-auto max-w-4xl py-6'>
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>Nabídka nebyla nalezena</p>
          <Link to='/offers'>
            <Button variant='outline' className='mt-4'>
              Zpět na seznam
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const vehicleInfo = offer.modelGeneration
    ? offer.modelGeneration.name
    : 'Neznámé vozidlo'

  return (
    <div className='container mx-auto max-w-4xl py-6'>
      <div className='mb-6 flex items-center gap-4'>
        <Link to='/offers'>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-4 w-4' />
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold'>Upravit nabídku</h1>
          <p className='text-muted-foreground'>{vehicleInfo}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Údaje nabídky</CardTitle>
          <CardDescription>
            Upravte údaje nabídky podle potřeby
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='totalPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celková cena</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='850000' {...field} />
                      </FormControl>
                      <FormDescription>Celková cena vozidla v Kč</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {offer.type !== 'direct_purchase' && (
                  <FormField
                    control={form.control}
                    name='monthlyPayment'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Měsíční splátka</FormLabel>
                        <FormControl>
                          <Input type='number' placeholder='12500' {...field} />
                        </FormControl>
                        <FormDescription>Měsíční splátka v Kč</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name='slug'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL slug</FormLabel>
                      <FormControl>
                        <Input placeholder='skoda-octavia-rs-2024' {...field} />
                      </FormControl>
                      <FormDescription>Pro veřejnou URL</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Popis</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Popis nabídky...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {offer.type === 'individual' && (
                <FormField
                  control={form.control}
                  name='internalNotes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interní poznámky</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Poznámky viditelné pouze pro administrátory...'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Tyto poznámky nejsou viditelné pro zákazníka
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className='space-y-3'>
                <FormField
                  control={form.control}
                  name='isActive'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-y-0 space-x-2'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className='font-normal'>
                          Aktivní nabídka
                        </FormLabel>
                        <FormDescription>
                          Neaktivní nabídky se nezobrazují veřejně
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='isPublic'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-y-0 space-x-2'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className='font-normal'>
                          Veřejná nabídka
                        </FormLabel>
                        <FormDescription>
                          Veřejné nabídky jsou dostupné všem uživatelům
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex justify-end gap-2'>
                <Link to='/offers'>
                  <Button type='button' variant='outline' disabled={loading}>
                    Zrušit
                  </Button>
                </Link>
                <Button type='submit' disabled={loading}>
                  {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  Uložit změny
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
