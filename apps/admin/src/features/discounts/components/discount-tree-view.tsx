import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiscountCard } from './discount-card'
import { type BrandDiscount } from '../types'

interface DiscountTreeViewProps {
  data: BrandDiscount[]
  searchQuery?: string
}

export function DiscountTreeView({
  data,
  searchQuery = '',
}: DiscountTreeViewProps) {
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set())
  const [expandedModels, setExpandedModels] = useState<Set<string>>(new Set())

  const toggleBrand = (brandId: string) => {
    const newSet = new Set(expandedBrands)
    if (newSet.has(brandId)) {
      newSet.delete(brandId)
      // Also collapse all models of this brand
      data
        .find((b) => b.id === brandId)
        ?.models.forEach((m) => {
          const modelKey = `${brandId}-${m.id}`
          const modelsSet = new Set(expandedModels)
          modelsSet.delete(modelKey)
          setExpandedModels(modelsSet)
        })
    } else {
      newSet.add(brandId)
    }
    setExpandedBrands(newSet)
  }

  const toggleModel = (brandId: string, modelId: string) => {
    const modelKey = `${brandId}-${modelId}`
    const newSet = new Set(expandedModels)
    if (newSet.has(modelKey)) {
      newSet.delete(modelKey)
    } else {
      newSet.add(modelKey)
    }
    setExpandedModels(newSet)
  }

  const expandAll = () => {
    const allBrands = new Set(data.map((b) => b.id))
    const allModels = new Set(
      data.flatMap((b) => b.models.map((m) => `${b.id}-${m.id}`))
    )
    setExpandedBrands(allBrands)
    setExpandedModels(allModels)
  }

  const collapseAll = () => {
    setExpandedBrands(new Set())
    setExpandedModels(new Set())
  }

  // Filter data based on search query
  const filteredData = data
    .map((brand) => ({
      ...brand,
      models: brand.models
        .map((model) => ({
          ...model,
          trims: model.trims.filter(
            (trim) =>
              trim.trimName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              trim.engineType.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(
          (model) =>
            model.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.trims.length > 0
        ),
    }))
    .filter(
      (brand) =>
        brand.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.models.length > 0
    )

  const hasResults = filteredData.length > 0

  return (
    <div className='space-y-4'>
      {/* Expand/Collapse Controls */}
      <div className='flex items-center justify-between'>
        <div className='text-sm text-muted-foreground'>
          {filteredData.length} značek
          {searchQuery && ` (filtrováno podle: "${searchQuery}")`}
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={expandAll}
            disabled={!hasResults}
          >
            Rozbalit vše
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={collapseAll}
            disabled={!hasResults}
          >
            Sbalit vše
          </Button>
        </div>
      </div>

      {/* Tree Structure */}
      {!hasResults ? (
        <div className='text-center py-12 text-muted-foreground'>
          <p>Žádné výsledky nenalezeny</p>
          {searchQuery && (
            <p className='text-sm mt-2'>
              Zkuste změnit vyhledávací dotaz
            </p>
          )}
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredData.map((brand) => (
            <div key={brand.id} className='space-y-2'>
              {/* Brand Level */}
              <div className='flex items-start gap-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => toggleBrand(brand.id)}
                  className='h-8 w-8 p-0 mt-2'
                >
                  {expandedBrands.has(brand.id) ? (
                    <ChevronDown className='h-4 w-4' />
                  ) : (
                    <ChevronRight className='h-4 w-4' />
                  )}
                </Button>
                <div className='flex-1'>
                  <DiscountCard
                    title={brand.brandName}
                    subtitle={`${brand.models.length} modelů`}
                    discount={brand.discount}
                    level='brand'
                  />
                </div>
              </div>

              {/* Models Level */}
              {expandedBrands.has(brand.id) && (
                <div className='ml-12 space-y-2'>
                  {brand.models.map((model) => (
                    <div key={model.id} className='space-y-2'>
                      <div className='flex items-start gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => toggleModel(brand.id, model.id)}
                          className='h-8 w-8 p-0 mt-2'
                        >
                          {expandedModels.has(`${brand.id}-${model.id}`) ? (
                            <ChevronDown className='h-4 w-4' />
                          ) : (
                            <ChevronRight className='h-4 w-4' />
                          )}
                        </Button>
                        <div className='flex-1'>
                          <DiscountCard
                            title={model.modelName}
                            subtitle={`${model.trims.length} výbav / motorizací`}
                            discount={model.discount}
                            effectiveDiscount={model.effectiveDiscount}
                            level='model'
                          />
                        </div>
                      </div>

                      {/* Trims Level */}
                      {expandedModels.has(`${brand.id}-${model.id}`) && (
                        <div className='ml-12 space-y-2'>
                          {model.trims.map((trim) => (
                            <DiscountCard
                              key={trim.id}
                              title={trim.trimName}
                              subtitle={`${trim.engineType} • ${trim.power}`}
                              discount={trim.discount}
                              effectiveDiscount={trim.effectiveDiscount}
                              level='trim'
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
