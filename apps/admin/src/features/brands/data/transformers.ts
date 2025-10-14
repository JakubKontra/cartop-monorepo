/**
 * Data Transformers for Brand
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

import type { BrandFormValues } from './schema'
import type {
  CreateCatalogBrandInput,
  UpdateCatalogBrandInput,
  GetCatalogBrandQuery,
  GetAllCatalogBrandsQuery
} from '@/gql/graphql'

// Type alias for Brand from queries
export type Brand = NonNullable<GetCatalogBrandQuery['catalogBrand']>
export type BrandListItem = GetAllCatalogBrandsQuery['allCatalogBrands'][0]

/**
 * Transform Brand from API to Form Values
 * Used for populating edit form with existing data
 */
export function toFormValues(brand: Brand | BrandListItem): BrandFormValues {
  return {
    name: brand.name,
    slug: brand.slug,
    description: brand.description || '',
    logoId: brand.logoId || '',
    isActive: brand.isActive,
    isHighlighted: brand.isHighlighted,
    isRecommended: brand.isRecommended,
    legacySystemId: brand.legacySystemId || '',
    legacySlug: brand.legacySlug || '',
  }
}

/**
 * Transform Form Values to CreateCatalogBrandInput
 * Handles:
 * - Empty string → null conversion
 * - Removes undefined/empty optional fields
 */
export function toCreateInput(values: BrandFormValues): CreateCatalogBrandInput {
  return {
    name: values.name,
    slug: values.slug,
    description: values.description || null,
    logoId: values.logoId || null,
    isActive: values.isActive,
    isHighlighted: values.isHighlighted,
    isRecommended: values.isRecommended,
    legacySystemId: values.legacySystemId || null,
    legacySlug: values.legacySlug || null,
  }
}

/**
 * Transform Form Values to UpdateCatalogBrandInput
 * Same logic as toCreateInput, but returns UpdateCatalogBrandInput type
 */
export function toUpdateInput(values: BrandFormValues): UpdateCatalogBrandInput {
  return {
    name: values.name,
    slug: values.slug,
    description: values.description || null,
    logoId: values.logoId || null,
    isActive: values.isActive,
    isHighlighted: values.isHighlighted,
    isRecommended: values.isRecommended,
  }
}

// ============================================================================
// Type-Level Tests (Compile-Time Only - Zero Runtime Cost)
// ============================================================================

import type { Expect, IsSubset } from '@/lib/type-utils'

/**
 * Test 1: Verify toCreateInput returns a valid CreateCatalogBrandInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestCreateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toCreateInput>, CreateCatalogBrandInput>
>

/**
 * Test 2: Verify toUpdateInput returns a valid UpdateCatalogBrandInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestUpdateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toUpdateInput>, UpdateCatalogBrandInput>
>

/**
 * Test 3: Verify toFormValues returns valid BrandFormValues
 * This ensures API data can be properly transformed to form values
 */
type _TestFormValuesCompatibility = Expect<
  IsSubset<ReturnType<typeof toFormValues>, BrandFormValues>
>

/**
 * If you see TypeScript errors here, it means:
 * - Your transformer is missing required fields from the GraphQL input type
 * - The types have drifted between form schema and GraphQL schema
 * - You need to update the transformer to match the latest GraphQL schema
 */
