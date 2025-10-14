'use client'

import { formatDistanceToNow } from 'date-fns'
import { Phone, Mail, FileText, TrendingUp, Chrome, Monitor, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface CarRequestActivitySidebarProps {
  carRequestId?: string
  carRequest?: {
    createdAt: string
    modifiedAt: string
    notes?: string | null
    noteInternal?: string | null
    requestFirstName?: string | null
    requestLastName?: string | null
    requestEmail?: string | null
    requestPhone?: string | null
    brand?: { name: string } | null
    model?: { name: string } | null
  } | null
}

interface HistoryItem {
  id: string
  type: 'call' | 'email' | 'note' | 'status_change' | 'offer'
  title: string
  description: string
  timestamp: Date
  icon: typeof Phone
  badgeVariant?: 'default' | 'secondary' | 'outline'
  badgeText?: string
}

export function CarRequestActivitySidebar({
  carRequest,
}: CarRequestActivitySidebarProps) {
  // Generate dummy history data
  const getDummyHistoryItems = (): HistoryItem[] => {
    const now = new Date()
    return [
      {
        id: '1',
        type: 'call',
        title: 'Call Successful',
        description: 'Customer was interested in the offer. Requested additional information about financing options.',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        icon: Phone,
        badgeVariant: 'default',
        badgeText: 'Success',
      },
      {
        id: '2',
        type: 'offer',
        title: 'Offer Sent',
        description: `Sent offer for ${carRequest?.brand?.name || 'Brand'} ${carRequest?.model?.name || 'Model'} - Monthly payment: €450, Term: 48 months`,
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
        icon: FileText,
        badgeVariant: 'secondary',
        badgeText: 'Offer',
      },
      {
        id: '3',
        type: 'email',
        title: 'Email Sent',
        description: 'Sent follow-up email with vehicle specifications and availability.',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
        icon: Mail,
        badgeVariant: 'outline',
        badgeText: 'Email',
      },
      {
        id: '4',
        type: 'call',
        title: 'Call Not Reached',
        description: 'Customer did not answer. Left voicemail. Scheduled callback for tomorrow.',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        icon: Phone,
        badgeVariant: 'outline',
        badgeText: 'Missed',
      },
      {
        id: '5',
        type: 'status_change',
        title: 'Status Updated',
        description: 'Request status changed to "In Progress"',
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        icon: TrendingUp,
        badgeVariant: 'default',
        badgeText: 'Status',
      },
      {
        id: '6',
        type: 'note',
        title: 'Internal Note Added',
        description: 'Customer mentioned they are also considering electric vehicles. Make sure to mention EV options.',
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        icon: FileText,
        badgeVariant: 'outline',
        badgeText: 'Note',
      },
    ]
  }

  const historyItems = getDummyHistoryItems()

  // Dummy visitor behavior data
  const visitorBehavior = {
    source: 'Google Organic',
    device: 'Desktop',
    browser: 'Chrome 120.0',
    location: 'Prague, Czech Republic',
    pagesVisited: [
      { page: 'Homepage', time: '2 min' },
      { page: `${carRequest?.brand?.name || 'Brand'} ${carRequest?.model?.name || 'Model'} Detail`, time: '5 min' },
      { page: 'Contact Form', time: '3 min' },
    ],
  }

  return (
    <div className='w-96 border-l bg-muted/30 flex flex-col h-full'>
      <div className='p-6 border-b bg-background'>
        <h2 className='text-lg font-semibold'>Activity & History</h2>
        <p className='text-sm text-muted-foreground mt-1'>
          Track customer interactions and behavior
        </p>
      </div>

      <ScrollArea className='flex-1'>
        <div className='p-6 space-y-6'>
          {/* History Section */}
          <div>
            <h3 className='text-sm font-semibold mb-4 flex items-center gap-2'>
              <FileText className='w-4 h-4' />
              Timeline
            </h3>
            <div className='space-y-4'>
              {historyItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.id}>
                    <div className='flex gap-3'>
                      <div className='flex flex-col items-center'>
                        <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                          <Icon className='w-4 h-4 text-primary' />
                        </div>
                        {index < historyItems.length - 1 && (
                          <div className='w-px h-full min-h-[40px] bg-border mt-2' />
                        )}
                      </div>
                      <div className='flex-1 pb-4'>
                        <div className='flex items-start justify-between gap-2 mb-1'>
                          <div className='font-medium text-sm'>{item.title}</div>
                          {item.badgeText && (
                            <Badge variant={item.badgeVariant} className='shrink-0'>
                              {item.badgeText}
                            </Badge>
                          )}
                        </div>
                        <p className='text-sm text-muted-foreground mb-2'>
                          {item.description}
                        </p>
                        <span className='text-xs text-muted-foreground'>
                          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Visitor Behavior Section */}
          <div>
            <h3 className='text-sm font-semibold mb-4 flex items-center gap-2'>
              <Globe className='w-4 h-4' />
              Visitor Behavior
            </h3>
            <Card>
              <CardContent className='p-4 space-y-4'>
                <div>
                  <div className='text-xs font-medium text-muted-foreground mb-1'>
                    Traffic Source
                  </div>
                  <div className='text-sm font-medium'>{visitorBehavior.source}</div>
                </div>
                <Separator />
                <div>
                  <div className='text-xs font-medium text-muted-foreground mb-1'>
                    Device
                  </div>
                  <div className='flex items-center gap-2'>
                    <Monitor className='w-4 h-4' />
                    <span className='text-sm font-medium'>{visitorBehavior.device}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className='text-xs font-medium text-muted-foreground mb-1'>
                    Browser
                  </div>
                  <div className='flex items-center gap-2'>
                    <Chrome className='w-4 h-4' />
                    <span className='text-sm font-medium'>{visitorBehavior.browser}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className='text-xs font-medium text-muted-foreground mb-1'>
                    Location
                  </div>
                  <div className='text-sm font-medium'>{visitorBehavior.location}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Pages Visited Section */}
          <div>
            <h3 className='text-sm font-semibold mb-4'>Pages Visited</h3>
            <Card>
              <CardContent className='p-4'>
                <div className='space-y-3'>
                  {visitorBehavior.pagesVisited.map((page, index) => (
                    <div key={index}>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>{page.page}</span>
                        <Badge variant='outline' className='text-xs'>
                          {page.time}
                        </Badge>
                      </div>
                      {index < visitorBehavior.pagesVisited.length - 1 && (
                        <Separator className='mt-3' />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Info Summary */}
          {carRequest && (
            <>
              <Separator />
              <div>
                <h3 className='text-sm font-semibold mb-4'>Request Details</h3>
                <Card>
                  <CardContent className='p-4 space-y-3 text-sm'>
                    {carRequest.requestFirstName && (
                      <div>
                        <div className='text-xs font-medium text-muted-foreground'>Name</div>
                        <div className='font-medium'>
                          {carRequest.requestFirstName} {carRequest.requestLastName}
                        </div>
                      </div>
                    )}
                    {carRequest.requestEmail && (
                      <>
                        <Separator />
                        <div>
                          <div className='text-xs font-medium text-muted-foreground'>Email</div>
                          <div className='font-medium'>{carRequest.requestEmail}</div>
                        </div>
                      </>
                    )}
                    {carRequest.requestPhone && (
                      <>
                        <Separator />
                        <div>
                          <div className='text-xs font-medium text-muted-foreground'>Phone</div>
                          <div className='font-medium'>{carRequest.requestPhone}</div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
