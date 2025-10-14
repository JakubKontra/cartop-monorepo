'use client'

import { useCallback, useState, useEffect } from 'react'
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
import { SlugInput } from '@/components/slug-input'
import { ImageUpload } from '@/components/image-upload'
import { brandSchema, type BrandFormValues } from '../data/schema'
import { CHECK_BRAND_SLUG } from '../brands.graphql'
import { Loader2 } from 'lucide-react'
import { logger } from '@/lib/logger'

interface BrandFormProps {
  /** Initial values for the form (for editing) */
  defaultValues?: Partial<BrandFormValues>
  /** Current logo URL (for preview in edit mode) */
  logoUrl?: string
  /** Whether this is an edit form (shows/hides legacy fields) */
  isEdit?: boolean
  /** Loading state */
  loading?: boolean
  /** Submit handler */
  onSubmit: (values: BrandFormValues) => void | Promise<void>
  /** Cancel handler */
  onCancel: () => void
}

export function BrandForm({
  defaultValues,
  logoUrl,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
}: BrandFormProps) {
  const [checkSlug] = useLazyQuery(CHECK_BRAND_SLUG)
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | undefined>(logoUrl)

  // Sync local state with prop changes (e.g., after mutation refetch)
  useEffect(() => {
    setUploadedLogoUrl(logoUrl)
  }, [logoUrl])

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: defaultValues || {
      name: '',
      slug: '',
      description: '',
      logoId: '',
      isActive: false,
      isHighlighted: false,
      isRecommended: false,
      legacySystemId: '',
      legacySlug: '',
    },
  })

  const validateSlugUniqueness = useCallback(
    async (slug: string): Promise<boolean> => {
      if (!slug) return true

      try {
        const { data } = await checkSlug({
          variables: { slug },
        })

        // checkBrandSlugAvailability returns null if available, brand object if taken
        if (data?.checkBrandSlugAvailability) {
          return false // Slug is already taken
        }

        return true // Slug is available (null response)
      } catch (error) {
        // If the query errors, assume slug is available
        logger.error('Error validating brand slug', error, { slug })
        return true
      }
    },
    [checkSlug]
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the brand name and unique identifier
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
                      placeholder='BMW'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name of the brand
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
                      placeholder='bmw'
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Brand description...'
                      className='resize-none'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional description of the brand
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='logoId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={uploadedLogoUrl}
                      fileId={field.value}
                      onUploadComplete={(result) => {
                        field.onChange(result.fileId)
                        setUploadedLogoUrl(result.url)
                      }}
                      onRemove={() => {
                        field.onChange('')
                        setUploadedLogoUrl(undefined)
                      }}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a logo image for the brand (JPG, PNG, WebP, SVG, max 5MB)
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
              Control how this brand appears to users
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
                      {field.value ? 'Brand is visible to users' : 'Brand is hidden from users'}
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
                      {field.value ? 'Featured as a highlighted brand' : 'Regular brand status'}
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
          <Button type='submit' disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isEdit ? 'Update Brand' : 'Create Brand'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
