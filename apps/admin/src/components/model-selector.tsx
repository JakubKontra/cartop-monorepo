'use client'

import { useQuery } from '@apollo/client/react'
import { useEffect, useMemo } from 'react'
import { SelectDropdown } from '@/components/select-dropdown'
import { GET_ALL_CATALOG_MODELS } from '@/features/models/models.graphql'

interface ModelSelectorProps {
  value?: string
  onChange: (modelId: string) => void
  brandId?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

/**
 * ModelSelector - Model selection component with optional brand filtering
 *
 * If brandId is provided: filters models to show only models from that brand
 * If no brandId: shows all models with "Brand - Model" format
 */
export function ModelSelector({
  value,
  onChange,
  brandId,
  placeholder = 'Select a model',
  disabled = false,
  className,
}: ModelSelectorProps) {
  const { data: modelsData, loading: loadingModels } = useQuery(GET_ALL_CATALOG_MODELS, {
    variables: { limit: 1000, offset: 0 },
  })

  const models = modelsData?.allCatalogModels || []

  // Filter models by brand if brandId is provided
  const filteredModels = useMemo(() => {
    if (!brandId) {
      return models
    }
    return models.filter((model) => model.brandId === brandId)
  }, [models, brandId])

  // Reset selection when brand changes and current selection is no longer valid
  useEffect(() => {
    if (value && brandId) {
      const isCurrentModelValid = filteredModels.some((model) => model.id === value)
      if (!isCurrentModelValid) {
        onChange('')
      }
    }
  }, [brandId, filteredModels, value, onChange])

  // Format label based on whether brand is selected
  const getModelLabel = (model: typeof models[0]) => {
    if (brandId) {
      // Brand is selected, show only model name
      return model.name
    }
    // No brand selected, show "Brand - Model"
    return `${model.brand?.name || 'Unknown'} - ${model.name}`
  }

  return (
    <SelectDropdown
      defaultValue={value}
      onValueChange={onChange}
      placeholder={loadingModels ? 'Loading models...' : placeholder}
      disabled={disabled || loadingModels}
      items={filteredModels.map((model) => ({
        label: getModelLabel(model),
        value: model.id,
      }))}
      className={className}
      isControlled
    />
  )
}
