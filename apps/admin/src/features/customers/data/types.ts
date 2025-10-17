import { type GetAllCustomersQuery } from '@/gql/graphql'

/**
 * Customer type extracted from GraphQL query
 */
export type Customer = GetAllCustomersQuery['users'][number]

/**
 * Customer statistics
 */
export interface CustomerStats {
  totalRequests: number
  activeRequests: number
  completedRequests: number
  onboardingProgress: number
}

/**
 * Customer filter options
 */
export interface CustomerFilters {
  search?: string
  isActive?: boolean
  hasActiveRequests?: boolean
}
