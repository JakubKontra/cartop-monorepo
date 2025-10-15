'use client'

import { LayoutGrid, Table } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ViewType = 'table' | 'kanban'

interface CarRequestsViewToggleProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
}

export function CarRequestsViewToggle({
  activeView,
  onViewChange,
}: CarRequestsViewToggleProps) {
  return (
    <div className='inline-flex items-center rounded-lg border bg-background p-1'>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => onViewChange('table')}
        className={cn(
          'h-8 px-3',
          activeView === 'table' && 'bg-muted'
        )}
      >
        <Table className='h-4 w-4 mr-2' />
        Table
      </Button>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => onViewChange('kanban')}
        className={cn(
          'h-8 px-3',
          activeView === 'kanban' && 'bg-muted'
        )}
      >
        <LayoutGrid className='h-4 w-4 mr-2' />
        Kanban
      </Button>
    </div>
  )
}
