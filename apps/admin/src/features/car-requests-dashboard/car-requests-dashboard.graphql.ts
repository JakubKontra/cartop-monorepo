import { graphql } from '@/gql';

export const CAR_REQUESTS_DASHBOARD_STATS_QUERY = graphql(`
  query CarRequestsDashboardStats {
    carRequestsDashboardStats {
      overview {
        activeCarRequests
        totalVehicles
        awaitingAction
        completedOnboardingsThisMonth
        activeCarRequestsChange
        totalVehiclesChange
      }
      topBrands {
        brandId
        brandName
        calculationsCount
        percentage
      }
      agentPerformance {
        agentId
        agentName
        carRequestsCount
        vehiclesCount
        conversionRate
        averageProcessingDays
      }
      leasingCompanies {
        leasingCompanyId
        leasingCompanyName
        calculationsCount
        completedOnboardingsCount
        conversionRate
      }
      timeline {
        date
        newCarRequests
        completedOnboardings
      }
      funnel {
        created
        hasOffers
        leasingCompanySelected
        onboardingComplete
        ordered
      }
    }
  }
`);
