import { graphql } from '@/gql';

// Leasing Companies Query (needed for offer quote dialog)
export const GET_LEASING_COMPANIES = graphql(`
  query GetLeasingCompanies {
    leasingCompanies {
      id
      name
    }
  }
`);

// Fragments
export const CALCULATION_ITEM_FRAGMENT = graphql(`
  fragment CalculationItem on CarRequestCalculationItem {
    id
    itemType
    name
    description
    priceImpact
    isRequired
    isIncluded
    displayOrder
    catalogColor {
      id
      name
      color
    }
    createdAt
  }
`);

export const CALCULATION_OFFER_FRAGMENT = graphql(`
  fragment CalculationOffer on CarRequestCalculationOffer {
    id
    status
    monthlyPayment
    downPayment
    totalPrice
    interestRate
    adminFee
    includesService
    includesWinterTires
    includesGap
    includesAssistance
    termsAndConditions
    validUntil
    notes
    leasingCompany {
      id
      name
      logo {
        id
        url
      }
    }
    quotedBy {
      id
      firstName
      lastName
      email
    }
    quotedAt
    createdAt
    updatedAt
  }
`);

export const CALCULATION_FRAGMENT = graphql(`
  fragment Calculation on CarRequestCalculation {
    id
    version
    status
    durationMonths
    annualMileageKm
    deliveryExpectedAt
    notes
    internalNotes
    requestedBy {
      id
      firstName
      lastName
      email
    }
    assignedTo {
      id
      firstName
      lastName
      email
    }
    createdAt
    updatedAt
    submittedAt
    completedAt
  }
`);

// Queries
export const GET_CALCULATION = graphql(`
  query GetCalculation($id: ID!) {
    calculation(id: $id) {
      ...Calculation
      carRequest {
        id
        brand {
          id
          name
        }
        model {
          id
          name
        }
      }
      offers {
        ...CalculationOffer
      }
      items {
        ...CalculationItem
      }
    }
  }
`);

export const GET_CALCULATIONS_BY_CAR_REQUEST = graphql(`
  query GetCalculationsByCarRequest($carRequestId: ID!) {
    calculationsByCarRequest(carRequestId: $carRequestId) {
      ...Calculation
      offers {
        id
        status
        leasingCompany {
          id
          name
        }
      }
      items {
        id
        itemType
        name
      }
    }
  }
`);

export const GET_PENDING_CALCULATIONS = graphql(`
  query GetPendingCalculations {
    pendingCalculations {
      ...Calculation
      carRequest {
        id
        brand {
          id
          name
        }
        model {
          id
          name
        }
        customer {
          id
          firstName
          lastName
          email
        }
      }
      offers {
        id
        status
        leasingCompany {
          id
          name
        }
      }
    }
  }
`);

// Mutations
export const CREATE_CALCULATION = graphql(`
  mutation CreateCalculation($input: CreateCalculationInput!) {
    createCalculation(input: $input) {
      ...Calculation
    }
  }
`);

export const UPDATE_CALCULATION = graphql(`
  mutation UpdateCalculation($id: ID!, $input: UpdateCalculationInput!) {
    updateCalculation(id: $id, input: $input) {
      ...Calculation
    }
  }
`);

export const SUBMIT_CALCULATION = graphql(`
  mutation SubmitCalculation($id: ID!) {
    submitCalculation(id: $id) {
      ...Calculation
    }
  }
`);

export const START_PROCESSING_CALCULATION = graphql(`
  mutation StartProcessingCalculation($id: ID!) {
    startProcessingCalculation(id: $id) {
      ...Calculation
    }
  }
`);

export const COMPLETE_CALCULATION = graphql(`
  mutation CompleteCalculation($id: ID!) {
    completeCalculation(id: $id) {
      ...Calculation
    }
  }
`);

export const ADD_OFFER_QUOTE = graphql(`
  mutation AddOfferQuote($input: AddOfferQuoteInput!) {
    addOfferQuote(input: $input) {
      ...CalculationOffer
    }
  }
`);

export const UPDATE_OFFER_QUOTE = graphql(`
  mutation UpdateOfferQuote($offerId: ID!, $input: UpdateOfferQuoteInput!) {
    updateOfferQuote(offerId: $offerId, input: $input) {
      ...CalculationOffer
    }
  }
`);

export const DELETE_CALCULATION = graphql(`
  mutation DeleteCalculation($id: ID!) {
    deleteCalculation(id: $id)
  }
`);
