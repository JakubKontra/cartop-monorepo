'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLazyQuery } from '@apollo/client/react'
import { Button } from '@/components/ui/button'
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
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SelectDropdown } from '@/components/select-dropdown'
import { SlugInput } from '@/components/slug-input'
import { BrandModelSelector } from '@/components/brand-model-selector'
import { generationSchema, type GenerationFormValues } from '../data/schema'
import { CHECK_GENERATION_SLUG } from '../generations.graphql'
import { Loader2 } from 'lucide-react'

// Enum options - these should match backend enums (uppercase values)
const BODY_TYPE_OPTIONS = [
  { value: 'SUV', label: 'SUV' },
  { value: 'SEDAN_LIFTBACK', label: 'Sedan / Liftback' },
  { value: 'WAGON_MPV', label: 'Wagon / MPV' },
  { value: 'SMALL_CAR_HATCHBACK', label: 'Small Car / Hatchback' },
  { value: 'SPORTS_CAR_COUPE', label: 'Sports Car / Coupe' },
  { value: 'CONVERTIBLE', label: 'Convertible' },
  { value: 'VAN', label: 'Van' },
  { value: 'OFF_ROAD_CONVERTIBLE', label: 'Off-road Convertible' },
  { value: 'WAGON_CROSSOVER', label: 'Wagon / Crossover' },
  { value: 'SAV', label: 'SAV' },
  { value: 'SAC', label: 'SAC' },
  { value: 'CUV', label: 'CUV' },
  { value: 'CROSSOVER_LIFTBACK', label: 'Crossover / Liftback' },
  { value: 'OFF_ROAD_COUPE', label: 'Off-road Coupe' },
  { value: 'CROSSOVER_FASTBACK', label: 'Crossover / Fastback' },
  { value: 'COUPE_CROSSOVER', label: 'Coupe / Crossover' },
  { value: 'COUPE_SUV_CROSSOVER', label: 'Coupe / SUV / Crossover' },
  { value: 'COMMERCIAL_VAN', label: 'Commercial Van' },
  { value: 'MOTORHOME', label: 'Motorhome' },
]

const BRAKE_TYPE_OPTIONS = [
  { value: 'DISC', label: 'Disc Brakes' },
  { value: 'VENTILATED_DISC', label: 'Ventilated Disc Brakes' },
  { value: 'DRUM', label: 'Drum Brakes' },
]

interface GenerationFormProps {
  /** Initial values for the form (for editing) */
  defaultValues?: Partial<GenerationFormValues>
  /** Whether this is an edit form (shows/hides legacy fields) */
  isEdit?: boolean
  /** Loading state */
  loading?: boolean
  /** Submit handler */
  onSubmit: (values: GenerationFormValues) => void | Promise<void>
  /** Cancel handler */
  onCancel: () => void
}

export function GenerationForm({
  defaultValues,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
}: GenerationFormProps) {
  const [checkSlug] = useLazyQuery(CHECK_GENERATION_SLUG)

  const form = useForm<GenerationFormValues>({
    resolver: zodResolver(generationSchema),
    defaultValues: defaultValues || {
      name: '',
      slug: '',
      legacySlug: '',
      modelId: '',
      brandId: '',
      description: '',
      productionStart: '',
      productionStop: '',
      wheelbase: null,
      frontTrack: null,
      rearTrack: null,
      length: null,
      width: null,
      height: null,
      trunkSpaceMin: null,
      trunkSpaceMax: null,
      bodyType: null,
      frontBrakesType: null,
      rearBrakesType: null,
      isActive: false,
      legacySystemId: '',
    },
  })

  const validateSlugUniqueness = async (slug: string): Promise<boolean> => {
    if (!slug) return true

    try {
      const { data, error } = await checkSlug({
        variables: { slug },
      })

      // If we got an error (generation not found), the slug is available
      if (error) {
        return true
      }

      // If we got data back, the slug exists
      if (data?.catalogModelGenerationBySlug) {
        return false // Slug is already taken
      }

      return true // Slug is available
    } catch (error) {
      // If the query errors (e.g., generation not found), the slug is available
      return true
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the generation name and identifiers
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='F30 (2012-2019)'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name of the generation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <SlugInput
                      deriveFrom='name'
                      placeholder='f30-2012-2019'
                      onValidateUnique={validateSlugUniqueness}
                      initialSlug={defaultValues?.slug || ''}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL-friendly identifier (optional, auto-generated from name)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='legacySlug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legacy Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='bmw-3-series-f30'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Slug from the legacy system (optional, for backward compatibility)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Generation description...'
                      className='resize-none'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional description of the generation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Model & Brand */}
        <Card>
          <CardHeader>
            <CardTitle>Model & Brand</CardTitle>
            <CardDescription>
              Select the model this generation belongs to
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <BrandModelSelector
              selectedBrandId={form.watch('brandId') || undefined}
              selectedModelId={form.watch('modelId') || undefined}
              onBrandChange={(brandId) => form.setValue('brandId', brandId)}
              onModelChange={(modelId) => form.setValue('modelId', modelId)}
              brandRequired={false}
              modelRequired={true}
              labels={{
                brand: 'Brand',
                model: 'Model',
                brandDescription: 'Select a brand to filter models (optional)',
                modelDescription: 'The model this generation belongs to',
              }}
              disabled={loading}
            />

            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='productionStart'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Production Start</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Production start date
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='productionStop'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Production End</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Production end date
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
            <CardDescription>
              Body type and brake system specifications
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='bodyType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body Type</FormLabel>
                  <FormControl>
                    <SelectDropdown
                      defaultValue={field.value as string | undefined}
                      onValueChange={(value) => field.onChange(value as any)}
                      placeholder='Select body type'
                      items={BODY_TYPE_OPTIONS}
                    />
                  </FormControl>
                  <FormDescription>
                    Vehicle body style
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='frontBrakesType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Front Brakes Type</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value as string | undefined}
                        onValueChange={(value) => field.onChange(value as any)}
                        placeholder='Select brake type'
                        items={BRAKE_TYPE_OPTIONS}
                      />
                    </FormControl>
                    <FormDescription>
                      Front brake system
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='rearBrakesType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rear Brakes Type</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        defaultValue={field.value as string | undefined}
                        onValueChange={(value) => field.onChange(value as any)}
                        placeholder='Select brake type'
                        items={BRAKE_TYPE_OPTIONS}
                      />
                    </FormControl>
                    <FormDescription>
                      Rear brake system
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Dimensions */}
        <Card>
          <CardHeader>
            <CardTitle>Dimensions</CardTitle>
            <CardDescription>
              Vehicle dimensions in millimeters
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='length'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length (mm)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='4650'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='width'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (mm)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='1810'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='height'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (mm)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='1430'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid gap-4 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='wheelbase'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wheelbase (mm)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='2810'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='frontTrack'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Front Track (mm)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='1540'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='rearTrack'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rear Track (mm)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='1560'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='trunkSpaceMin'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trunk Space Min (L)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='480'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum trunk capacity in liters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='trunkSpaceMax'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trunk Space Max (L)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='1300'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum trunk capacity in liters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Status & Visibility */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Visibility</CardTitle>
            <CardDescription>
              Control how this generation appears to users
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Active</FormLabel>
                    <FormDescription>
                      {field.value ? 'Generation is visible to users' : 'Generation is hidden from users'}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Legacy System Fields (only for create) */}
        {!isEdit && (
          <Card>
            <CardHeader>
              <CardTitle>Legacy System</CardTitle>
              <CardDescription>
                Optional fields for migration from legacy systems
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='legacySystemId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-muted-foreground'>
                      Legacy System ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Optional'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      ID from the previous system
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Form Actions */}
        <div className='flex items-center justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isEdit ? 'Update Generation' : 'Create Generation'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
