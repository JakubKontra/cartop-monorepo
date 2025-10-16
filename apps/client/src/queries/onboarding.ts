import { graphql } from '../gql';

/**
 * Get Onboarding By Token Query
 * Fetches onboarding session details using public token
 * No authentication required
 */
export const GET_ONBOARDING_BY_TOKEN_QUERY = graphql(`
  query GetOnboardingByToken($token: String!) {
    onboardingByToken(token: $token) {
      id
      token
      status
      expiresAt
      completedAt
      createdAt
      carRequest {
        id
        requestFirstName
        requestLastName
        requestEmail
        requestPhone
        financingType
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
        validationStatus
        validationNote
        file {
          id
          name
          url
          size
          sizeFormatted
          mimeType
          extension
        }
        documentTemplate {
          id
          name
          fieldName
        }
      }
    }
  }
`);

/**
 * Get Required Documents By Token Query
 * Fetches document templates required for onboarding
 * No authentication required
 */
export const GET_REQUIRED_DOCUMENTS_BY_TOKEN_QUERY = graphql(`
  query GetRequiredDocumentsByToken($token: String!) {
    requiredDocumentsByToken(token: $token) {
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
 * Upload Onboarding Document Mutation
 * Links an uploaded file to a document template in the onboarding
 * No authentication required (uses token)
 */
export const UPLOAD_ONBOARDING_DOCUMENT_MUTATION = graphql(`
  mutation UploadOnboardingDocument($token: String!, $input: UploadDocumentInput!) {
    uploadOnboardingDocument(token: $token, input: $input) {
      id
      uploadedAt
      validationStatus
      file {
        id
        name
        url
        size
        sizeFormatted
        mimeType
        extension
      }
      documentTemplate {
        id
        name
        fieldName
      }
    }
  }
`);

/**
 * Generate Upload URL Public Mutation
 * Gets a pre-signed URL for uploading files directly to storage
 * No authentication required
 */
export const GENERATE_UPLOAD_URL_PUBLIC_MUTATION = graphql(`
  mutation GenerateUploadUrlPublic($filename: String!, $contentType: String!) {
    generateUploadUrlPublic(filename: $filename, contentType: $contentType)
  }
`);

/**
 * Create File Public Mutation
 * Creates a file record in the database after uploading to storage
 * No authentication required
 */
export const CREATE_FILE_PUBLIC_MUTATION = graphql(`
  mutation CreateFilePublic($input: CreateFileInput!) {
    createFilePublic(input: $input) {
      id
      name
      url
      relativePath
      size
      sizeFormatted
      mimeType
      extension
      checksum
      width
      height
      createdAt
    }
  }
`);
