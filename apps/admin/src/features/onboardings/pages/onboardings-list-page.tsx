'use client'

import { useState } from 'react'
import { OnboardingsTable } from '../components/onboardings-table'
import { CreateOnboardingDialog } from '../components/create-onboarding-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function OnboardingsListPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Onboardings</h1>
            <p className='text-muted-foreground'>
              Manage customer onboarding sessions and document uploads
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Create Onboarding
          </Button>
        </div>
        <OnboardingsTable />
      </div>

      <CreateOnboardingDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </>
  )
}
