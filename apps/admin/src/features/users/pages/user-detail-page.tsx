'use client'

import { useMemo } from 'react'
import { useQuery } from '@apollo/client/react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { subDays } from 'date-fns'
import { Activity, Calendar, Clock, User } from 'lucide-react'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GET_USER, GET_USER_AUDIT_LOGS } from '../users.graphql'
import { UserActivityChart } from '../components/user-activity-chart'
import { UserAuditLogsTable } from '../components/user-audit-logs-table'

export function UserDetailPage() {
  const { userId } = useParams({ from: '/_authenticated/users/$userId/' })
  const navigate = useNavigate()

  // Fetch user data
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {
    variables: { id: userId },
  })

  // Fetch audit logs for last 30 days
  const thirtyDaysAgo = subDays(new Date(), 30)
  const { data: auditData, loading: auditLoading } = useQuery(GET_USER_AUDIT_LOGS, {
    variables: {
      userId,
      limit: 1000, // Get enough data for last 30 days
    },
  })

  // Filter audit logs to last 30 days (backend might return more)
  const recentAuditLogs = useMemo(() => {
    if (!auditData?.userActivity) return []
    return auditData.userActivity.filter((log) => {
      const logDate = new Date(log.createdAt)
      return logDate >= thirtyDaysAgo
    })
  }, [auditData, thirtyDaysAgo])

  // Calculate statistics
  const stats = useMemo(() => {
    const createCount = recentAuditLogs.filter((log) => log.action === 'CREATE').length
    const updateCount = recentAuditLogs.filter((log) => log.action === 'UPDATE').length
    const deleteCount = recentAuditLogs.filter((log) => log.action === 'DELETE').length

    return {
      total: recentAuditLogs.length,
      create: createCount,
      update: updateCount,
      delete: deleteCount,
    }
  }, [recentAuditLogs])

  const user = userData?.user
  const loading = userLoading || auditLoading

  return (
    <CrudPageLayout
      title={user ? `${user.firstName} ${user.lastName}` : 'User Details'}
      description={user?.email}
      backUrl='/users'
      loading={userLoading}
      loadingMessage='Loading user details...'
      error={userError || (!user ? new Error('User not found') : null)}
      errorMessage={userError?.message || 'User not found'}
      backButtonLabel='Back to Users'
      maxWidth='max-w-6xl'
      actions={
        user && (
          <Button
            variant='outline'
            onClick={() => navigate({ to: '/users/$userId/edit', params: { userId } })}
          >
            Edit User
          </Button>
        )
      }
    >
      {user && (
        <div className='space-y-6'>
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5' />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2'>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Email</label>
                  <p className='text-base'>{user.email}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Roles</label>
                  <div className='flex gap-2 mt-1'>
                    {user.roles.map((role) => (
                      <Badge key={role} variant='secondary'>
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                {user.phone && (
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Phone</label>
                    <p className='text-base'>{user.phone}</p>
                  </div>
                )}
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Status</label>
                  <p className='text-base'>
                    <Badge variant={user.isActive ? 'default' : 'secondary'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Statistics */}
          <div className='grid gap-4 md:grid-cols-4'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  Total Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stats.total}</div>
                <p className='text-xs text-muted-foreground mt-1'>
                  <Calendar className='inline h-3 w-3 mr-1' />
                  Last 30 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  Created
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-green-600'>{stats.create}</div>
                <p className='text-xs text-muted-foreground mt-1'>New entities</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-blue-600'>{stats.update}</div>
                <p className='text-xs text-muted-foreground mt-1'>Modified entities</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  Deleted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-red-600'>{stats.delete}</div>
                <p className='text-xs text-muted-foreground mt-1'>Removed entities</p>
              </CardContent>
            </Card>
          </div>

          {/* Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Activity className='h-5 w-5' />
                Activity Over Time
              </CardTitle>
              <CardDescription>
                User activity for the last 30 days. Hover over the chart to see daily breakdown.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className='flex items-center justify-center h-[300px] text-muted-foreground'>
                  Loading activity data...
                </div>
              ) : (
                <UserActivityChart auditLogs={recentAuditLogs} />
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Clock className='h-5 w-5' />
                Recent Activity Log
              </CardTitle>
              <CardDescription>
                Detailed audit trail of user actions. Click on rows to expand and view change details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='all' className='w-full'>
                <TabsList className='mb-4'>
                  <TabsTrigger value='all'>
                    All ({stats.total})
                  </TabsTrigger>
                  <TabsTrigger value='create'>
                    Create ({stats.create})
                  </TabsTrigger>
                  <TabsTrigger value='update'>
                    Update ({stats.update})
                  </TabsTrigger>
                  <TabsTrigger value='delete'>
                    Delete ({stats.delete})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='all'>
                  {loading ? (
                    <div className='flex items-center justify-center h-32 text-muted-foreground'>
                      Loading audit logs...
                    </div>
                  ) : (
                    <UserAuditLogsTable auditLogs={recentAuditLogs} />
                  )}
                </TabsContent>

                <TabsContent value='create'>
                  <UserAuditLogsTable
                    auditLogs={recentAuditLogs.filter((log) => log.action === 'CREATE')}
                  />
                </TabsContent>

                <TabsContent value='update'>
                  <UserAuditLogsTable
                    auditLogs={recentAuditLogs.filter((log) => log.action === 'UPDATE')}
                  />
                </TabsContent>

                <TabsContent value='delete'>
                  <UserAuditLogsTable
                    auditLogs={recentAuditLogs.filter((log) => log.action === 'DELETE')}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </CrudPageLayout>
  )
}
