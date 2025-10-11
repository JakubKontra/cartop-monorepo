'use client'

import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'

export default function UsersPage() {
  return (
    <UsersProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Users</h1>
            <p className='text-muted-foreground'>
              Manage user accounts and permissions
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <UsersTable />
        <UsersDialogs />
      </div>
    </UsersProvider>
  )
}
