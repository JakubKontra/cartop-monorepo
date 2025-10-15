'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
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
import { Switch } from '@/components/ui/switch'
import { brandSchema, type BrandFormValues } from '../data/schema'
import { type Brand } from '../types'
import { CREATE_CATALOG_BRAND, UPDATE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'
import { Loader2 } from 'lucide-react'
import { logger } from '@/lib/logger'

type BrandActionDialogProps = {
  currentRow?: Brand
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BrandsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: BrandActionDialogProps) {
  const isEdit = !!currentRow

  const [createBrand, { loading: creating }] = useMutation(CREATE_CATALOG_BRAND, {
    refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS, variables: { limit: 1000, offset: 0 } }],
  })

  const [updateBrand, { loading: updating }] = useMutation(UPDATE_CATALOG_BRAND, {
    refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS, variables: { limit: 1000, offset: 0 } }],
  })

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: isEdit
      ? {
          name: currentRow.name,
          slug: currentRow.slug,
          description: currentRow.description || '',
          isActive: currentRow.isActive,
          isHighlighted: currentRow.isHighlighted,
          isRecommended: currentRow.isRecommended,
          legacySystemId: currentRow.legacySystemId || '',
          legacySlug: currentRow.legacySlug || '',
        }
      : {
          name: '',
          slug: '',
          description: '',
          isActive: false,
          isHighlighted: false,
          isRecommended: false,
          legacySystemId: '',
          legacySlug: '',
        },
  })

  const onSubmit = async (values: BrandFormValues) => {
    try {
      if (isEdit) {
        await updateBrand({
          variables: {
            id: currentRow.id,
            input: {
              name: values.name,
              slug: values.slug,
              description: values.description || null,
              isActive: values.isActive,
              isHighlighted: values.isHighlighted,
              isRecommended: values.isRecommended,
            },
          },
        })
        toast.success('Brand updated successfully')
      } else {
        await createBrand({
          variables: {
            input: {
              name: values.name,
              slug: values.slug,
              description: values.description || null,
              isActive: values.isActive,
              isHighlighted: values.isHighlighted,
              isRecommended: values.isRecommended,
              legacySystemId: values.legacySystemId || null,
              legacySlug: values.legacySlug || null,
            },
          },
        })
        toast.success('Brand created successfully')
      }
      form.reset()
      onOpenChange(false)
    } catch (error: unknown) {
      logger.error('Brand operation failed', error, { operation: isEdit ? 'update' : 'create', brandName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to save brand'
      toast.error(message)
    }
  }

  const loading = creating || updating

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the brand here. ' : 'Create new brand here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='h-[26.25rem] w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='brand-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Name <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='BMW'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='slug'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Slug <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='bmw'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end pt-2'>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Brand description...'
                        className='col-span-4 resize-none'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4'>
                    <FormLabel className='col-span-2 text-end'>Active</FormLabel>
                    <div className='col-span-4 flex items-center gap-x-2'>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription className='!mt-0'>
                        {field.value ? 'Visible to users' : 'Hidden from users'}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isHighlighted'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4'>
                    <FormLabel className='col-span-2 text-end'>Highlighted</FormLabel>
                    <div className='col-span-4 flex items-center gap-x-2'>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription className='!mt-0'>
                        {field.value ? 'Featured brand' : 'Regular brand'}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isRecommended'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4'>
                    <FormLabel className='col-span-2 text-end'>Recommended</FormLabel>
                    <div className='col-span-4 flex items-center gap-x-2'>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription className='!mt-0'>
                        {field.value ? 'Recommended to users' : 'Not recommended'}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {!isEdit && (
                <>
                  <FormField
                    control={form.control}
                    name='legacySystemId'
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                        <FormLabel className='col-span-2 text-end text-muted-foreground'>
                          Legacy ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Optional'
                            className='col-span-4'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='legacySlug'
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                        <FormLabel className='col-span-2 text-end text-muted-foreground'>
                          Legacy Slug
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Optional'
                            className='col-span-4'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='brand-form' disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
