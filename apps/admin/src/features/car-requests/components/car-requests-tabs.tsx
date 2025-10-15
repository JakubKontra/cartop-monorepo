'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  CAR_REQUEST_SECTIONS,
  type CarRequestSection,
} from '../constants/states'

interface CarRequestsTabsProps {
  activeSection: CarRequestSection
  onSectionChange: (section: CarRequestSection) => void
  counts?: Record<CarRequestSection, number>
}

export function CarRequestsTabs({
  activeSection,
  onSectionChange,
  counts,
}: CarRequestsTabsProps) {
  return (
    <Tabs
      value={activeSection}
      onValueChange={(value) => onSectionChange(value as CarRequestSection)}
      className='w-full'
    >
      <TabsList className='w-full justify-start'>
        {CAR_REQUEST_SECTIONS.map((section) => (
          <TabsTrigger
            key={section.key}
            value={section.key}
            className='flex items-center gap-2'
          >
            <span>{section.label}</span>
            {counts?.[section.key] !== undefined && (
              <Badge variant='secondary' className='ml-1'>
                {counts[section.key]}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
