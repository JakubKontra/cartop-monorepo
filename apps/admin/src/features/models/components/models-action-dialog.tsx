'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@apollo/client/react'
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
import { SelectDropdown } from '@/components/select-dropdown'
import { modelSchema, type ModelFormValues } from '../data/schema'
import { type Model } from '../types'
import { CREATE_CATALOG_MODEL, UPDATE_CATALOG_MODEL, GET_ALL_CATALOG_MODELS } from '../models.graphql'
import { GET_ALL_CATALOG_BRANDS } from '../../brands/brands.graphql'
import { Loader2 } from 'lucide-react'
import { logger } from '@/lib/logger'

type ModelActionDialogProps = {
  currentRow?: Model
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ModelsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ModelActionDialogProps) {
  const isEdit = !!currentRow

  const { data: brandsData } = useQuery(GET_ALL_CATALOG_BRANDS, {
    variables: { limit: 1000, offset: 0 },
  })

  const brands = brandsData?.allCatalogBrands || []

  const [createModel, { loading: creating }] = useMutation(CREATE_CATALOG_MODEL, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODELS, variables: { limit: 1000, offset: 0 } }],
  })

  const [updateModel, { loading: updating }] = useMutation(UPDATE_CATALOG_MODEL, {
    refetchQueries: [{ query: GET_ALL_CATALOG_MODELS, variables: { limit: 1000, offset: 0 } }],
  })

  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues: isEdit
      ? {
          name: currentRow.name,
          slug: currentRow.slug,
          description: currentRow.description || '',
          brandId: currentRow.brandId,
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
          brandId: '',
          isActive: false,
          isHighlighted: false,
          isRecommended: false,
          legacySystemId: '',
          legacySlug: '',
        },
  })

  const onSubmit = async (values: ModelFormValues) => {
    try {
      if (isEdit) {
        await updateModel({
          variables: {
            id: currentRow.id,
            input: {
              name: values.name,
              slug: values.slug,
              description: values.description || null,
              brandId: values.brandId,
              isActive: values.isActive,
              isHighlighted: values.isHighlighted,
              isRecommended: values.isRecommended,
            },
          },
        })
        toast.success('Model updated successfully')
      } else {
        await createModel({
          variables: {
            input: {
              name: values.name,
              slug: values.slug,
              description: values.description || null,
              brandId: values.brandId,
              isActive: values.isActive,
              isHighlighted: values.isHighlighted,
              isRecommended: values.isRecommended,
              legacySystemId: values.legacySystemId || null,
              legacySlug: values.legacySlug || null,
            },
          },
        })
        toast.success('Model created successfully')
      }
      form.reset()
      onOpenChange(false)
    } catch (error: unknown) {
      logger.error('Model operation failed', error, { operation: isEdit ? 'update' : 'create', modelName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to save model'
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
          <DialogTitle>{isEdit ? 'Edit Model' : 'Add New Model'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the model here. ' : 'Create new model here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='h-[26.25rem] w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='model-form'
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
                        placeholder='3-series'
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
                name='brandId'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Brand <span className='text-destructive'>*</span>
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a brand'
                      className='col-span-4'
                      items={brands.map((brand) => ({
                        label: brand.name,
                        value: brand.id,
                      }))}
                    />
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
                        placeholder='Model description...'
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
                        {field.value ? 'Featured model' : 'Regular model'}
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
          <Button type='submit' form='model-form' disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
