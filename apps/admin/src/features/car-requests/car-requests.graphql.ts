import { graphql } from '@/gql';

/**
 * Get All Car Requests Query
 * Fetches all car requests (admin view)
 */
export const GET_ALL_CAR_REQUESTS = graphql(`
  query GetAllCarRequests($limit: Float, $offset: Float) {
    allCarRequests(limit: $limit, offset: $offset) {
      id
      isFromLegacySystem
      legacySystemId
      createdAt
      modifiedAt
      notes
      financingType
      requestEmail
      requestPhone
      requestFirstName
      requestLastName
      requestNewsletter
      requestPostalCode
      customer {
        id
        firstName
        lastName
        email
      }
      customerId
      assignedAgent {
        id
        firstName
        lastName
        email
      }
      assignedAgentId
      brand {
        id
        name
        slug
      }
      brandId
      model {
        id
        name
        slug
      }
      modelId
      leasingCompany {
        id
        name
      }
      leasingCompanyId
      order
      gclid
      noteInternal
      completedAt
      nextCallAt
      confirmedAt
      relayedAt
      feedbackAt
      closedAt
      waitingForOffer
      offersSentAt
      deliveryExpectedAt
      carDelivered
      displayOrder
      cancellationReason
      cancellationNote
      status {
        id
        name
        code
        colorHex
        isFinal
      }
      statusId
      state {
        id
        name
        code
        colorHex
      }
      stateId
    }
  }
`);

/**
 * Get Single Car Request Query
 * Fetches a single car request by ID with activity logs
 */
export const GET_CAR_REQUEST = graphql(`
  query GetCarRequest($id: String!) {
    carRequest(id: $id) {
      id
      isFromLegacySystem
      legacySystemId
      createdAt
      modifiedAt
      notes
      financingType
      requestEmail
      requestPhone
      requestFirstName
      requestLastName
      requestNewsletter
      requestPostalCode
      customer {
        id
        firstName
        lastName
        email
      }
      customerId
      assignedAgent {
        id
        firstName
        lastName
        email
      }
      assignedAgentId
      brand {
        id
        name
        slug
      }
      brandId
      model {
        id
        name
        slug
      }
      modelId
      leasingCompany {
        id
        name
      }
      leasingCompanyId
      order
      gclid
      noteInternal
      completedAt
      nextCallAt
      confirmedAt
      relayedAt
      feedbackAt
      closedAt
      waitingForOffer
      offersSentAt
      deliveryExpectedAt
      carDelivered
      displayOrder
      cancellationReason
      cancellationNote
      status {
        id
        name
        code
        colorHex
        isFinal
      }
      statusId
      state {
        id
        name
        code
        colorHex
      }
      stateId
      logs {
        id
        createdAt
        message
        actionType
        metadata
        carRequestId
        author {
          id
          firstName
          lastName
          email
        }
        authorId
        legacySystemId
      }
    }
  }
`);

/**
 * Create Car Request Mutation
 * Creates a new car request
 */
export const CREATE_CAR_REQUEST = graphql(`
  mutation CreateCarRequest($input: CreateCarRequestInput!) {
    createCarRequest(input: $input) {
      id
      createdAt
      modifiedAt
    }
  }
`);

/**
 * Update Car Request Mutation
 * Updates an existing car request
 */
export const UPDATE_CAR_REQUEST = graphql(`
  mutation UpdateCarRequest($id: String!, $input: UpdateCarRequestInput!) {
    updateCarRequest(id: $id, input: $input) {
      id
      modifiedAt
    }
  }
`);

/**
 * Delete Car Request Mutation
 * Deletes a car request
 */
export const DELETE_CAR_REQUEST = graphql(`
  mutation DeleteCarRequest($id: String!) {
    deleteCarRequest(id: $id)
  }
`);

/**
 * Get All Car Request States Query
 * Fetches all available car request states
 */
export const GET_ALL_CAR_REQUEST_STATES = graphql(`
  query GetAllCarRequestStates {
    allCarRequestStates {
      id
      name
      code
      colorHex
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get All Car Request Statuses Query
 * Fetches all available car request statuses
 */
export const GET_ALL_CAR_REQUEST_STATUSES = graphql(`
  query GetAllCarRequestStatuses {
    allCarRequestStatuses {
      id
      name
      code
      colorHex
      isFinal
      displayOrder
      columnDisplayOrder
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get Car Request Logs Query
 * Fetches activity logs for a car request with optional filtering
 */
export const GET_CAR_REQUEST_LOGS = graphql(`
  query GetCarRequestLogs($filter: CarRequestLogFilterInput!) {
    carRequestLogs(filter: $filter) {
      id
      createdAt
      message
      actionType
      metadata
      carRequestId
      author {
        id
        firstName
        lastName
        email
      }
      authorId
      legacySystemId
    }
  }
`);

/**
 * Create Car Request Log Mutation
 * Creates a new activity log entry for a car request
 */
export const CREATE_CAR_REQUEST_LOG = graphql(`
  mutation CreateCarRequestLog($input: CreateCarRequestLogInput!) {
    createCarRequestLog(input: $input) {
      id
      createdAt
      message
      actionType
      metadata
      carRequestId
      author {
        id
        firstName
        lastName
        email
      }
      authorId
      legacySystemId
    }
  }
`);

/**
 * Get All Offers Query
 * Fetches all offers (for sending to customers)
 */
export const GET_ALL_OFFERS = graphql(`
  query GetAllOffers {
    allOffers {
      id
      type
      isPublic
      isActive
      totalPrice
      description
      slug
      modelGeneration {
        id
        name
      }
      brand {
        id
        name
      }
      model {
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
      discountAmount
      discountPercentage
      includesWarranty
      warrantyYears
      financingAvailable
      createdAt
      updatedAt
    }
  }
`);

