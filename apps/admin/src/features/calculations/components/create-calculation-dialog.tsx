import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CarRequestCalculationItemType } from '@/gql/graphql'
import { useMutation } from '@apollo/client/react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { CREATE_CALCULATION } from '../queries'

const calculationSchema = z.object({
  durationMonths: z.coerce.number().min(1).max(120),
  annualMileageKm: z.coerce.number().min(1000).max(500000),
  deliveryExpectedAt: z.string().optional(),
  notes: z.string().optional(),
  internalNotes: z.string().optional(),
})

type CalculationFormValues = z.infer<typeof calculationSchema>

interface CreateCalculationDialogProps {
  carRequestId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateCalculationDialog({
  carRequestId,
  open,
  onOpenChange,
  onSuccess,
}: CreateCalculationDialogProps) {
  const [createCalculation, { loading }] = useMutation(CREATE_CALCULATION)

  const form = useForm<CalculationFormValues>({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      durationMonths: 48,
      annualMileageKm: 15000,
      notes: '',
      internalNotes: '',
    },
  })

  const onSubmit = async (values: CalculationFormValues) => {
    try {
      await createCalculation({
        variables: {
          input: {
            carRequestId,
            durationMonths: values.durationMonths,
            annualMileageKm: values.annualMileageKm,
            deliveryExpectedAt: values.deliveryExpectedAt
              ? new Date(values.deliveryExpectedAt)
              : undefined,
            notes: values.notes,
            internalNotes: values.internalNotes,
            items: [], // Items can be added later
          },
        },
      })

      form.reset()
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to create calculation:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Nová kalkulace nabídky</DialogTitle>
          <DialogDescription>
            Vytvořte požadavek na kalkulaci pro tento car request
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='durationMonths'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doba trvání (měsíce)</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='48' {...field} />
                    </FormControl>
                    <FormDescription>Délka leasingu v měsících</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='annualMileageKm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roční nájezd (km)</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='15000' {...field} />
                    </FormControl>
                    <FormDescription>
                      Předpokládaný roční nájezd
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='deliveryExpectedAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Očekávané dodání (volitelné)</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormDescription>
                    Kdy zákazník očekává dodání vozu
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poznámky (volitelné)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Poznámky k požadavku...'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Poznámky viditelné pro zákazníka
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='internalNotes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interní poznámky (volitelné)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Interní poznámky pro tým...'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Interní poznámky (nezobrazí se zákazníkovi)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Zrušit
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? 'Vytváření...' : 'Vytvořit kalkulaci'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
