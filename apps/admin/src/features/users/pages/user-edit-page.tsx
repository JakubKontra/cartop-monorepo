'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useQuery, useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RoleSelect } from '../components/role-select'
import { userEditFormSchema, type UserEditFormValues } from '../data/schema'
import { GET_USER, UPDATE_USER } from '../users.graphql'
import { useIsAdmin } from '@/hooks/use-permission'
import { normalizeRolesFromApi } from '@/lib/role-utils'
import { logger } from '@/lib/logger'

export function UserEditPage() {
  const { userId } = useParams({ from: '/_authenticated/users/$userId/edit' })
  const navigate = useNavigate()
  const isAdmin = useIsAdmin()

  // Fetch user data
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  })

  // Update user mutation
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER)

  const form = useForm<UserEditFormValues>({
    resolver: zodResolver(userEditFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      roles: [],
      phone: '',
      bio: '',
    },
  })

  // Update form values when user data is loaded
  useEffect(() => {
    if (data?.user) {
      form.reset({
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        roles: normalizeRolesFromApi(data.user.roles),
        phone: data.user.phone || '',
        bio: data.user.bio || '',
      })
    }
  }, [data, form])

  const onSubmit = async (values: UserEditFormValues) => {
    try {
      // Remove roles from update input as UpdateUserInput doesn't support it
      const { roles, ...updateData } = values

      await updateUser({
        variables: {
          id: userId,
          input: updateData,
        },
      })
      toast.success('User updated successfully')
      navigate({ to: '/users' })
    } catch (error: unknown) {
      logger.error('User update failed', error, { userId, userEmail: values.email })
      const message = error instanceof Error ? error.message : 'Failed to update user'
      toast.error(message)
    }
  }

  const user = data?.user

  return (
    <CrudPageLayout
      title="Edit User"
      description={user ? `Update ${user.firstName} ${user.lastName} information and permissions` : undefined}
      backUrl="/users"
      loading={loading}
      loadingMessage="Loading user..."
      error={error || (!user ? new Error('User not found') : null)}
      errorMessage={error?.message || 'User not found'}
      backButtonLabel="Back to Users"
      maxWidth="max-w-2xl"
    >
      {user && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='John' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='john.doe@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder='+1234567890' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='roles'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <RoleSelect
                      value={field.value}
                      onChange={field.onChange}
                      disabled={!isAdmin}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tell us about this user...'
                      className='resize-none'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-2'>
              <Button
                type='submit'
                disabled={updating}
              >
                {updating ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className='mr-2 h-4 w-4' />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate({ to: '/users' })}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </CrudPageLayout>
  )
}
