'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@apollo/client/react'
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
import {
  CREATE_BRAND_EQUIPMENT,
  UPDATE_BRAND_EQUIPMENT,
  GET_ALL_BRAND_EQUIPMENTS,
} from '@/features/brand-equipment/brand-equipment.graphql'
import { logger } from '@/lib/logger'

const equipmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
})

type EquipmentFormValues = z.infer<typeof equipmentSchema>

interface BrandEquipmentFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brandId: string
  equipment?: any
}

export function BrandEquipmentFormDialog({
  open,
  onOpenChange,
  brandId,
  equipment,
}: BrandEquipmentFormDialogProps) {
  const isEdit = !!equipment

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  useEffect(() => {
    if (equipment) {
      form.reset({
        name: equipment.name,
        description: equipment.description || '',
      })
    } else {
      form.reset({
        name: '',
        description: '',
      })
    }
  }, [equipment, form])

  const [createEquipment, { loading: creating }] = useMutation(CREATE_BRAND_EQUIPMENT, {
    refetchQueries: [
      { query: GET_ALL_BRAND_EQUIPMENTS, variables: { brandId, limit: 100, offset: 0 } },
    ],
  })

  const [updateEquipment, { loading: updating }] = useMutation(UPDATE_BRAND_EQUIPMENT, {
    refetchQueries: [
      { query: GET_ALL_BRAND_EQUIPMENTS, variables: { brandId, limit: 100, offset: 0 } },
    ],
  })

  const loading = creating || updating

  const onSubmit = async (values: EquipmentFormValues) => {
    try {
      const input = {
        name: values.name,
        description: values.description || undefined,
        brandId,
      }

      if (isEdit) {
        await updateEquipment({
          variables: { id: equipment.id, input },
        })
        toast.success('Equipment category updated successfully')
      } else {
        await createEquipment({
          variables: { input },
        })
        toast.success('Equipment category created successfully')
      }

      onOpenChange(false)
      form.reset()
    } catch (error: unknown) {
      logger.error(`Equipment ${isEdit ? 'update' : 'creation'} failed`, error, {
        brandId,
        equipmentName: values.name,
      })
      const message =
        error instanceof Error
          ? error.message
          : `Failed to ${isEdit ? 'update' : 'create'} equipment category`
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Equipment Category' : 'Create Equipment Category'}
          </DialogTitle>
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
                    <Input placeholder='e.g., Safety Equipment, Comfort Package' {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the equipment category
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
                      placeholder='Brief description of this equipment category...'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Category'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
