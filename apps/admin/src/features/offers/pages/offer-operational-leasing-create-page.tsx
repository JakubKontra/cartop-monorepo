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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GET_ALL_CATALOG_MODEL_GENERATIONS } from '@/features/generations/generations.graphql'
import {
  CREATE_OPERATIONAL_LEASING_OFFER,
  GET_ALL_OFFERS,
} from '../offers.graphql'

const formSchema = z.object({
  modelGenerationId: z.string().uuid('Vyberte generaci modelu'),
  totalPrice: z.coerce.number().min(0, 'Cena musí být kladná'),
  leasingDurationMonths: z.coerce.number().min(12).max(60),
  monthlyPayment: z.coerce.number().min(0),
  annualMileageLimit: z.coerce.number().min(5000).max(100000),
  downPaymentLeasing: z.coerce.number().min(0).optional(),
  slug: z.string().min(2).optional(),
  description: z.string().optional(),
  hasServiceIncluded: z.boolean().default(false),
  hasWinterTyresIncluded: z.boolean().default(false),
  hasAssistanceServiceIncluded: z.boolean().default(false),
  hasGapIncluded: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

type FormData = z.infer<typeof formSchema>

export function OfferOperationalLeasingCreatePage() {
  const navigate = useNavigate()

  const { data: generationsData } = useQuery(
    GET_ALL_CATALOG_MODEL_GENERATIONS,
    {
      variables: { limit: 1000, offset: 0 },
    }
  )
  const generations = generationsData?.catalogModelGenerations || []

  const [createOffer, { loading }] = useMutation(
    CREATE_OPERATIONAL_LEASING_OFFER,
    {
      refetchQueries: [{ query: GET_ALL_OFFERS }],
      onCompleted: () => {
        toast.success('Nabídka vytvořena', {
          description: 'Operativní leasingová nabídka byla úspěšně vytvořena.',
        })
        navigate({ to: '/offers' })
      },
      onError: (error) => {
        toast.error('Chyba', {
          description: error.message,
        })
      },
    }
  )

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leasingDurationMonths: 36,
      annualMileageLimit: 15000,
      hasServiceIncluded: false,
      hasWinterTyresIncluded: false,
      hasAssistanceServiceIncluded: false,
      hasGapIncluded: false,
      isActive: true,
    },
  })

  const onSubmit = (data: FormData) => {
    createOffer({
      variables: {
        input: data,
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
          <h1 className='text-3xl font-bold'>
            Vytvořit nabídku operativního leasingu
          </h1>
          <p className='text-muted-foreground'>
            Vyplňte údaje pro novou leasingovou nabídku
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
                      <FormLabel>Měsíční splátka *</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='12500' {...field} />
                      </FormControl>
                      <FormDescription>
                        Měsíční leasingová splátka v Kč
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='leasingDurationMonths'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doba leasingu (měsíce) *</FormLabel>
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
                      <FormLabel>Roční limit km *</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='15000' {...field} />
                      </FormControl>
                      <FormDescription>5000-100000 km/rok</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='downPaymentLeasing'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Akontace</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='0' {...field} />
                      </FormControl>
                      <FormDescription>Volitelná akontace v Kč</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                      <Input placeholder='Popis nabídky...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='space-y-2'>
                <FormLabel>Zahrnuté služby</FormLabel>
                <div className='grid gap-2 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='hasServiceIncluded'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-start space-y-0 space-x-2'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                          <FormLabel className='font-normal'>Servis</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='hasWinterTyresIncluded'
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
                            Zimní pneumatiky
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='hasAssistanceServiceIncluded'
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
                            Asistenční služba
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='hasGapIncluded'
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
                            GAP pojištění
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
