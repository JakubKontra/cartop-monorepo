'use client'

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { equipmentItemSchema, type EquipmentItemFormValues } from '../data/schema'

interface EquipmentItemFormProps {
  defaultValues?: Partial<EquipmentItemFormValues>
  isEdit?: boolean
  loading?: boolean
  onSubmit: (values: EquipmentItemFormValues) => void
  onCancel: () => void
}

export function EquipmentItemForm({
  defaultValues,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
}: EquipmentItemFormProps) {
  const form = useForm<EquipmentItemFormValues>({
    resolver: zodResolver(equipmentItemSchema),
    defaultValues: defaultValues || {
      name: '',
      legacySystemId: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., Heated Seats, Navigation System' {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the equipment item as it will appear to users
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Legacy System */}
        {!isEdit && (
          <Card>
            <CardHeader>
              <CardTitle>Legacy System (Optional)</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='legacySystemId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legacy System ID</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g., LS-12345' {...field} />
                    </FormControl>
                    <FormDescription>
                      ID from the legacy system (for migration purposes only)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Form Actions */}
        <div className='flex justify-end gap-4'>
          <Button type='button' variant='outline' onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type='submit' disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Equipment Item'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
