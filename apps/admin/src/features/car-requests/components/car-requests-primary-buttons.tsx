import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function CarRequestsPrimaryButtons() {
  return (
    <div className='flex items-center gap-2'>
      <Link to='/car-requests/new'>
        <Button size='sm'>
          <Plus className='h-4 w-4' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            New Request
          </span>
        </Button>
      </Link>
    </div>
  )
}
