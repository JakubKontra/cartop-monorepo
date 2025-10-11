'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useLazyQuery } from '@apollo/client/react'
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
import { modelSchema, type ModelFormValues } from '../data/schema'
import { GET_ALL_CATALOG_BRANDS } from '../../brands/brands.graphql'
import { CHECK_MODEL_SLUG } from '../models.graphql'
import { Loader2 } from 'lucide-react'

interface ModelFormProps {
  /** Initial values for the form (for editing) */
  defaultValues?: Partial<ModelFormValues>
  /** Whether this is an edit form (shows/hides legacy fields) */
  isEdit?: boolean
  /** Loading state */
  loading?: boolean
  /** Submit handler */
  onSubmit: (values: ModelFormValues) => void | Promise<void>
  /** Cancel handler */
  onCancel: () => void
}

export function ModelForm({
  defaultValues,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
}: ModelFormProps) {
  const { data: brandsData, loading: loadingBrands } = useQuery(GET_ALL_CATALOG_BRANDS, {
    variables: { limit: 1000, offset: 0 },
  })
  const [checkSlug] = useLazyQuery(CHECK_MODEL_SLUG)

  const brands = brandsData?.allCatalogBrands || []

  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues: defaultValues || {
      name: '',
      slug: '',
      description: '',
      brandId: '',
      isActive: false,
      isHighlighted: false,
      isRecommended: false,
      legacySystemId: '',
      legacySlug: '',
    },
  })

  const validateSlugUniqueness = async (slug: string): Promise<boolean> => {
    if (!slug) return true

    try {
      const { data } = await checkSlug({
        variables: { slug },
      })

      // If we got data back, the slug exists
      if (data?.catalogModelBySlug) {
        return false // Slug is already taken
      }

      return true // Slug is available
    } catch (error) {
      // If the query errors (e.g., model not found), the slug is available
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
              Enter the model details and select its brand
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
                      placeholder='3 Series'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name of the model
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
                  <FormLabel>
                    Slug <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <SlugInput
                      deriveFrom='name'
                      placeholder='3-series'
                      onValidateUnique={validateSlugUniqueness}
                      initialSlug={defaultValues?.slug}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL-friendly identifier (auto-generated from name)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='brandId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Brand <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={loadingBrands ? 'Loading brands...' : 'Select a brand'}
                      disabled={loadingBrands}
                      items={brands.map((brand) => ({
                        label: brand.name,
                        value: brand.id,
                      }))}
                    />
                  </FormControl>
                  <FormDescription>
                    The brand this model belongs to
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
                      placeholder='Model description...'
                      className='resize-none'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional description of the model
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Status & Visibility */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Visibility</CardTitle>
            <CardDescription>
              Control how this model appears to users
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
                      {field.value ? 'Model is visible to users' : 'Model is hidden from users'}
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

            <FormField
              control={form.control}
              name='isHighlighted'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Highlighted</FormLabel>
                    <FormDescription>
                      {field.value ? 'Featured as a highlighted model' : 'Regular model status'}
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

            <FormField
              control={form.control}
              name='isRecommended'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Recommended</FormLabel>
                    <FormDescription>
                      {field.value ? 'Recommended to users' : 'Not recommended'}
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

              <FormField
                control={form.control}
                name='legacySlug'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-muted-foreground'>
                      Legacy Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Optional'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Slug from the previous system
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
          <Button type='submit' disabled={loading || loadingBrands}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isEdit ? 'Update Model' : 'Create Model'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
