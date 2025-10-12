'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { Link } from '@tanstack/react-router'

export function GenerationsPrimaryButtons() {
  return (
    <div className='flex items-center gap-2'>
      <Link to='/generations/new'>
        <Button>
          <PlusIcon className='mr-2 h-4 w-4' />
          Add Generation
        </Button>
      </Link>
    </div>
  )
}
