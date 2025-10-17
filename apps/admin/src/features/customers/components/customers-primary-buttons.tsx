'use client'

import { Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CustomersPrimaryButtons() {
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export customers')
  }

  return (
    <div className='flex items-center gap-2'>
      <Button variant='outline' size='sm' onClick={handleExport}>
        <Download className='mr-2 h-4 w-4' />
        Exportovat
      </Button>
    </div>
  )
}
