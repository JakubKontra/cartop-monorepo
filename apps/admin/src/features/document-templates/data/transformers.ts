/**
 * Data Transformers for DocumentTemplate
 *
 * This file contains utility functions to transform data between different representations:
 * - GraphQL types (from backend API)
 * - Form types (Zod validated form values)
 *
 * This approach ensures:
 * - Single source of truth for data transformation logic
 * - Type safety between frontend and backend
 * - No manual field mapping in page components
 */
import type {
  CreateDocumentTemplateInput,
  UpdateDocumentTemplateInput,
  GetDocumentTemplateQuery,
  GetAllDocumentTemplatesQuery,
} from '@/gql/graphql'
// ============================================================================
// Type-Level Tests (Compile-Time Only - Zero Runtime Cost)
// ============================================================================

import type { Expect, IsSubset } from '@/lib/type-utils'
import type { DocumentTemplateFormValues } from './schema'

// Type alias for DocumentTemplate from queries
export type DocumentTemplate = NonNullable<
  GetDocumentTemplateQuery['documentTemplate']
>
export type DocumentTemplateListItem =
  GetAllDocumentTemplatesQuery['allDocumentTemplates'][0]

/**
 * Transform DocumentTemplate from API to Form Values
 * Used for populating edit form with existing data
 */
export function toFormValues(
  documentTemplate: DocumentTemplate | DocumentTemplateListItem
): DocumentTemplateFormValues {
  const isGlobal = !documentTemplate.leasingCompany;

  return {
    leasingCompanyId: documentTemplate.leasingCompany?.id || '',
    isGlobal,
    name: documentTemplate.name,
    fieldName: documentTemplate.fieldName,
    description: documentTemplate.description || '',
    helpText: documentTemplate.helpText || '',
    isRequired: documentTemplate.isRequired,
    acceptedFormats: documentTemplate.acceptedFormats,
    maxSizeBytes: documentTemplate.maxSizeBytes,
    displayOrder: documentTemplate.displayOrder,
  }
}

/**
 * Transform Form Values to CreateDocumentTemplateInput
 * Handles:
 * - Empty string → null conversion for optional fields
 * - Removes undefined/empty optional fields
 * - Global templates: leasingCompanyId becomes null
 */
export function toCreateInput(
  values: DocumentTemplateFormValues
): CreateDocumentTemplateInput {
  return {
    leasingCompanyId: values.isGlobal ? null : (values.leasingCompanyId || null),
    name: values.name,
    fieldName: values.fieldName,
    description: values.description || null,
    helpText: values.helpText || null,
    isRequired: values.isRequired,
    acceptedFormats: values.acceptedFormats,
    maxSizeBytes: values.maxSizeBytes,
    displayOrder: values.displayOrder,
  }
}

/**
 * Transform Form Values to UpdateDocumentTemplateInput
 * Note: leasingCompanyId is typically not updatable for existing templates
 */
export function toUpdateInput(
  values: DocumentTemplateFormValues
): UpdateDocumentTemplateInput {
  return {
    name: values.name,
    description: values.description || null,
    helpText: values.helpText || null,
    isRequired: values.isRequired,
    acceptedFormats: values.acceptedFormats,
    maxSizeBytes: values.maxSizeBytes,
    displayOrder: values.displayOrder,
  }
}

/**
 * Test 1: Verify toCreateInput returns a valid CreateDocumentTemplateInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestCreateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toCreateInput>, CreateDocumentTemplateInput>
>

/**
 * Test 2: Verify toUpdateInput returns a valid UpdateDocumentTemplateInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestUpdateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toUpdateInput>, UpdateDocumentTemplateInput>
>

/**
 * Test 3: Verify toFormValues returns valid DocumentTemplateFormValues
 * This ensures API data can be properly transformed to form values
 */
type _TestFormValuesCompatibility = Expect<
  IsSubset<ReturnType<typeof toFormValues>, DocumentTemplateFormValues>
>

/**
 * If you see TypeScript errors here, it means:
 * - Your transformer is missing required fields from the GraphQL input type
 * - The types have drifted between form schema and GraphQL schema
 * - You need to update the transformer to match the latest GraphQL schema
 */
