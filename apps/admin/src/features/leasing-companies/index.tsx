'use client'

import { LeasingCompaniesTable } from './components/leasing-companies-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export default function LeasingCompaniesPage() {
  const navigate = useNavigate()

  return (
    <div className='flex h-full flex-1 flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Leasing Companies</h1>
          <p className='text-muted-foreground'>
            Manage leasing companies for your vehicle offers
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: '/leasing-companies/new' })}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Leasing Company
        </Button>
      </div>
      <LeasingCompaniesTable />
    </div>
  )
}
