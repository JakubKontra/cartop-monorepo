'use client'

import { DocumentTemplatesTable } from '../components/document-templates-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export default function DocumentTemplatesListPage() {
  const navigate = useNavigate()

  return (
    <div className='flex h-full flex-1 flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Document Templates</h1>
          <p className='text-muted-foreground'>
            Configure document requirements for leasing companies
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: '/document-templates/new' })}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Template
        </Button>
      </div>
      <DocumentTemplatesTable />
    </div>
  )
}
