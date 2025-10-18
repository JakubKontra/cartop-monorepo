'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@apollo/client/react'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CREATE_CATALOG_EQUIPMENT,
  UPDATE_CATALOG_EQUIPMENT,
} from '../catalog-equipment.graphql'
import { logger } from '@/lib/logger'
import { graphql } from '@/gql'

// Query for equipment item categories
const GET_EQUIPMENT_ITEM_CATEGORIES = graphql(`
  query GetEquipmentItemCategories($limit: Float!, $offset: Float!) {
    catalogEquipmentItemCategories(limit: $limit, offset: $offset) {
      id
      name
    }
  }
`)

const equipmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  customText: z.string().optional(),
  categoryId: z.string().optional(),
  active: z.boolean().default(true),
  standard: z.boolean().default(false),
})

type EquipmentFormValues = z.infer<typeof equipmentSchema>

interface CatalogEquipmentFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  modelGenerationId: string
  equipment?: any
  onSuccess?: () => void
}

export function CatalogEquipmentFormDialog({
  open,
  onOpenChange,
  modelGenerationId,
  equipment,
  onSuccess,
}: CatalogEquipmentFormDialogProps) {
  const isEdit = !!equipment

  const { data: categoriesData } = useQuery(GET_EQUIPMENT_ITEM_CATEGORIES, {
    variables: { limit: 100, offset: 0 },
  })

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: '',
      customText: '',
      categoryId: '',
      active: true,
      standard: false,
    },
  })

  useEffect(() => {
    if (equipment) {
      form.reset({
        name: equipment.name,
        customText: equipment.customText || '',
        categoryId: equipment.categoryId || '',
        active: equipment.active ?? true,
        standard: equipment.standard ?? false,
      })
    } else {
      form.reset({
        name: '',
        customText: '',
        categoryId: '',
        active: true,
        standard: false,
      })
    }
  }, [equipment, form])

  const [createEquipment, { loading: creating }] = useMutation(CREATE_CATALOG_EQUIPMENT)

  const [updateEquipment, { loading: updating }] = useMutation(UPDATE_CATALOG_EQUIPMENT)

  const loading = creating || updating

  const onSubmit = async (values: EquipmentFormValues) => {
    try {
      const input = {
        name: values.name,
        customText: values.customText || undefined,
        modelGenerationId,
        categoryId: values.categoryId || undefined,
        active: values.active,
        standard: values.standard,
      }

      if (isEdit) {
        await updateEquipment({
          variables: { id: equipment.id, input },
        })
        toast.success('Equipment updated successfully')
      } else {
        await createEquipment({
          variables: { input },
        })
        toast.success('Equipment created successfully')
      }

      onSuccess?.()
      form.reset()
    } catch (error: unknown) {
      logger.error(`Equipment ${isEdit ? 'update' : 'creation'} failed`, error, {
        modelGenerationId,
        equipmentName: values.name,
      })
      const message =
        error instanceof Error
          ? error.message
          : `Failed to ${isEdit ? 'update' : 'create'} equipment`
      toast.error(message)
    }
  }

  const categories = categoriesData?.catalogEquipmentItemCategories || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Equipment' : 'Create Equipment'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., Premium Equipment, Sport Package' {...field} />
                  </FormControl>
                  <FormDescription>The name of the equipment</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='customText'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Additional description or notes...'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional custom text for this equipment</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category (optional)' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Optional equipment category</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='active'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                    <div className='space-y-0.5'>
                      <FormLabel>Active</FormLabel>
                      <FormDescription className='text-xs'>
                        Show this equipment
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='standard'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                    <div className='space-y-0.5'>
                      <FormLabel>Standard</FormLabel>
                      <FormDescription className='text-xs'>
                        Standard equipment
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Equipment'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
