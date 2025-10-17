'use client'

import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function OffersPrimaryButtons() {
  return (
    <Link to='/offers/new'>
      <Button>
        <Plus className='mr-2 h-4 w-4' />
        Přidat nabídku
      </Button>
    </Link>
  )
}
