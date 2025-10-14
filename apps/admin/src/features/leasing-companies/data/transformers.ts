/**
 * Data Transformers for LeasingCompany
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
  CreateLeasingCompanyInput,
  UpdateLeasingCompanyInput,
  GetLeasingCompanyQuery,
  GetAllLeasingCompaniesQuery,
} from '@/gql/graphql'
// ============================================================================
// Type-Level Tests (Compile-Time Only - Zero Runtime Cost)
// ============================================================================

import type { Expect, IsSubset } from '@/lib/type-utils'
import type { LeasingCompanyFormValues } from './schema'

// Type alias for LeasingCompany from queries
export type LeasingCompany = NonNullable<
  GetLeasingCompanyQuery['leasingCompany']
>
export type LeasingCompanyListItem =
  GetAllLeasingCompaniesQuery['leasingCompanies'][0]

/**
 * Transform LeasingCompany from API to Form Values
 * Used for populating edit form with existing data
 */
export function toFormValues(
  leasingCompany: LeasingCompany | LeasingCompanyListItem
): LeasingCompanyFormValues {
  return {
    name: leasingCompany.name,
    link: leasingCompany.link || '',
    logoId: leasingCompany.logoId || '',
  }
}

/**
 * Transform Form Values to CreateLeasingCompanyInput
 * Handles:
 * - Empty string → null conversion
 * - Removes undefined/empty optional fields
 */
export function toCreateInput(
  values: LeasingCompanyFormValues
): CreateLeasingCompanyInput {
  return {
    name: values.name,
    link: values.link || null,
    logoId: values.logoId || null,
  }
}

/**
 * Transform Form Values to UpdateLeasingCompanyInput
 * Same logic as toCreateInput, but returns UpdateLeasingCompanyInput type
 */
export function toUpdateInput(
  values: LeasingCompanyFormValues
): UpdateLeasingCompanyInput {
  return {
    name: values.name,
    link: values.link || null,
    logoId: values.logoId || null,
  }
}

/**
 * Test 1: Verify toCreateInput returns a valid CreateLeasingCompanyInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestCreateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toCreateInput>, CreateLeasingCompanyInput>
>

/**
 * Test 2: Verify toUpdateInput returns a valid UpdateLeasingCompanyInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestUpdateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toUpdateInput>, UpdateLeasingCompanyInput>
>

/**
 * Test 3: Verify toFormValues returns valid LeasingCompanyFormValues
 * This ensures API data can be properly transformed to form values
 */
type _TestFormValuesCompatibility = Expect<
  IsSubset<ReturnType<typeof toFormValues>, LeasingCompanyFormValues>
>

/**
 * If you see TypeScript errors here, it means:
 * - Your transformer is missing required fields from the GraphQL input type
 * - The types have drifted between form schema and GraphQL schema
 * - You need to update the transformer to match the latest GraphQL schema
 */
