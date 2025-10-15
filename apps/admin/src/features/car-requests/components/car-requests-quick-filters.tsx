'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CAR_REQUEST_STATES,
  getAllStateCodes,
  type CarRequestStateCode,
} from '../constants/states'

interface CarRequestsQuickFiltersProps {
  activeFilter: CarRequestStateCode | null
  onFilterChange: (filter: CarRequestStateCode | null) => void
  counts?: Partial<Record<CarRequestStateCode, number>>
}

export function CarRequestsQuickFilters({
  activeFilter,
  onFilterChange,
  counts,
}: CarRequestsQuickFiltersProps) {
  const stateCodes = getAllStateCodes()

  return (
    <div className='flex flex-wrap gap-2'>
      {stateCodes.map((code) => {
        const state = CAR_REQUEST_STATES[code]
        const Icon = state.icon
        const isActive = activeFilter === code
        const count = counts?.[code]

        return (
          <Button
            key={code}
            variant={isActive ? 'default' : 'outline'}
            size='sm'
            onClick={() => onFilterChange(isActive ? null : code)}
            className={cn(
              'h-9 gap-2',
              !isActive && 'hover:bg-opacity-10',
              isActive && 'shadow-md'
            )}
            style={{
              borderColor: !isActive ? state.colorHex : undefined,
              backgroundColor: isActive ? state.colorHex : undefined,
              color: isActive ? 'white' : state.colorHex,
            }}
          >
            <Icon className='h-4 w-4' />
            <span className='font-medium'>{state.name}</span>
            {count !== undefined && (
              <Badge
                variant={isActive ? 'secondary' : 'outline'}
                className='ml-1 h-5 min-w-[20px] px-1'
                style={{
                  borderColor: isActive ? undefined : state.colorHex,
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : undefined,
                  color: isActive ? 'white' : state.colorHex,
                }}
              >
                {count}
              </Badge>
            )}
          </Button>
        )
      })}

      {activeFilter && (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => onFilterChange(null)}
          className='h-9 gap-1 text-muted-foreground'
        >
          <X className='h-4 w-4' />
          <span>Zrušit filtr</span>
        </Button>
      )}
    </div>
  )
}
