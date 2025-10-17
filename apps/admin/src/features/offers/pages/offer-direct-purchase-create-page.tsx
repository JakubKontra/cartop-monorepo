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
import { CREATE_DIRECT_PURCHASE_OFFER, GET_ALL_OFFERS } from '../offers.graphql'

const formSchema = z.object({
  modelGenerationId: z.string().uuid('Vyberte generaci modelu'),
  totalPrice: z.coerce.number().min(0, 'Cena musí být kladná'),
  discountAmount: z.coerce.number().min(0).optional(),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  slug: z.string().min(2).optional(),
  description: z.string().optional(),
  includesWarranty: z.boolean().default(false),
  warrantyYears: z.coerce.number().min(1).max(10).optional(),
  financingAvailable: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

type FormData = z.infer<typeof formSchema>

export function OfferDirectPurchaseCreatePage() {
  const navigate = useNavigate()

  const { data: generationsData } = useQuery(
    GET_ALL_CATALOG_MODEL_GENERATIONS,
    {
      variables: { limit: 1000, offset: 0 },
    }
  )
  const generations = generationsData?.catalogModelGenerations || []

  const [createOffer, { loading }] = useMutation(CREATE_DIRECT_PURCHASE_OFFER, {
    refetchQueries: [{ query: GET_ALL_OFFERS }],
    onCompleted: () => {
      toast.success('Nabídka vytvořena', {
        description: 'Prodejní nabídka byla úspěšně vytvořena.',
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
      includesWarranty: false,
      financingAvailable: false,
      isActive: true,
    },
  })

  const includesWarranty = form.watch('includesWarranty')

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
            Vytvořit nabídku přímého prodeje
          </h1>
          <p className='text-muted-foreground'>
            Vyplňte údaje pro novou prodejní nabídku
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
                <FormLabel>Sleva</FormLabel>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='discountAmount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sleva v Kč</FormLabel>
                        <FormControl>
                          <Input type='number' placeholder='50000' {...field} />
                        </FormControl>
                        <FormDescription>Absolutní sleva</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='discountPercentage'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sleva v %</FormLabel>
                        <FormControl>
                          <Input type='number' placeholder='10' {...field} />
                        </FormControl>
                        <FormDescription>
                          Procentuální sleva (0-100)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <FormLabel>Záruka a financování</FormLabel>
                <div className='space-y-3'>
                  <FormField
                    control={form.control}
                    name='includesWarranty'
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
                            Zahrnuje záruku
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {includesWarranty && (
                    <FormField
                      control={form.control}
                      name='warrantyYears'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Počet let záruky</FormLabel>
                          <FormControl>
                            <Input type='number' placeholder='3' {...field} />
                          </FormControl>
                          <FormDescription>1-10 let</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name='financingAvailable'
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
                            Dostupné financování
                          </FormLabel>
                          <FormDescription>
                            Možnost financování nákupu
                          </FormDescription>
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
