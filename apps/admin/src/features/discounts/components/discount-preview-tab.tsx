import { useState, useMemo } from 'react'
import { Search, Percent, Tag, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DiscountTreeView } from './discount-tree-view'
import { type BrandDiscount, type DiscountStats, hasDiscount } from '../types'

interface DiscountPreviewTabProps {
  data: BrandDiscount[]
}

export function DiscountPreviewTab({ data }: DiscountPreviewTabProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate statistics
  const stats: DiscountStats = useMemo(() => {
    let totalDiscounts = 0
    let totalPercentage = 0
    let discountCount = 0
    let totalNominalValue = 0

    data.forEach((brand) => {
      if (hasDiscount(brand.discount)) {
        totalDiscounts++
        if (brand.discount?.percentage) {
          totalPercentage += brand.discount.percentage
          discountCount++
        }
        if (brand.discount?.nominal) {
          totalNominalValue += brand.discount.nominal
        }
      }

      brand.models.forEach((model) => {
        if (hasDiscount(model.discount)) {
          totalDiscounts++
          if (model.discount?.percentage) {
            totalPercentage += model.discount.percentage
            discountCount++
          }
          if (model.discount?.nominal) {
            totalNominalValue += model.discount.nominal
          }
        }

        model.trims.forEach((trim) => {
          if (hasDiscount(trim.discount)) {
            totalDiscounts++
            if (trim.discount?.percentage) {
              totalPercentage += trim.discount.percentage
              discountCount++
            }
            if (trim.discount?.nominal) {
              totalNominalValue += trim.discount.nominal
            }
          }
        })
      })
    })

    return {
      totalDiscounts,
      averagePercentage: discountCount > 0 ? totalPercentage / discountCount : 0,
      totalNominalValue,
      activeBrands: data.filter((b) => hasDiscount(b.discount)).length,
    }
  }, [data])

  return (
    <div className='space-y-6'>
      {/* Statistics Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Celkem slev</CardTitle>
            <Tag className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalDiscounts}</div>
            <p className='text-xs text-muted-foreground'>
              Napříč všemi úrovněmi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Průměrná sleva
            </CardTitle>
            <Percent className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {stats.averagePercentage.toFixed(1)}%
            </div>
            <p className='text-xs text-muted-foreground'>
              Procentuální slevy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Nominální hodnota
            </CardTitle>
            <TrendingDown className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {stats.totalNominalValue.toLocaleString('cs-CZ')} Kč
            </div>
            <p className='text-xs text-muted-foreground'>
              Celková hodnota slev
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Aktivní značky
            </CardTitle>
            <Tag className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.activeBrands}</div>
            <p className='text-xs text-muted-foreground'>
              Značky se slevou
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Vyhledávání</CardTitle>
          <CardDescription>
            Filtrujte slevy podle značky, modelu nebo výbavy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Hledat podle názvu...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10'
            />
          </div>
        </CardContent>
      </Card>

      {/* Tree View */}
      <Card>
        <CardHeader>
          <CardTitle>Hierarchie slev</CardTitle>
          <CardDescription>
            Slevy se kumulují od značky přes model až po konkrétní výbavu/motorizaci
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DiscountTreeView data={data} searchQuery={searchQuery} />
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className='border-blue-500/50 bg-blue-500/5'>
        <CardHeader>
          <CardTitle className='text-base'>Jak fungují slevy?</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 text-sm'>
          <p>
            <strong>Přímá sleva:</strong> Sleva platící přímo na danou úroveň
            (značka, model, výbava)
          </p>
          <p>
            <strong>Celková sleva:</strong> Kumulovaná sleva od všech nadřazených
            úrovní
          </p>
          <p>
            <strong>Kombinace slev:</strong> Procentuální a nominální slevy se
            sčítají napříč všemi úrovněmi
          </p>
          <p className='text-muted-foreground text-xs mt-4'>
            Příklad: BMW má 20% slevu, 3 Series dalších 10%, model 320d pak 5% + 50 000 Kč.
            Celková sleva pro 320d je tedy 35% + 50 000 Kč.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
