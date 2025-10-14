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
 * Fetches a single car request by ID
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
