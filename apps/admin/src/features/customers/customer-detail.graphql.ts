import { graphql } from '@/gql'

/**
 * Get customer detail with all relationships
 */
export const GET_CUSTOMER_DETAIL = graphql(`
  query GetCustomerDetail($id: String!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      phone
      bio
      roles
      isActive
      avatar {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`)

/**
 * Get all onboardings with full document details for customer detail page
 */
export const GET_ONBOARDINGS_WITH_DOCUMENTS = graphql(`
  query GetOnboardingsWithDocuments($status: OnboardingStatus, $leasingCompanyId: String) {
    allOnboardings(status: $status, leasingCompanyId: $leasingCompanyId) {
      id
      token
      status
      expiresAt
      completedAt
      createdAt
      updatedAt
      carRequest {
        id
        requestFirstName
        requestLastName
        requestEmail
        customer {
          id
          firstName
          lastName
          email
        }
      }
      leasingCompany {
        id
        name
        logo {
          id
          url
        }
      }
      documents {
        id
        uploadedAt
        updatedAt
        validationStatus
        validationNote
        validatedAt
        file {
          id
          name
          url
          size
          mimeType
        }
        documentTemplate {
          id
          name
          fieldName
        }
        validatedBy {
          id
          firstName
          lastName
        }
      }
    }
  }
`)

/**
 * Get user activity from audit logs
 */
export const GET_USER_ACTIVITY = graphql(`
  query GetUserActivity($userId: String!, $limit: Float) {
    userActivity(userId: $userId, limit: $limit) {
      id
      action
      entityName
      entityId
      changes
      userId
      userEmail
      ipAddress
      userAgent
      createdAt
    }
  }
`)

/**
 * Get car request count
 */
export const GET_CAR_REQUESTS_COUNT = graphql(`
  query GetCarRequestsCount {
    carRequestsCount
  }
`)
