'use client'

import { Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ColorsPrimaryButtons() {
  return (
    <Link to='/colors/new'>
      <Button>
        <PlusIcon className='mr-2 h-4 w-4' />
        Add Color
      </Button>
    </Link>
  )
}
