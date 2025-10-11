import { useNavigate } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BrandsPrimaryButtons() {
  const navigate = useNavigate()

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => navigate({ to: '/brands/new' })}>
        <span>Add Brand</span> <Plus size={18} />
      </Button>
    </div>
  )
}
