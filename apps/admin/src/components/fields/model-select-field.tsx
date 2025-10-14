'use client'

import { useFormContext } from 'react-hook-form'
import { ModelSelector } from '@/components/model-selector'
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface ModelSelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean
  /** Optional brand ID to filter models */
  brandId?: string
}

/**
 * ModelSelectField - Form field for selecting a model
 * Wraps the existing ModelSelector component for use in react-hook-form
 * Can optionally filter by brand
 */
export function ModelSelectField({
  name,
  label = 'Model',
  placeholder = 'Select a model',
  description,
  disabled = false,
  required = false,
  brandId,
}: ModelSelectFieldProps) {
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
          <ModelSelector
            value={field.value}
            onChange={field.onChange}
            brandId={brandId}
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
