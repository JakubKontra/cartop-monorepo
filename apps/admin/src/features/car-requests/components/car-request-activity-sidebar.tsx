'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  Phone,
  Mail,
  FileText,
  TrendingUp,
  Chrome,
  Monitor,
  Globe,
  Crown,
  Handshake,
  Clock,
  ShoppingCart,
  Eye,
  EyeOff,
  User,
  MessageSquarePlus,
  Send,
  ChevronDown,
  Edit,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { AddMessageModal } from './add-message-modal'
import { AssignAgentModal } from './assign-agent-modal'
import { LogCallModal } from './log-call-modal'
import { MarkVipModal } from './mark-vip-modal'
import { SendOfferModal } from './send-offer-modal'

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
    assignedAgent?: {
      id: string
      firstName?: string | null
      lastName?: string | null
      email?: string | null
    } | null
    assignedAgentId?: string | null
    logs?: Array<{
      id: string
      createdAt: string
      message: string
      actionType: string
      metadata?: any
      author?: {
        id: string
        firstName?: string | null
        lastName?: string | null
        email?: string | null
      } | null
    }> | null
  } | null
  onRefresh?: () => void
}

interface HistoryItem {
  id: string
  type:
    | 'call'
    | 'email'
    | 'note'
    | 'status_change'
    | 'offer'
    | 'vip'
    | 'dealer'
    | 'scheduled'
    | 'cancelled'
    | 'purchased'
    | 'waiting_offer'
  title: string
  description: string
  timestamp: Date
  icon: typeof Phone
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive'
  badgeText?: string
  author?: {
    name: string
    role: string
  }
  metadata?: {
    offerDetails?: {
      monthlyPayment: number
      term: number
      downPayment: number
      totalPrice: number
      interestRate: number
      vehicleName?: string
    }[]
    emailSubject?: string
    oldStatus?: string
    newStatus?: string
  }
}

export function CarRequestActivitySidebar({
  carRequestId,
  carRequest,
  onRefresh,
}: CarRequestActivitySidebarProps) {
  const [expandedOffers, setExpandedOffers] = useState(new Set<string>())
  const [addMessageModalOpen, setAddMessageModalOpen] = useState(false)
  const [markVipModalOpen, setMarkVipModalOpen] = useState(false)
  const [logCallModalOpen, setLogCallModalOpen] = useState(false)
  const [sendOfferModalOpen, setSendOfferModalOpen] = useState(false)
  const [assignAgentModalOpen, setAssignAgentModalOpen] = useState(false)

  const handleToggleOffer = (itemId: string) => {
    setExpandedOffers((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }

  // Map action type to icon
  const getLogIcon = (actionType: string): typeof Phone => {
    switch (actionType) {
      case 'CALL_LOGGED':
        return Phone
      case 'EMAIL_SENT':
      case 'MESSAGE_SENT':
        return Mail
      case 'NOTE_ADDED':
        return FileText
      case 'STATUS_CHANGED':
      case 'STATE_CHANGED':
        return TrendingUp
      case 'OFFER_SENT':
        return FileText
      case 'MARKED_VIP':
        return Crown
      case 'PASSED_TO_DEALER':
        return Handshake
      case 'CALLBACK_SCHEDULED':
      case 'WAITING_FOR_OFFER':
        return Clock
      case 'MARKED_PURCHASED':
      case 'COMPLETED':
        return ShoppingCart
      case 'ASSIGNED':
        return User
      case 'CREATED':
        return FileText
      case 'CANCELLED':
        return FileText
      default:
        return FileText
    }
  }

  // Map action type to badge style
  const getLogBadge = (
    actionType: string
  ): {
    variant: 'default' | 'secondary' | 'outline' | 'destructive'
    text: string
  } => {
    switch (actionType) {
      case 'CALL_LOGGED':
        return { variant: 'default', text: 'Call' }
      case 'EMAIL_SENT':
        return { variant: 'outline', text: 'Email' }
      case 'MESSAGE_SENT':
        return { variant: 'outline', text: 'Message' }
      case 'NOTE_ADDED':
        return { variant: 'outline', text: 'Note' }
      case 'STATUS_CHANGED':
        return { variant: 'default', text: 'Status' }
      case 'STATE_CHANGED':
        return { variant: 'default', text: 'State' }
      case 'OFFER_SENT':
        return { variant: 'secondary', text: 'Offer' }
      case 'MARKED_VIP':
        return { variant: 'secondary', text: 'VIP' }
      case 'PASSED_TO_DEALER':
        return { variant: 'secondary', text: 'Dealer' }
      case 'CALLBACK_SCHEDULED':
        return { variant: 'outline', text: 'Scheduled' }
      case 'WAITING_FOR_OFFER':
        return { variant: 'secondary', text: 'Waiting' }
      case 'MARKED_PURCHASED':
      case 'COMPLETED':
        return { variant: 'default', text: 'Purchased' }
      case 'ASSIGNED':
        return { variant: 'default', text: 'Assigned' }
      case 'CREATED':
        return { variant: 'default', text: 'Created' }
      case 'CANCELLED':
        return { variant: 'destructive', text: 'Cancelled' }
      default:
        return { variant: 'outline', text: 'Activity' }
    }
  }

  // Map action type to HistoryItem type
  const getHistoryItemType = (actionType: string): HistoryItem['type'] => {
    switch (actionType) {
      case 'CALL_LOGGED':
        return 'call'
      case 'EMAIL_SENT':
      case 'MESSAGE_SENT':
        return 'email'
      case 'NOTE_ADDED':
        return 'note'
      case 'STATUS_CHANGED':
      case 'STATE_CHANGED':
        return 'status_change'
      case 'OFFER_SENT':
        return 'offer'
      case 'MARKED_VIP':
        return 'vip'
      case 'PASSED_TO_DEALER':
        return 'dealer'
      case 'CALLBACK_SCHEDULED':
        return 'scheduled'
      case 'WAITING_FOR_OFFER':
        return 'waiting_offer'
      case 'MARKED_PURCHASED':
      case 'COMPLETED':
        return 'purchased'
      case 'CANCELLED':
        return 'cancelled'
      default:
        return 'note'
    }
  }

  // Transform logs to HistoryItems
  const historyItems: HistoryItem[] =
    carRequest?.logs?.map((log) => {
      const badge = getLogBadge(log.actionType)
      const icon = getLogIcon(log.actionType)
      const type = getHistoryItemType(log.actionType)

      // Format author name
      const authorName = log.author
        ? `${log.author.firstName || ''} ${log.author.lastName || ''}`.trim() ||
          'Unknown User'
        : 'System'

      return {
        id: log.id,
        type,
        title: log.message,
        description: log.message,
        timestamp: new Date(log.createdAt),
        icon,
        badgeVariant: badge.variant,
        badgeText: badge.text,
        author: {
          name: authorName,
          role: log.author ? 'Agent' : 'Automated',
        },
        metadata: log.metadata || undefined,
      }
    }) || []

  // Dummy visitor behavior data
  const visitorBehavior = {
    source: 'Google Organic',
    device: 'Desktop',
    browser: 'Chrome 120.0',
    location: 'Prague, Czech Republic',
    pagesVisited: [
      { page: 'Homepage', time: '2 min' },
      {
        page: `${carRequest?.brand?.name || 'Brand'} ${carRequest?.model?.name || 'Model'} Detail`,
        time: '5 min',
      },
      { page: 'Contact Form', time: '3 min' },
    ],
  }

  return (
    <div className='bg-muted/30 flex h-full w-96 flex-col border-l'>
      <div className='p-6 pb-0'>
        {carRequest?.assignedAgent ? (
          <h3 className='mb-3 text-sm font-semibold'>
            Přiřazeno:{' '}
            <span className='font-medium'>
              {carRequest.assignedAgent.firstName}{' '}
              {carRequest.assignedAgent.lastName} (
              {carRequest.assignedAgent.email})
            </span>
          </h3>
        ) : (
          <div className='text-muted-foreground text-sm'>
            Žádný agent není přiřazen
          </div>
        )}
        <Button
          size='sm'
          variant='outline'
          onClick={() => setAssignAgentModalOpen(true)}
        >
          <Edit className='mr-2 h-4 w-4' />
          {carRequest?.assignedAgent ? 'Změnit agenta' : 'Přiřadit agenta'}
        </Button>
      </div>

      <div className='bg-background border-b p-6'>
        <h2 className='text-lg font-semibold'>Activity & History</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Track customer interactions and behavior
        </p>
      </div>

      <ScrollArea className='flex-1'>
        <div className='space-y-6 p-6'>
          {/* Assigned Agent Section */}

          <Separator />

          <div>
            <div className='mb-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size='sm' className='w-full'>
                    Actions
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-56'>
                  <DropdownMenuLabel>Communication</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => setAddMessageModalOpen(true)}
                    >
                      <MessageSquarePlus className='mr-2 h-4 w-4' />
                      <span>Add Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSendOfferModalOpen(true)}
                    >
                      <Send className='mr-2 h-4 w-4' />
                      <span>Send Offer</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Call Management</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setLogCallModalOpen(true)}>
                      <Phone className='mr-2 h-4 w-4' />
                      <span>Log Call / Schedule Callback</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setMarkVipModalOpen(true)}>
                      <Crown className='mr-2 h-4 w-4' />
                      <span>Mark as VIP</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h3 className='mb-4 flex items-center gap-2 text-sm font-semibold'>
              <FileText className='h-4 w-4' />
              Timeline
            </h3>

            <div className='space-y-4'>
              {historyItems.length === 0 ? (
                <div className='text-muted-foreground flex flex-col items-center justify-center py-8 text-center'>
                  <FileText className='mb-2 h-8 w-8 opacity-50' />
                  <p className='text-sm'>No activity yet</p>
                  <p className='mt-1 text-xs'>
                    Activity will appear here as actions are taken
                  </p>
                </div>
              ) : (
                historyItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={item.id}>
                      <div className='flex gap-3'>
                        <div className='flex flex-col items-center'>
                          <div className='bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full'>
                            <Icon className='text-primary h-4 w-4' />
                          </div>
                          {index < historyItems.length - 1 && (
                            <div className='bg-border mt-2 h-full min-h-[40px] w-px' />
                          )}
                        </div>
                        <div className='flex-1 pb-4'>
                          <div className='mb-1 flex items-start justify-between gap-2'>
                            <div className='text-sm font-medium'>
                              {item.title}
                            </div>
                            {item.badgeText && (
                              <Badge
                                variant={item.badgeVariant}
                                className='shrink-0'
                              >
                                {item.badgeText}
                              </Badge>
                            )}
                          </div>
                          <p className='text-muted-foreground mb-2 text-sm'>
                            {item.description}
                          </p>

                          {/* Author information */}
                          {item.author && (
                            <div className='mb-2 flex items-center gap-1.5'>
                              <User className='text-muted-foreground h-3 w-3' />
                              <span className='text-muted-foreground text-xs'>
                                {item.author.name}
                                {item.author.role && (
                                  <span className='text-muted-foreground/70'>
                                    {' '}
                                    • {item.author.role}
                                  </span>
                                )}
                              </span>
                            </div>
                          )}

                          {item.type === 'offer' &&
                            item.metadata?.offerDetails && (
                              <Collapsible
                                open={expandedOffers.has(item.id)}
                                onOpenChange={() => handleToggleOffer(item.id)}
                                className='mt-2'
                              >
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant='outline'
                                    size='sm'
                                    className='h-7 w-full justify-start text-xs'
                                  >
                                    {expandedOffers.has(item.id) ? (
                                      <EyeOff className='mr-1 h-3 w-3' />
                                    ) : (
                                      <Eye className='mr-1 h-3 w-3' />
                                    )}
                                    {expandedOffers.has(item.id)
                                      ? 'Hide'
                                      : 'Show'}{' '}
                                    {item.metadata.offerDetails.length > 1
                                      ? `${item.metadata.offerDetails.length} Offers`
                                      : 'Offer Details'}
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className='mt-3'>
                                  <div className='space-y-3'>
                                    {item.metadata.offerDetails.map(
                                      (offer, offerIndex) => (
                                        <Card
                                          key={`offer-${item.id}-${offerIndex}`}
                                          className='border-2'
                                        >
                                          <CardContent className='space-y-3 p-4'>
                                            <div>
                                              <Badge
                                                variant='outline'
                                                className='mb-2'
                                              >
                                                Option {offerIndex + 1}
                                              </Badge>
                                              <h4 className='text-sm font-semibold'>
                                                {offer.vehicleName ||
                                                  `${carRequest?.brand?.name} ${carRequest?.model?.name}`}
                                              </h4>
                                            </div>

                                            <Separator />

                                            <div className='grid grid-cols-2 gap-2'>
                                              <div>
                                                <div className='text-muted-foreground mb-1 text-xs'>
                                                  Monthly Payment
                                                </div>
                                                <div className='text-lg font-bold'>
                                                  €{offer.monthlyPayment}
                                                </div>
                                              </div>
                                              <div>
                                                <div className='text-muted-foreground mb-1 text-xs'>
                                                  Term
                                                </div>
                                                <div className='text-lg font-bold'>
                                                  {offer.term} months
                                                </div>
                                              </div>
                                            </div>

                                            <Separator />

                                            <div className='space-y-2'>
                                              <div className='flex items-center justify-between text-xs'>
                                                <span className='text-muted-foreground'>
                                                  Down Payment
                                                </span>
                                                <span className='font-semibold'>
                                                  €
                                                  {offer.downPayment.toLocaleString()}
                                                </span>
                                              </div>
                                              <div className='flex items-center justify-between text-xs'>
                                                <span className='text-muted-foreground'>
                                                  Interest Rate
                                                </span>
                                                <span className='font-semibold'>
                                                  {offer.interestRate}%
                                                </span>
                                              </div>
                                              <Separator />
                                              <div className='flex items-center justify-between'>
                                                <span className='text-xs font-semibold'>
                                                  Total Price
                                                </span>
                                                <span className='text-primary text-base font-bold'>
                                                  €
                                                  {offer.totalPrice.toLocaleString()}
                                                </span>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      )
                                    )}

                                    <Button size='sm' className='mt-2 w-full'>
                                      <Mail className='mr-2 h-3 w-3' />
                                      Resend{' '}
                                      {item.metadata.offerDetails.length > 1
                                        ? 'Offers'
                                        : 'Offer'}
                                    </Button>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            )}

                          <div className='text-muted-foreground mt-2 text-xs'>
                            {formatDistanceToNow(item.timestamp, {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className='mb-4 flex items-center gap-2 text-sm font-semibold'>
              <Globe className='h-4 w-4' />
              Visitor Behavior
            </h3>
            <Card>
              <CardContent className='space-y-4 p-4'>
                <div>
                  <div className='text-muted-foreground mb-1 text-xs font-medium'>
                    Traffic Source
                  </div>
                  <div className='text-sm font-medium'>
                    {visitorBehavior.source}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className='text-muted-foreground mb-1 text-xs font-medium'>
                    Device
                  </div>
                  <div className='flex items-center gap-2'>
                    <Monitor className='h-4 w-4' />
                    <span className='text-sm font-medium'>
                      {visitorBehavior.device}
                    </span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className='text-muted-foreground mb-1 text-xs font-medium'>
                    Browser
                  </div>
                  <div className='flex items-center gap-2'>
                    <Chrome className='h-4 w-4' />
                    <span className='text-sm font-medium'>
                      {visitorBehavior.browser}
                    </span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className='text-muted-foreground mb-1 text-xs font-medium'>
                    Location
                  </div>
                  <div className='text-sm font-medium'>
                    {visitorBehavior.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div>
            <h3 className='mb-4 text-sm font-semibold'>Pages Visited</h3>
            <Card>
              <CardContent className='p-4'>
                <div className='space-y-3'>
                  {visitorBehavior.pagesVisited.map((page, pageIndex) => (
                    <div key={`page-${pageIndex}`}>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>{page.page}</span>
                        <Badge variant='outline' className='text-xs'>
                          {page.time}
                        </Badge>
                      </div>
                      {pageIndex < visitorBehavior.pagesVisited.length - 1 && (
                        <Separator className='mt-3' />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {carRequest && (
            <>
              <Separator />
              <div>
                <h3 className='mb-4 text-sm font-semibold'>Request Details</h3>
                <Card>
                  <CardContent className='space-y-3 p-4 text-sm'>
                    {carRequest.requestFirstName && (
                      <div>
                        <div className='text-muted-foreground text-xs font-medium'>
                          Name
                        </div>
                        <div className='font-medium'>
                          {carRequest.requestFirstName}{' '}
                          {carRequest.requestLastName}
                        </div>
                      </div>
                    )}
                    {carRequest.requestEmail && (
                      <>
                        <Separator />
                        <div>
                          <div className='text-muted-foreground text-xs font-medium'>
                            Email
                          </div>
                          <div className='font-medium'>
                            {carRequest.requestEmail}
                          </div>
                        </div>
                      </>
                    )}
                    {carRequest.requestPhone && (
                      <>
                        <Separator />
                        <div>
                          <div className='text-muted-foreground text-xs font-medium'>
                            Phone
                          </div>
                          <div className='font-medium'>
                            {carRequest.requestPhone}
                          </div>
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

      {carRequestId && (
        <>
          <AddMessageModal
            open={addMessageModalOpen}
            onOpenChange={setAddMessageModalOpen}
            carRequestId={carRequestId}
            onSuccess={onRefresh}
          />
          <MarkVipModal
            open={markVipModalOpen}
            onOpenChange={setMarkVipModalOpen}
            carRequestId={carRequestId}
            customerName={
              carRequest?.requestFirstName && carRequest?.requestLastName
                ? `${carRequest.requestFirstName} ${carRequest.requestLastName}`
                : undefined
            }
            onSuccess={onRefresh}
          />
          <LogCallModal
            open={logCallModalOpen}
            onOpenChange={setLogCallModalOpen}
            carRequestId={carRequestId}
            onSuccess={onRefresh}
          />
          <SendOfferModal
            open={sendOfferModalOpen}
            onOpenChange={setSendOfferModalOpen}
            carRequestId={carRequestId}
            customerName={
              carRequest?.requestFirstName && carRequest?.requestLastName
                ? `${carRequest.requestFirstName} ${carRequest.requestLastName}`
                : undefined
            }
            onSuccess={onRefresh}
          />
          <AssignAgentModal
            open={assignAgentModalOpen}
            onOpenChange={setAssignAgentModalOpen}
            carRequestId={carRequestId}
            currentAgentId={carRequest?.assignedAgentId}
            onSuccess={onRefresh}
          />
        </>
      )}
    </div>
  )
}
