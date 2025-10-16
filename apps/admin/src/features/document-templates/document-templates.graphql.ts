import { graphql } from '@/gql';

/**
 * Get All Document Templates Query
 * Fetches all document templates, optionally filtered by leasing company
 */
export const GET_ALL_DOCUMENT_TEMPLATES = graphql(`
  query GetAllDocumentTemplates($leasingCompanyId: String) {
    allDocumentTemplates(leasingCompanyId: $leasingCompanyId) {
      id
      name
      fieldName
      description
      helpText
      isRequired
      acceptedFormats
      maxSizeBytes
      displayOrder
      isGlobal
      createdAt
      updatedAt
      leasingCompany {
        id
        name
      }
    }
  }
`);

/**
 * Get Document Templates by Leasing Company Query
 * Fetches all document templates for a specific leasing company
 */
export const GET_DOCUMENT_TEMPLATES_BY_LEASING_COMPANY = graphql(`
  query GetDocumentTemplatesByLeasingCompany($leasingCompanyId: String!) {
    documentTemplatesByLeasingCompany(leasingCompanyId: $leasingCompanyId) {
      id
      name
      fieldName
      description
      helpText
      isRequired
      acceptedFormats
      maxSizeBytes
      displayOrder
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get Single Document Template Query
 * Fetches a single document template by ID
 */
export const GET_DOCUMENT_TEMPLATE = graphql(`
  query GetDocumentTemplate($id: String!) {
    documentTemplate(id: $id) {
      id
      name
      fieldName
      description
      helpText
      isRequired
      acceptedFormats
      maxSizeBytes
      displayOrder
      isGlobal
      createdAt
      updatedAt
      leasingCompany {
        id
        name
      }
    }
  }
`);

/**
 * Create Document Template Mutation
 * Creates a new document template
 */
export const CREATE_DOCUMENT_TEMPLATE = graphql(`
  mutation CreateDocumentTemplate($input: CreateDocumentTemplateInput!) {
    createDocumentTemplate(input: $input) {
      id
      name
      fieldName
      description
      helpText
      isRequired
      acceptedFormats
      maxSizeBytes
      displayOrder
      createdAt
    }
  }
`);

/**
 * Update Document Template Mutation
 * Updates an existing document template
 */
export const UPDATE_DOCUMENT_TEMPLATE = graphql(`
  mutation UpdateDocumentTemplate($id: String!, $input: UpdateDocumentTemplateInput!) {
    updateDocumentTemplate(id: $id, input: $input) {
      id
      name
      fieldName
      description
      helpText
      isRequired
      acceptedFormats
      maxSizeBytes
      displayOrder
      updatedAt
    }
  }
`);

/**
 * Delete Document Template Mutation
 * Deletes a document template
 */
export const DELETE_DOCUMENT_TEMPLATE = graphql(`
  mutation DeleteDocumentTemplate($id: String!) {
    deleteDocumentTemplate(id: $id)
  }
`);

/**
 * Reorder Document Templates Mutation
 * Reorders document templates by IDs
 */
export const REORDER_DOCUMENT_TEMPLATES = graphql(`
  mutation ReorderDocumentTemplates($ids: [String!]!) {
    reorderDocumentTemplates(ids: $ids)
  }
`);
