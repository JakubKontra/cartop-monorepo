'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface EnumOption {
  value: string
  label: string
}

interface EnumSelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean
  /** Array of enum options with value and label */
  options: EnumOption[]
}

/**
 * EnumSelectField - Generic form field for selecting from enum values
 * Can be used for any enum type by providing options array
 *
 * @example
 * // Usage with CatalogBodyType enum
 * <EnumSelectField
 *   name="bodyType"
 *   label="Body Type"
 *   options={[
 *     { value: CatalogBodyType.Suv, label: 'SUV' },
 *     { value: CatalogBodyType.Sedan, label: 'Sedan' },
 *   ]}
 * />
 */
export function EnumSelectField({
  name,
  label = 'Select',
  placeholder = 'Select an option',
  description,
  disabled = false,
  required = false,
  options,
}: EnumSelectFieldProps) {
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
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
