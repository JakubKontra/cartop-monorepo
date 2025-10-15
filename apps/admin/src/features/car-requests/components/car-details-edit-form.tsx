'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BrandModelSelector } from '@/components/brand-model-selector'
import { Loader2 } from 'lucide-react'

const carDetailsSchema = z.object({
  brandId: z.string().optional(),
  modelId: z.string().optional(),
  financingType: z.enum(['cash', 'leasing']).default('cash'),
  leasingCompanyId: z.string().optional(),
})

export type CarDetailsFormValues = z.infer<typeof carDetailsSchema>

interface CarDetailsEditFormProps {
  defaultValues?: Partial<CarDetailsFormValues>
  loading?: boolean
  onSubmit: (values: CarDetailsFormValues) => void | Promise<void>
  onCancel: () => void
}

export function CarDetailsEditForm({
  defaultValues,
  loading = false,
  onSubmit,
  onCancel,
}: CarDetailsEditFormProps) {
  const form = useForm<CarDetailsFormValues>({
    resolver: zodResolver(carDetailsSchema),
    defaultValues: defaultValues || {
      brandId: '',
      modelId: '',
      financingType: 'cash',
      leasingCompanyId: '',
    },
  })

  const financingType = form.watch('financingType')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='financingType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Financing Type <span className='text-destructive'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select financing type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='cash'>Cash</SelectItem>
                  <SelectItem value='leasing'>Leasing</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <BrandModelSelector
          brandValue={form.watch('brandId')}
          modelValue={form.watch('modelId')}
          onBrandChange={(value) => form.setValue('brandId', value)}
          onModelChange={(value) => form.setValue('modelId', value)}
        />

        {financingType === 'leasing' && (
          <FormField
            control={form.control}
            name='leasingCompanyId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leasing Company</FormLabel>
                <FormControl>
                  <Input placeholder='Leasing Company ID' {...field} />
                </FormControl>
                <FormDescription>
                  TODO: Replace with selector component
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className='flex items-center justify-end gap-4 pt-4'>
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
            Update Car Details
          </Button>
        </div>
      </form>
    </Form>
  )
}
