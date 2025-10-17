'use client'

import { useQuery } from '@apollo/client/react'
import { Loader2, UserCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CustomersProvider } from './components/customers-provider'
import { CustomersTable } from './components/customers-table'
import { CustomersPrimaryButtons } from './components/customers-primary-buttons'
import { CustomersDialogs } from './components/customers-dialogs'
import { GET_ALL_CUSTOMERS } from './customers.graphql'

export default function CustomersPage() {
  const { data, loading, error } = useQuery(GET_ALL_CUSTOMERS, {
    variables: { limit: 1000, offset: 0 },
  })

  // Filter only customers (users with CUSTOMER role)
  const customers = data?.users?.filter((user) =>
    user.roles.includes('CUSTOMER')
  ) || []

  return (
    <CustomersProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Zákazníci</h1>
            <p className='text-muted-foreground'>
              Správa zákaznických účtů a jejich poptávek
            </p>
          </div>
          <CustomersPrimaryButtons />
        </div>

        {loading && (
          <div className='flex h-64 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
          </div>
        )}

        {error && (
          <Alert variant='destructive'>
            <AlertDescription>
              Chyba při načítání zákazníků: {error.message}
            </AlertDescription>
          </Alert>
        )}

        {!loading && !error && customers.length === 0 && (
          <div className='flex h-64 flex-col items-center justify-center text-muted-foreground'>
            <UserCircle className='h-12 w-12 mb-4 opacity-20' />
            <p>Žádní zákazníci nenalezeni</p>
          </div>
        )}

        {!loading && !error && customers.length > 0 && (
          <CustomersTable data={customers} />
        )}

        <CustomersDialogs />
      </div>
    </CustomersProvider>
  )
}
