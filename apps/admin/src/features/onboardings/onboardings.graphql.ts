import { graphql } from '@/gql';

/**
 * Get All Onboardings Query
 * Fetches all onboarding sessions with filters
 */
export const GET_ALL_ONBOARDINGS = graphql(`
  query GetAllOnboardings($status: OnboardingStatus, $leasingCompanyId: String) {
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
        validationStatus
      }
    }
  }
`);

/**
 * Get Single Onboarding Query
 * Fetches a single onboarding with full details
 */
export const GET_ONBOARDING = graphql(`
  query GetOnboarding($id: String!) {
    onboarding(id: $id) {
      id
      token
      status
      expiresAt
      completedAt
      lastReminderSentAt
      createdAt
      updatedAt
      carRequest {
        id
        requestFirstName
        requestLastName
        requestEmail
        requestPhone
        financingType
        customer {
          id
          firstName
          lastName
          email
          phone
        }
        brand {
          id
          name
        }
        model {
          id
          name
        }
      }
      leasingCompany {
        id
        name
        link
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
          relativePath
          size
          sizeFormatted
          mimeType
          extension
        }
        documentTemplate {
          id
          name
          fieldName
          description
          helpText
          isRequired
          acceptedFormats
          maxSizeBytes
        }
        validatedBy {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`);

/**
 * Get Required Documents for Onboarding Query
 * Fetches document templates required for an onboarding
 */
export const GET_REQUIRED_DOCUMENTS_FOR_ONBOARDING = graphql(`
  query GetRequiredDocumentsForOnboarding($onboardingId: String!) {
    requiredDocumentsForOnboarding(onboardingId: $onboardingId) {
      id
      name
      fieldName
      description
      helpText
      isRequired
      acceptedFormats
      maxSizeBytes
      displayOrder
    }
  }
`);

/**
 * Create Onboarding Mutation
 * Creates a new onboarding session for a car request
 */
export const CREATE_ONBOARDING = graphql(`
  mutation CreateOnboarding($carRequestId: String!, $expirationDays: Float) {
    createOnboarding(carRequestId: $carRequestId, expirationDays: $expirationDays) {
      id
      token
      status
      expiresAt
      createdAt
    }
  }
`);

/**
 * Validate Document Mutation
 * Approves or rejects a document
 */
export const VALIDATE_DOCUMENT = graphql(`
  mutation ValidateDocument($documentId: String!, $input: ValidateDocumentInput!) {
    validateDocument(documentId: $documentId, input: $input) {
      id
      validationStatus
      validationNote
      validatedAt
      validatedBy {
        id
        firstName
        lastName
      }
    }
  }
`);

/**
 * Send Onboarding Reminder Mutation
 * Sends a reminder email for incomplete onboarding
 */
export const SEND_ONBOARDING_REMINDER = graphql(`
  mutation SendOnboardingReminder($onboardingId: String!) {
    sendOnboardingReminder(onboardingId: $onboardingId)
  }
`);

/**
 * Update Onboarding Status Mutation
 * Manually updates onboarding status
 */
export const UPDATE_ONBOARDING_STATUS = graphql(`
  mutation UpdateOnboardingStatus($onboardingId: String!, $status: OnboardingStatus!) {
    updateOnboardingStatus(onboardingId: $onboardingId, status: $status)
  }
`);
