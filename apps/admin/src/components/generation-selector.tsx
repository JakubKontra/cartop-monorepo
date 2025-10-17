'use client'

import { useQuery } from '@apollo/client/react'
import { useEffect, useMemo } from 'react'
import { SelectDropdown } from '@/components/select-dropdown'
import { GET_ALL_CATALOG_MODEL_GENERATIONS } from '@/features/generations/generations.graphql'

interface GenerationSelectorProps {
  value?: string
  onChange: (generationId: string) => void
  modelId?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

/**
 * GenerationSelector - Generation selection component with optional model filtering
 *
 * If modelId is provided: filters generations to show only generations from that model
 * If no modelId: shows all generations with "Brand Model - Generation" format
 */
export function GenerationSelector({
  value,
  onChange,
  modelId,
  placeholder = 'Select a generation',
  disabled = false,
  className,
}: GenerationSelectorProps) {
  const { data: generationsData, loading: loadingGenerations } = useQuery(
    GET_ALL_CATALOG_MODEL_GENERATIONS,
    {
      variables: { limit: 1000, offset: 0 },
    }
  )

  const generations = generationsData?.catalogModelGenerations || []

  // Filter generations by model if modelId is provided
  const filteredGenerations = useMemo(() => {
    if (!modelId) {
      return generations
    }
    return generations.filter((generation) => generation.modelId === modelId)
  }, [generations, modelId])

  // Reset selection when model changes and current selection is no longer valid
  useEffect(() => {
    if (value && modelId) {
      const isCurrentGenerationValid = filteredGenerations.some((gen) => gen.id === value)
      if (!isCurrentGenerationValid) {
        onChange('')
      }
    }
  }, [modelId, filteredGenerations, value, onChange])

  // Format label based on whether model is selected
  const getGenerationLabel = (generation: typeof generations[0]) => {
    if (modelId) {
      // Model is selected, show only generation name
      return generation.name
    }
    // No model selected, show "Brand Model - Generation"
    const brand = generation.model?.brand?.name || 'Unknown'
    const model = generation.model?.name || 'Unknown'
    return `${brand} ${model} - ${generation.name}`
  }

  return (
    <SelectDropdown
      defaultValue={value}
      onValueChange={onChange}
      placeholder={loadingGenerations ? 'Loading generations...' : placeholder}
      disabled={disabled || loadingGenerations}
      items={filteredGenerations.map((generation) => ({
        label: getGenerationLabel(generation),
        value: generation.id,
      }))}
      className={className}
      isControlled
    />
  )
}
