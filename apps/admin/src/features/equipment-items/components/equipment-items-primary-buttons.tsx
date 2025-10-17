'use client'

import { Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EquipmentItemsPrimaryButtons() {
  return (
    <Link to='/equipment-items/new'>
      <Button>
        <PlusIcon className='mr-2 h-4 w-4' />
        Add Equipment Item
      </Button>
    </Link>
  )
}
