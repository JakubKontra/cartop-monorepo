import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Trash2, UserPen, UserCog, Eye } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type GetAllUsersQuery, UserRole } from '@/gql/graphql'

// Use GraphQL User type to match the columns
type User = GetAllUsersQuery['users'][number]
import { useUsers } from './users-provider'
import { useIsAdmin } from '@/hooks/use-permission'

type DataTableRowActionsProps = {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUsers()
  const navigate = useNavigate()
  const isAdmin = useIsAdmin()

  // Check if target user is admin
  const targetUserRoles = row.original.roles || []
  const isTargetAdmin = targetUserRoles.includes(UserRole.Admin)

  // Show impersonate if: current user is admin AND target is not admin
  const showImpersonate = isAdmin && !isTargetAdmin

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[180px]'>
          <DropdownMenuItem
            onClick={() => {
              navigate({ to: '/users/$userId', params: { userId: row.original.id } })
            }}
          >
            View Details
            <DropdownMenuShortcut>
              <Eye size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              navigate({ to: '/users/$userId/edit', params: { userId: row.original.id } })
            }}
          >
            Edit
            <DropdownMenuShortcut>
              <UserPen size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          {showImpersonate && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setCurrentRow(row.original)
                  setOpen('impersonate')
                }}
              >
                Impersonate
                <DropdownMenuShortcut>
                  <UserCog size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('delete')
            }}
            className='text-red-500!'
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2 size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
