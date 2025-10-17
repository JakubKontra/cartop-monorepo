'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'

export function EnginesPrimaryButtons() {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate({ to: '/engines/new' })}>
      <Plus className='mr-2 h-4 w-4' />
      Create New Engine
    </Button>
  )
}
