'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { ChevronDown, ChevronRight } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface AuditLog {
  id: string
  entityName: string
  entityId: string
  action: string
  oldValue?: Record<string, unknown> | null
  newValue?: Record<string, unknown> | null
  changes?: Record<string, { old: unknown; new: unknown }> | null
  createdAt: string
  ipAddress?: string | null
  userAgent?: string | null
}

interface UserAuditLogsTableProps {
  auditLogs: AuditLog[]
}

function ActionBadge({ action }: { action: string }) {
  const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
    CREATE: { variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
    UPDATE: { variant: 'default', className: 'bg-blue-500 hover:bg-blue-600' },
    DELETE: { variant: 'destructive', className: '' },
  }

  const config = variants[action] || { variant: 'secondary' as const, className: '' }

  return (
    <Badge variant={config.variant} className={config.className}>
      {action}
    </Badge>
  )
}

function ExpandableRow({ log }: { log: AuditLog }) {
  const [isOpen, setIsOpen] = useState(false)

  const hasDetails = log.changes || log.oldValue || log.newValue

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
      <>
        <TableRow className='hover:bg-muted/50'>
          <TableCell className='w-12'>
            {hasDetails && (
              <CollapsibleTrigger asChild>
                <Button variant='ghost' size='sm' className='h-6 w-6 p-0'>
                  {isOpen ? (
                    <ChevronDown className='h-4 w-4' />
                  ) : (
                    <ChevronRight className='h-4 w-4' />
                  )}
                </Button>
              </CollapsibleTrigger>
            )}
          </TableCell>
          <TableCell className='font-medium'>
            {format(parseISO(log.createdAt), 'MMM dd, yyyy HH:mm')}
          </TableCell>
          <TableCell>
            <ActionBadge action={log.action} />
          </TableCell>
          <TableCell>
            <div>
              <div className='font-medium'>{log.entityName}</div>
              <div className='text-xs text-muted-foreground'>{log.entityId}</div>
            </div>
          </TableCell>
          <TableCell className='text-muted-foreground text-xs max-w-xs truncate'>
            {log.ipAddress || '-'}
          </TableCell>
        </TableRow>
        {hasDetails && (
          <TableRow>
            <TableCell colSpan={5} className='p-0 border-0'>
              <CollapsibleContent>
                <div className='px-12 py-4 bg-muted/30'>
                  {/* Display Changes */}
                  {log.changes && Object.keys(log.changes).length > 0 && (
                    <div className='mb-4'>
                      <h4 className='font-semibold text-sm mb-2'>Changes:</h4>
                      <div className='space-y-2'>
                        {Object.entries(log.changes).map(([field, change]) => (
                          <div key={field} className='grid grid-cols-[120px_1fr] gap-2 text-sm'>
                            <div className='font-medium'>{field}:</div>
                            <div className='space-y-1'>
                              {change.old !== undefined && (
                                <div className='text-red-600 dark:text-red-400'>
                                  <span className='text-muted-foreground'>Old: </span>
                                  <code className='bg-red-100 dark:bg-red-950 px-1 rounded'>
                                    {JSON.stringify(change.old)}
                                  </code>
                                </div>
                              )}
                              {change.new !== undefined && (
                                <div className='text-green-600 dark:text-green-400'>
                                  <span className='text-muted-foreground'>New: </span>
                                  <code className='bg-green-100 dark:bg-green-950 px-1 rounded'>
                                    {JSON.stringify(change.new)}
                                  </code>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Display New Value for CREATE */}
                  {log.action === 'CREATE' && log.newValue && (
                    <div>
                      <h4 className='font-semibold text-sm mb-2'>Created Data:</h4>
                      <pre className='bg-muted p-2 rounded text-xs overflow-x-auto'>
                        {JSON.stringify(log.newValue, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Display Old Value for DELETE */}
                  {log.action === 'DELETE' && log.oldValue && (
                    <div>
                      <h4 className='font-semibold text-sm mb-2'>Deleted Data:</h4>
                      <pre className='bg-muted p-2 rounded text-xs overflow-x-auto'>
                        {JSON.stringify(log.oldValue, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Additional metadata */}
                  {log.userAgent && (
                    <div className='mt-4 text-xs text-muted-foreground'>
                      <span className='font-medium'>User Agent: </span>
                      {log.userAgent}
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </TableCell>
          </TableRow>
        )}
      </>
    </Collapsible>
  )
}

export function UserAuditLogsTable({ auditLogs }: UserAuditLogsTableProps) {
  if (auditLogs.length === 0) {
    return (
      <div className='flex items-center justify-center h-32 text-muted-foreground'>
        No audit logs found
      </div>
    )
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-12'></TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity</TableHead>
            <TableHead>IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogs.map((log) => (
            <ExpandableRow key={log.id} log={log} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
