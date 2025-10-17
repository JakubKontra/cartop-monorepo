import { gql } from '@apollo/client'

// Query to get all offers - returns base Offer type with common fields only
export const GET_ALL_OFFERS = gql`
  query GetAllVehicleOffers($filters: OfferFiltersInput) {
    allOffers(filters: $filters) {
      __typename
      id
      type
      isPublic
      isActive
      totalPrice
      description
      slug
      modelGenerationId
      brandId
      modelId
      createdAt
      updatedAt

      modelGeneration {
        id
        name
      }

      # Operational Leasing fields (will be null for other types)
      leasingDurationMonths
      monthlyPayment
      annualMileageLimit
      downPaymentLeasing
      hasServiceIncluded
      hasWinterTyresIncluded
      hasAssistanceServiceIncluded
      hasGapIncluded

      # Direct Purchase fields (will be null for other types)
      discountAmount
      discountPercentage
      includesWarranty
      warrantyYears
      financingAvailable

      # Individual Offer fields (will be null for other types)
      customerId
      status
      customRequirements
      internalNotes
      assignedToId
      responseDeadline
    }
  }
`

// Query to get a single offer
export const GET_OFFER = gql`
  query GetOffer($id: String!) {
    offer(id: $id) {
      __typename
      id
      type
      isPublic
      isActive
      totalPrice
      description
      slug
      modelGenerationId
      brandId
      modelId
      createdAt
      updatedAt

      modelGeneration {
        id
        name
      }

      # All possible fields
      leasingDurationMonths
      monthlyPayment
      annualMileageLimit
      downPaymentLeasing
      hasServiceIncluded
      hasWinterTyresIncluded
      hasAssistanceServiceIncluded
      hasGapIncluded

      discountAmount
      discountPercentage
      includesWarranty
      warrantyYears
      financingAvailable

      customerId
      status
      customRequirements
      internalNotes
      assignedToId
      responseDeadline
    }
  }
`

// Query to get individual offers
export const GET_INDIVIDUAL_OFFERS = gql`
  query GetIndividualOffers($filters: OfferFiltersInput) {
    individualOffers(filters: $filters) {
      __typename
      id
      type
      isPublic
      isActive
      totalPrice
      description
      slug
      modelGenerationId
      brandId
      modelId
      createdAt
      updatedAt

      modelGeneration {
        id
        name
      }

      customerId
      status
      customRequirements
      internalNotes
      assignedToId
      responseDeadline
    }
  }
`

// Mutation to create operational leasing offer
export const CREATE_OPERATIONAL_LEASING_OFFER = gql`
  mutation CreateOperationalLeasingOffer(
    $input: CreateOperationalLeasingOfferInput!
  ) {
    createOperationalLeasingOffer(input: $input) {
      __typename
      id
      type
      isPublic
      isActive
      totalPrice
      description
      slug
      modelGenerationId
      brandId
      modelId
      createdAt
      updatedAt

      modelGeneration {
        id
        name
      }

      leasingDurationMonths
      monthlyPayment
      annualMileageLimit
      downPaymentLeasing
      hasServiceIncluded
      hasWinterTyresIncluded
      hasAssistanceServiceIncluded
      hasGapIncluded
    }
  }
`

// Mutation to create direct purchase offer
export const CREATE_DIRECT_PURCHASE_OFFER = gql`
  mutation CreateDirectPurchaseOffer($input: CreateDirectPurchaseOfferInput!) {
    createDirectPurchaseOffer(input: $input) {
      __typename
      id
      type
      isPublic
      isActive
      totalPrice
      description
      slug
      modelGenerationId
      brandId
      modelId
      createdAt
      updatedAt

      modelGeneration {
        id
        name
      }

      discountAmount
      discountPercentage
      includesWarranty
      warrantyYears
      financingAvailable
    }
  }
`

// Mutation to create individual offer
export const CREATE_INDIVIDUAL_OFFER = gql`
  mutation CreateIndividualOffer($input: CreateIndividualOfferInput!) {
    createIndividualOffer(input: $input) {
      __typename
      id
      type
      isPublic
      isActive
      totalPrice
      description
      slug
      modelGenerationId
      brandId
      modelId
      createdAt
      updatedAt

      modelGeneration {
        id
        name
      }

      customerId
      status
      customRequirements
      internalNotes
      assignedToId
      responseDeadline
    }
  }
`

// Mutation to update offer - returns base Offer type
export const UPDATE_OFFER = gql`
  mutation UpdateOffer($id: String!, $input: UpdateOfferInput!) {
    updateOffer(id: $id, input: $input) {
      __typename
      id
      type
      isPublic
      isActive
      totalPrice
      description
      slug
      modelGenerationId
      brandId
      modelId
      createdAt
      updatedAt

      modelGeneration {
        id
        name
      }

      # All possible fields
      leasingDurationMonths
      monthlyPayment
      annualMileageLimit
      downPaymentLeasing
      hasServiceIncluded
      hasWinterTyresIncluded
      hasAssistanceServiceIncluded
      hasGapIncluded

      discountAmount
      discountPercentage
      includesWarranty
      warrantyYears
      financingAvailable

      customerId
      status
      customRequirements
      internalNotes
      assignedToId
      responseDeadline
    }
  }
`

// Mutation to update individual offer status
export const UPDATE_INDIVIDUAL_OFFER_STATUS = gql`
  mutation UpdateIndividualOfferStatus(
    $id: String!
    $status: IndividualOfferStatus!
  ) {
    updateIndividualOfferStatus(id: $id, status: $status) {
      __typename
      id
      type
      isPublic
      isActive
      totalPrice
      description
      slug
      modelGenerationId
      brandId
      modelId
      createdAt
      updatedAt

      modelGeneration {
        id
        name
      }

      customerId
      status
      customRequirements
      internalNotes
      assignedToId
      responseDeadline
    }
  }
`

// Mutation to delete offer
export const DELETE_OFFER = gql`
  mutation DeleteOffer($id: String!) {
    deleteOffer(id: $id)
  }
`

// Export alias for consistency
export const GET_OFFER_BY_ID = GET_OFFER
