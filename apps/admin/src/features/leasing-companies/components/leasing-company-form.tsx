'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/image-upload'
import { leasingCompanySchema, type LeasingCompanyFormValues } from '../data/schema'
import { Loader2 } from 'lucide-react'

interface LeasingCompanyFormProps {
  /** Initial values for the form (for editing) */
  defaultValues?: Partial<LeasingCompanyFormValues>
  /** Current logo URL (for preview in edit mode) */
  logoUrl?: string
  /** Whether this is an edit form */
  isEdit?: boolean
  /** Loading state */
  loading?: boolean
  /** Submit handler */
  onSubmit: (values: LeasingCompanyFormValues) => void | Promise<void>
  /** Cancel handler */
  onCancel: () => void
}

export function LeasingCompanyForm({
  defaultValues,
  logoUrl,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
}: LeasingCompanyFormProps) {
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | undefined>(logoUrl)

  const form = useForm<LeasingCompanyFormValues>({
    resolver: zodResolver(leasingCompanySchema),
    defaultValues: defaultValues || {
      name: '',
      link: '',
      logoId: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the leasing company details
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
                      placeholder='Leasing Company Name'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name of the leasing company
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='link'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      type='url'
                      placeholder='https://example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional website link for the leasing company
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
                    Upload a logo image for the leasing company (JPG, PNG, WebP, SVG, max 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

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
            {isEdit ? 'Update Leasing Company' : 'Create Leasing Company'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
