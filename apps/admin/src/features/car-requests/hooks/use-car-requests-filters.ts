import { useState, useMemo } from 'react'
import type { GetAllCarRequestsQuery } from '@/gql/graphql'
import {
  type CarRequestSection,
  type CarRequestStateCode,
  needsFollowUpAfterOffer,
} from '../constants/states'

type CarRequest = GetAllCarRequestsQuery['allCarRequests'][0]

interface UseCarRequestsFiltersOptions {
  requests: CarRequest[]
}

export function useCarRequestsFilters({ requests }: UseCarRequestsFiltersOptions) {
  const [activeSection, setActiveSection] = useState<CarRequestSection>('NEW')
  const [activeStateFilter, setActiveStateFilter] = useState<CarRequestStateCode | null>(null)

  // Filter requests by section
  const sectionFilteredRequests = useMemo(() => {
    switch (activeSection) {
      case 'NEW':
        // New requests are those without an assigned agent
        return requests.filter((req) => !req.assignedAgentId)

      case 'OPEN':
        // Open requests have an assigned agent and are not in a final state
        return requests.filter(
          (req) =>
            req.assignedAgentId &&
            !req.waitingForOffer &&
            req.state?.code !== 'PURCHASED' &&
            req.state?.code !== 'CANCELLED'
        )

      case 'WAITING_FOR_OFFER':
        // Waiting for offer requests have the waitingForOffer flag set
        return requests.filter((req) => req.waitingForOffer === true)

      case 'FOLLOW_UP_NEEDED':
        // Follow-up needed: offers sent more than 1 day ago
        return requests.filter((req) =>
          needsFollowUpAfterOffer(req.state?.code, req.offersSentAt)
        )

      default:
        return requests
    }
  }, [requests, activeSection])

  // Filter requests by state
  const filteredRequests = useMemo(() => {
    if (!activeStateFilter) {
      return sectionFilteredRequests
    }

    return sectionFilteredRequests.filter((req) => req.state?.code === activeStateFilter)
  }, [sectionFilteredRequests, activeStateFilter])

  // Count requests by section
  const sectionCounts = useMemo(() => {
    const counts: Record<CarRequestSection, number> = {
      NEW: 0,
      OPEN: 0,
      WAITING_FOR_OFFER: 0,
      FOLLOW_UP_NEEDED: 0,
    }

    requests.forEach((req) => {
      if (!req.assignedAgentId) {
        counts.NEW++
      } else if (req.waitingForOffer === true) {
        counts.WAITING_FOR_OFFER++
      } else if (needsFollowUpAfterOffer(req.state?.code, req.offersSentAt)) {
        counts.FOLLOW_UP_NEEDED++
      } else if (
        req.state?.code !== 'PURCHASED' &&
        req.state?.code !== 'CANCELLED'
      ) {
        counts.OPEN++
      }
    })

    return counts
  }, [requests])

  // Count requests by state (within current section)
  const stateCounts = useMemo(() => {
    const counts: Partial<Record<CarRequestStateCode, number>> = {}

    sectionFilteredRequests.forEach((req) => {
      if (req.state?.code) {
        const code = req.state.code as CarRequestStateCode
        counts[code] = (counts[code] || 0) + 1
      }
    })

    return counts
  }, [sectionFilteredRequests])

  return {
    // Current filters
    activeSection,
    activeStateFilter,

    // Filtered data
    filteredRequests,
    sectionFilteredRequests,

    // Counts
    sectionCounts,
    stateCounts,

    // Filter setters
    setActiveSection,
    setActiveStateFilter,

    // Helper to clear all filters
    clearFilters: () => {
      setActiveStateFilter(null)
    },
  }
}
