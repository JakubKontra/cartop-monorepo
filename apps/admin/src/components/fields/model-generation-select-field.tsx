'use client'

import { useQuery } from '@apollo/client/react'
import { useFormContext } from 'react-hook-form'
import { useMemo, useEffect } from 'react'
import { SelectDropdown } from '@/components/select-dropdown'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { GET_ALL_CATALOG_MODEL_GENERATIONS } from '@/features/generations/generations.graphql'

interface ModelGenerationSelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean
  /** Optional model ID to filter generations */
  modelId?: string
}

/**
 * ModelGenerationSelectField - Form field for selecting a model generation
 * Fetches all generations and optionally filters by model
 */
export function ModelGenerationSelectField({
  name,
  label = 'Generation',
  placeholder = 'Select a generation',
  description,
  disabled = false,
  required = false,
  modelId,
}: ModelGenerationSelectFieldProps) {
  const form = useFormContext()

  const { data: generationsData, loading: loadingGenerations } = useQuery(
    GET_ALL_CATALOG_MODEL_GENERATIONS,
    {
      variables: { limit: 1000, offset: 0, modelId },
    }
  )

  // Filter generations by model if modelId is provided
  const filteredGenerations = useMemo(() => {
    const generations = generationsData?.catalogModelGenerations || []
    if (!modelId) {
      return generations
    }
    return generations.filter((generation) => generation.modelId === modelId)
  }, [generationsData?.catalogModelGenerations, modelId])

  // Reset selection when model changes and current selection is no longer valid
  useEffect(() => {
    const currentValue = form.getValues(name)
    if (currentValue && modelId) {
      const isCurrentGenerationValid = filteredGenerations.some(
        (generation) => generation.id === currentValue
      )
      if (!isCurrentGenerationValid) {
        form.setValue(name, '')
      }
    }
  }, [modelId, filteredGenerations, name, form])

  // Format label based on whether model is selected
  const getGenerationLabel = (
    generation: NonNullable<typeof generationsData>['catalogModelGenerations'][0]
  ) => {
    if (modelId) {
      // Model is selected, show only generation name
      return generation.name
    }
    // No model selected, show "Brand - Model - Generation"
    const brandName = generation.brand?.name || 'Unknown'
    const modelName = generation.model?.name || 'Unknown'
    return `${brandName} - ${modelName} - ${generation.name}`
  }

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
          <FormControl>
            <SelectDropdown
              defaultValue={field.value}
              onValueChange={field.onChange}
              placeholder={loadingGenerations ? 'Loading generations...' : placeholder}
              disabled={disabled || loadingGenerations}
              items={filteredGenerations.map((generation) => ({
                label: getGenerationLabel(generation),
                value: generation.id,
              }))}
              isControlled
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
