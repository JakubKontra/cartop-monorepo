'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@apollo/client/react'
import { useNavigate, Link } from '@tanstack/react-router'
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
import { GET_ALL_CUSTOMERS } from '@/features/customers/customers.graphql'
import { GET_ALL_CATALOG_MODEL_GENERATIONS } from '@/features/generations/generations.graphql'
import { CREATE_INDIVIDUAL_OFFER, GET_ALL_OFFERS } from '../offers.graphql'

const formSchema = z.object({
  modelGenerationId: z.string().uuid('Vyberte generaci modelu'),
  customerId: z.string().uuid('Vyberte zákazníka'),
  totalPrice: z.coerce.number().min(0, 'Cena musí být kladná'),
  monthlyPayment: z.coerce.number().min(0).optional(),
  leasingDurationMonths: z.coerce.number().min(12).max(60).optional(),
  annualMileageLimit: z.coerce.number().min(5000).max(100000).optional(),
  slug: z.string().min(2).optional(),
  description: z.string().optional(),
  customRequirements: z.string().optional(),
  internalNotes: z.string().optional(),
  assignedToId: z.string().uuid().optional(),
  responseDeadline: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export function OfferIndividualCreatePage() {
  const navigate = useNavigate()

  const { data: generationsData } = useQuery(
    GET_ALL_CATALOG_MODEL_GENERATIONS,
    {
      variables: { limit: 1000, offset: 0 },
    }
  )
  const generations = generationsData?.catalogModelGenerations || []

  const { data: customersData } = useQuery(GET_ALL_CUSTOMERS, {
    variables: { limit: 1000, offset: 0 },
  })
  const customers =
    customersData?.users?.filter((user: any) =>
      user.roles.includes('CUSTOMER')
    ) || []

  const { data: usersData } = useQuery(GET_ALL_CUSTOMERS, {
    variables: { limit: 1000, offset: 0 },
  })
  const admins =
    usersData?.users?.filter(
      (user: any) =>
        user.roles.includes('ADMIN') ||
        user.roles.includes('SALES_REPRESENTATIVE')
    ) || []

  const [createOffer, { loading }] = useMutation(CREATE_INDIVIDUAL_OFFER, {
    refetchQueries: [{ query: GET_ALL_OFFERS }],
    onCompleted: () => {
      toast.success('Nabídka vytvořena', {
        description: 'Individuální nabídka byla úspěšně vytvořena.',
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
    defaultValues: {
      leasingDurationMonths: 36,
      annualMileageLimit: 15000,
    },
  })

  const onSubmit = (data: FormData) => {
    const input: any = {
      ...data,
    }

    // Parse customRequirements as JSON if provided
    if (data.customRequirements) {
      try {
        input.customRequirements = JSON.stringify({
          text: data.customRequirements,
        })
      } catch {
        input.customRequirements = data.customRequirements
      }
    }

    createOffer({
      variables: {
        input,
      },
    })
  }

  return (
    <div className='container mx-auto max-w-4xl py-6'>
      <div className='mb-6 flex items-center gap-4'>
        <Link to='/offers/new'>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-4 w-4' />
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold'>Vytvořit individuální nabídku</h1>
          <p className='text-muted-foreground'>
            Vytvořte nabídku na míru pro konkrétního zákazníka
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Údaje nabídky</CardTitle>
          <CardDescription>
            Všechna pole označená * jsou povinná
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='customerId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zákazník *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Vyberte zákazníka' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customers.map((customer: any) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.firstName && customer.lastName
                              ? `${customer.firstName} ${customer.lastName}`
                              : customer.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='modelGenerationId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Generace modelu *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Vyberte generaci modelu' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {generations.map((gen: any) => (
                          <SelectItem key={gen.id} value={gen.id}>
                            {gen.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='totalPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celková cena *</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='850000' {...field} />
                      </FormControl>
                      <FormDescription>Celková cena vozidla v Kč</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='monthlyPayment'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Měsíční splátka</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='12500' {...field} />
                      </FormControl>
                      <FormDescription>Volitelná měsíční splátka</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='leasingDurationMonths'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doba leasingu (měsíce)</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='36' {...field} />
                      </FormControl>
                      <FormDescription>12-60 měsíců</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='annualMileageLimit'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roční limit km</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='15000' {...field} />
                      </FormControl>
                      <FormDescription>5000-100000 km/rok</FormDescription>
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

              <FormField
                control={form.control}
                name='customRequirements'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speciální požadavky zákazníka</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Např. metalické lakování, panoramatické střešní okno...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='assignedToId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Přiřadit k</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Vyberte uživatele' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {admins.map((admin: any) => (
                            <SelectItem key={admin.id} value={admin.id}>
                              {admin.firstName && admin.lastName
                                ? `${admin.firstName} ${admin.lastName}`
                                : admin.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Zodpovědná osoba za tuto nabídku
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='responseDeadline'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Termín odpovědi</FormLabel>
                      <FormControl>
                        <Input type='datetime-local' {...field} />
                      </FormControl>
                      <FormDescription>
                        Deadline pro odpověď zákazníka
                      </FormDescription>
                      <FormMessage />
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
                  Vytvořit nabídku
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
