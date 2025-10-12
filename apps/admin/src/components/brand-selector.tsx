'use client'

import { useQuery } from '@apollo/client/react'
import { SelectDropdown } from '@/components/select-dropdown'
import { GET_ALL_CATALOG_BRANDS } from '@/features/brands/brands.graphql'

interface BrandSelectorProps {
  value?: string
  onChange: (brandId: string) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

/**
 * BrandSelector - Standalone brand selection component
 * Fetches all brands and allows selection from a dropdown
 */
export function BrandSelector({
  value,
  onChange,
  placeholder = 'Select a brand',
  disabled = false,
  className,
}: BrandSelectorProps) {
  const { data: brandsData, loading: loadingBrands } = useQuery(GET_ALL_CATALOG_BRANDS, {
    variables: { limit: 1000, offset: 0 },
  })

  const brands = brandsData?.allCatalogBrands || []

  return (
    <SelectDropdown
      defaultValue={value}
      onValueChange={onChange}
      placeholder={loadingBrands ? 'Loading brands...' : placeholder}
      disabled={disabled || loadingBrands}
      items={brands.map((brand) => ({
        label: brand.name,
        value: brand.id,
      }))}
      className={className}
      isControlled
    />
  )
}
