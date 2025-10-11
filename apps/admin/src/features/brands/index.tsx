'use client'

import { BrandsProvider } from './components/brands-provider'
import { BrandsTable } from './components/brands-table'
import { BrandsDialogs } from './components/brands-dialogs'
import { BrandsPrimaryButtons } from './components/brands-primary-buttons'

export default function BrandsPage() {
  return (
    <BrandsProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Brands</h1>
            <p className='text-muted-foreground'>
              Manage vehicle brands across your catalog
            </p>
          </div>
          <BrandsPrimaryButtons />
        </div>
        <BrandsTable />
        <BrandsDialogs />
      </div>
    </BrandsProvider>
  )
}
