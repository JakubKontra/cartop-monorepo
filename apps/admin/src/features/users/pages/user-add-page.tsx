'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { ArrowLeft, Loader2, UserPlus } from 'lucide-react'
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
import { PasswordInput } from '@/components/password-input'
import { RoleSelect } from '../components/role-select'
import { userRoleSchema } from '../data/schema'
import { CREATE_USER } from '../users.graphql'
import { useIsAdmin } from '@/hooks/use-permission'
import { normalizeRolesForApi } from '@/lib/role-utils'

const formSchema = z
  .object({
    firstName: z.string().min(1, 'First Name is required.'),
    lastName: z.string().min(1, 'Last Name is required.'),
    username: z.string().min(1, 'Username is required.'),
    phone: z.string().min(1, 'Phone number is required.'),
    email: z.email('Invalid email address'),
    password: z.string().trim().min(1, 'Password is required.'),
    roles: z.array(userRoleSchema).min(1, 'At least one role is required.'),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password.length >= 8, {
    message: 'Password must be at least 8 characters long.',
    path: ['password'],
  })
  .refine((data) => /[a-z]/.test(data.password), {
    message: 'Password must contain at least one lowercase letter.',
    path: ['password'],
  })
  .refine((data) => /\d/.test(data.password), {
    message: 'Password must contain at least one number.',
    path: ['password'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

type UserAddFormValues = z.infer<typeof formSchema>

export function UserAddPage() {
  const navigate = useNavigate()
  const isAdmin = useIsAdmin()

  // Create user mutation
  const [createUser, { loading: creating }] = useMutation(CREATE_USER)

  const form = useForm<UserAddFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      roles: [],
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: UserAddFormValues) => {
    try {
      // Remove confirmPassword as it's not needed for the API
      const { confirmPassword, ...userData } = values

      await createUser({
        variables: {
          input: {
            ...userData,
            roles: normalizeRolesForApi(values.roles),
          },
        },
      })
      toast.success('User created successfully')
      navigate({ to: '/users' })
    } catch (error: any) {
      console.error('User creation error:', error)
      toast.error(error.message || 'Failed to create user')
    }
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

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
          <h1 className='text-2xl font-bold tracking-tight'>Add New User</h1>
          <p className='text-muted-foreground'>
            Create a new user account with roles and permissions
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
                      <Input placeholder='John' autoComplete='off' {...field} />
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
                      <Input placeholder='Doe' autoComplete='off' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='john_doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormLabel>Phone Number</FormLabel>
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

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='e.g., S3cur3P@ssw0rd'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!isPasswordTouched}
                        placeholder='e.g., S3cur3P@ssw0rd'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-2'>
              <Button
                type='submit'
                disabled={creating}
              >
                {creating ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className='mr-2 h-4 w-4' />
                    Create User
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
