import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@apollo/client/react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ADD_OFFER_QUOTE, GET_LEASING_COMPANIES } from '../queries'

const offerQuoteSchema = z.object({
  leasingCompanyId: z.string().min(1, 'Vyberte leasing společnost'),
  monthlyPayment: z.coerce.number().min(0).optional(),
  downPayment: z.coerce.number().min(0).optional(),
  totalPrice: z.coerce.number().min(0).optional(),
  interestRate: z.coerce.number().min(0).max(100).optional(),
  adminFee: z.coerce.number().min(0).optional(),
  includesService: z.boolean().optional(),
  includesWinterTires: z.boolean().optional(),
  includesGap: z.boolean().optional(),
  includesAssistance: z.boolean().optional(),
  notes: z.string().optional(),
})

type OfferQuoteFormValues = z.infer<typeof offerQuoteSchema>

interface AddOfferQuoteDialogProps {
  calculationId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddOfferQuoteDialog({
  calculationId,
  open,
  onOpenChange,
  onSuccess,
}: AddOfferQuoteDialogProps) {
  const { data: leasingData } = useQuery(GET_LEASING_COMPANIES)
  const [addOfferQuote, { loading }] = useMutation(ADD_OFFER_QUOTE)

  const form = useForm<OfferQuoteFormValues>({
    resolver: zodResolver(offerQuoteSchema),
    defaultValues: {
      includesService: false,
      includesWinterTires: false,
      includesGap: false,
      includesAssistance: false,
    },
  })

  const onSubmit = async (values: OfferQuoteFormValues) => {
    try {
      await addOfferQuote({
        variables: {
          input: {
            calculationId,
            ...values,
          },
        },
      })

      form.reset()
      onSuccess()
    } catch (error) {
      console.error('Failed to add offer quote:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-3xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Přidat nabídku od leasing společnosti</DialogTitle>
          <DialogDescription>
            Vyplňte detaily nabídky od vybrané leasing společnosti
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='leasingCompanyId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leasing společnost *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Vyberte leasing společnost' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leasingData?.leasingCompanies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-3 gap-4'>
              <FormField
                control={form.control}
                name='monthlyPayment'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Měsíční splátka (Kč)</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='5000' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='downPayment'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Akontace (Kč)</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='0' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='totalPrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celková cena (Kč)</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='240000' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='interestRate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Úroková sazba (%)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='3.5'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='adminFee'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Administrativní poplatek (Kč)</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='0' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='space-y-3'>
              <FormLabel>Zahrnuto v ceně</FormLabel>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='includesService'
                  render={({ field }) => (
                    <FormItem className='flex items-center space-y-0 space-x-2'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        Servis a údržba
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='includesWinterTires'
                  render={({ field }) => (
                    <FormItem className='flex items-center space-y-0 space-x-2'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        Zimní pneumatiky
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='includesGap'
                  render={({ field }) => (
                    <FormItem className='flex items-center space-y-0 space-x-2'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        GAP pojištění
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='includesAssistance'
                  render={({ field }) => (
                    <FormItem className='flex items-center space-y-0 space-x-2'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        Asistenční služba
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poznámky (volitelné)</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Poznámky k nabídce...' {...field} />
                  </FormControl>
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
                {loading ? 'Přidávání...' : 'Přidat nabídku'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
