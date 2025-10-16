'use client'

import { useMemo } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { format, subDays, startOfDay, parseISO } from 'date-fns'

interface AuditLog {
  id: string
  action: string
  createdAt: string
}

interface UserActivityChartProps {
  auditLogs: AuditLog[]
}

interface ChartData {
  date: string
  dateLabel: string
  CREATE: number
  UPDATE: number
  DELETE: number
  total: number
}

export function UserActivityChart({ auditLogs }: UserActivityChartProps) {
  const chartData = useMemo(() => {
    // Create data structure for last 30 days
    const last30Days: ChartData[] = []
    const today = startOfDay(new Date())

    // Initialize with zeros for each day
    for (let i = 29; i >= 0; i--) {
      const date = subDays(today, i)
      last30Days.push({
        date: date.toISOString(),
        dateLabel: format(date, 'MMM dd'),
        CREATE: 0,
        UPDATE: 0,
        DELETE: 0,
        total: 0,
      })
    }

    // Aggregate audit logs by day and action
    auditLogs.forEach((log) => {
      const logDate = startOfDay(parseISO(log.createdAt))
      const dayIndex = last30Days.findIndex((day) => {
        return startOfDay(parseISO(day.date)).getTime() === logDate.getTime()
      })

      if (dayIndex !== -1) {
        const action = log.action as 'CREATE' | 'UPDATE' | 'DELETE'
        if (action === 'CREATE' || action === 'UPDATE' || action === 'DELETE') {
          last30Days[dayIndex][action]++
          last30Days[dayIndex].total++
        }
      }
    })

    return last30Days
  }, [auditLogs])

  const maxValue = useMemo(() => {
    return Math.max(...chartData.map((d) => d.total), 1)
  }, [chartData])

  return (
    <div className='space-y-4'>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id='colorCreate' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#10b981' stopOpacity={0.3} />
              <stop offset='95%' stopColor='#10b981' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorUpdate' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.3} />
              <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorDelete' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#ef4444' stopOpacity={0.3} />
              <stop offset='95%' stopColor='#ef4444' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey='dateLabel'
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            interval='preserveStartEnd'
            minTickGap={30}
          />
          <YAxis
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, maxValue]}
            allowDecimals={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as ChartData
                return (
                  <div className='bg-background rounded-lg border p-3 shadow-lg'>
                    <p className='text-sm font-medium mb-2'>{data.dateLabel}</p>
                    <div className='space-y-1 text-sm'>
                      <div className='flex items-center gap-2'>
                        <div className='h-2 w-2 rounded-full bg-green-500' />
                        <span className='text-muted-foreground'>Create:</span>
                        <span className='font-medium'>{data.CREATE}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='h-2 w-2 rounded-full bg-blue-500' />
                        <span className='text-muted-foreground'>Update:</span>
                        <span className='font-medium'>{data.UPDATE}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='h-2 w-2 rounded-full bg-red-500' />
                        <span className='text-muted-foreground'>Delete:</span>
                        <span className='font-medium'>{data.DELETE}</span>
                      </div>
                      <div className='pt-1 mt-1 border-t'>
                        <span className='text-muted-foreground'>Total:</span>
                        <span className='font-medium ml-2'>{data.total}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type='monotone'
            dataKey='CREATE'
            stackId='1'
            stroke='#10b981'
            fill='url(#colorCreate)'
            strokeWidth={2}
          />
          <Area
            type='monotone'
            dataKey='UPDATE'
            stackId='1'
            stroke='#3b82f6'
            fill='url(#colorUpdate)'
            strokeWidth={2}
          />
          <Area
            type='monotone'
            dataKey='DELETE'
            stackId='1'
            stroke='#ef4444'
            fill='url(#colorDelete)'
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className='flex items-center justify-center gap-6 text-sm'>
        <div className='flex items-center gap-2'>
          <div className='h-3 w-3 rounded-sm bg-green-500' />
          <span className='text-muted-foreground'>Create</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-3 w-3 rounded-sm bg-blue-500' />
          <span className='text-muted-foreground'>Update</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-3 w-3 rounded-sm bg-red-500' />
          <span className='text-muted-foreground'>Delete</span>
        </div>
      </div>
    </div>
  )
}
