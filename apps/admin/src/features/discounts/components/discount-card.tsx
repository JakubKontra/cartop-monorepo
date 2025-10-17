import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Percent, Tag, TrendingDown } from 'lucide-react'
import { type DiscountAmount, formatDiscount, hasDiscount } from '../types'

interface DiscountCardProps {
  title: string
  subtitle?: string
  discount?: DiscountAmount
  effectiveDiscount?: DiscountAmount
  level: 'brand' | 'model' | 'trim'
  className?: string
}

export function DiscountCard({
  title,
  subtitle,
  discount,
  effectiveDiscount,
  level,
  className = '',
}: DiscountCardProps) {
  const levelColors = {
    brand: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    model: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
    trim: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  }

  const levelLabels = {
    brand: 'Značka',
    model: 'Model',
    trim: 'Výbava / Motorizace',
  }

  const levelIcons = {
    brand: Tag,
    model: TrendingDown,
    trim: Percent,
  }

  const Icon = levelIcons[level]
  const hasDirectDiscount = hasDiscount(discount)
  const hasEffectiveDiscount = hasDiscount(effectiveDiscount)

  return (
    <Card className={`${className} border-l-4 ${levelColors[level]}`}>
      <CardContent className='p-4'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex-1 space-y-1'>
            <div className='flex items-center gap-2'>
              <Icon className='h-4 w-4' />
              <span className='text-xs font-medium text-muted-foreground'>
                {levelLabels[level]}
              </span>
            </div>
            <h3 className='font-semibold'>{title}</h3>
            {subtitle && (
              <p className='text-sm text-muted-foreground'>{subtitle}</p>
            )}
          </div>

          <div className='text-right space-y-2'>
            {hasDirectDiscount && (
              <div>
                <div className='text-xs text-muted-foreground mb-1'>
                  Přímá sleva
                </div>
                <Badge variant='outline' className='font-mono'>
                  {formatDiscount(discount)}
                </Badge>
              </div>
            )}

            {hasEffectiveDiscount && level !== 'brand' && (
              <div>
                <div className='text-xs text-muted-foreground mb-1'>
                  Celková sleva
                </div>
                <Badge className='font-mono bg-primary'>
                  {formatDiscount(effectiveDiscount)}
                </Badge>
              </div>
            )}

            {!hasDirectDiscount && !hasEffectiveDiscount && (
              <Badge variant='secondary'>Bez slevy</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
