'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useQuery, useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
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
import { useAuthStore } from '@/stores/auth-store'

export function UserEditPage() {
  const { userId } = useParams({ from: '/_authenticated/users/$userId/edit' })
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  // Check if current user is ADMIN
  const currentUserRoles = auth.user?.roles || []
  const isAdmin = currentUserRoles.some(role =>
    role.toLowerCase() === 'admin'
  )

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
      // Normalize roles from UPPER_SNAKE_CASE to camelCase to match the role options
      const normalizedRoles = data.user.roles.map((role: string) =>
        role.includes('_')
          ? role.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
          : role
      )

      form.reset({
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        roles: normalizedRoles,
        phone: data.user.phone || '',
        bio: data.user.bio || '',
      })
    }
  }, [data, form])

  const onSubmit = async (values: UserEditFormValues) => {
    try {
      // Convert roles back to UPPER_SNAKE_CASE for the API
      const apiRoles = values.roles.map((role: string) =>
        role.replace(/([A-Z])/g, '_$1').toUpperCase()
      )

      await updateUser({
        variables: {
          id: userId,
          input: {
            ...values,
            roles: apiRoles,
          },
        },
      })
      toast.success('User updated successfully')
      navigate({ to: '/users' })
    } catch (error: any) {
      console.error('User update error:', error)
      toast.error(error.message || 'Failed to update user')
    }
  }

  if (loading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='text-center'>
          <p className='text-lg font-semibold text-destructive'>Error loading user</p>
          <p className='text-sm text-muted-foreground'>{error.message}</p>
        </div>
      </div>
    )
  }

  if (!data?.user) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='text-center'>
          <p className='text-lg font-semibold text-destructive'>User not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-full flex-1 flex-col gap-4 p-4'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => navigate({ to: '/users' })}
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Edit User</h1>
          <p className='text-muted-foreground'>
            Update user information and permissions
          </p>
        </div>
      </div>

      <div className='max-w-2xl'>
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
      </div>
    </div>
  )
}
