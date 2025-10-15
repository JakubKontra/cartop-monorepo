'use client'

import { useFormContext } from 'react-hook-form'
import { BrandSelector } from '@/components/brand-selector'
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface BrandSelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean
}

/**
 * BrandSelectField - Form field for selecting a brand
 * Wraps the existing BrandSelector component for use in react-hook-form
 */
export function BrandSelectField({
  name,
  label = 'Brand',
  placeholder = 'Select a brand',
  description,
  disabled = false,
  required = false,
}: BrandSelectFieldProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className='text-destructive'> *</span>}
          </FormLabel>
          <BrandSelector
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
