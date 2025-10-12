'use client'

import { BrandSelector } from '@/components/brand-selector'
import { ModelSelector } from '@/components/model-selector'
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface BrandModelSelectorProps {
  /** Selected brand ID */
  selectedBrandId?: string
  /** Selected model ID */
  selectedModelId?: string
  /** Callback when brand changes */
  onBrandChange: (brandId: string) => void
  /** Callback when model changes */
  onModelChange: (modelId: string) => void
  /** Whether brand selection is required */
  brandRequired?: boolean
  /** Whether model selection is required */
  modelRequired?: boolean
  /** Custom labels and descriptions */
  labels?: {
    brand?: string
    model?: string
    brandDescription?: string
    modelDescription?: string
  }
  /** Whether to disable the selectors */
  disabled?: boolean
}

/**
 * BrandModelSelector - Orchestrator component for brand and model selection
 *
 * Features:
 * - Cascading selection: when brand changes, model list is filtered
 * - Smart reset: model selection is cleared when brand changes if invalid
 * - Flexible: can be used with or without brand pre-selection
 * - Configurable: labels, descriptions, and requirements can be customized
 */
export function BrandModelSelector({
  selectedBrandId,
  selectedModelId,
  onBrandChange,
  onModelChange,
  brandRequired = false,
  modelRequired = true,
  labels = {},
  disabled = false,
}: BrandModelSelectorProps) {
  const {
    brand: brandLabel = 'Brand',
    model: modelLabel = 'Model',
    brandDescription: brandDesc = 'Select the brand (optional, filters models)',
    modelDescription: modelDesc = 'The model this generation belongs to',
  } = labels

  return (
    <div className='space-y-6'>
      {/* Brand Selector */}
      <FormItem>
        <FormLabel>
          {brandLabel}
          {brandRequired && <span className='text-destructive'> *</span>}
        </FormLabel>
        <FormControl>
          <BrandSelector
            value={selectedBrandId}
            onChange={onBrandChange}
            placeholder='Select a brand (optional)'
            disabled={disabled}
          />
        </FormControl>
        <FormDescription>{brandDesc}</FormDescription>
        <FormMessage />
      </FormItem>

      {/* Model Selector */}
      <FormItem>
        <FormLabel>
          {modelLabel}
          {modelRequired && <span className='text-destructive'> *</span>}
        </FormLabel>
        <FormControl>
          <ModelSelector
            value={selectedModelId}
            onChange={onModelChange}
            brandId={selectedBrandId}
            placeholder={
              selectedBrandId
                ? 'Select a model from the chosen brand'
                : 'Select a model (or select a brand first to filter)'
            }
            disabled={disabled}
          />
        </FormControl>
        <FormDescription>{modelDesc}</FormDescription>
        <FormMessage />
      </FormItem>
    </div>
  )
}
