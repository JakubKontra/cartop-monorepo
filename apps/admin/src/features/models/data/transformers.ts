/**
 * Data Transformers for Model
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

import type { ModelFormValues } from './schema'
import type {
  CreateCatalogModelInput,
  UpdateCatalogModelInput,
  GetCatalogModelQuery,
  GetAllCatalogModelsQuery
} from '@/gql/graphql'

// Type alias for Model from queries
export type Model = NonNullable<GetCatalogModelQuery['catalogModel']>
export type ModelListItem = GetAllCatalogModelsQuery['allCatalogModels'][0]

/**
 * Transform Model from API to Form Values
 * Used for populating edit form with existing data
 */
export function toFormValues(model: Model | ModelListItem): ModelFormValues {
  return {
    name: model.name,
    slug: model.slug,
    description: model.description || '',
    brandId: model.brandId,
    isActive: model.isActive,
    isHighlighted: model.isHighlighted,
    isRecommended: model.isRecommended,
    legacySystemId: model.legacySystemId || '',
    legacySlug: model.legacySlug || '',
  }
}

/**
 * Transform Form Values to CreateCatalogModelInput
 * Handles:
 * - Empty string → null conversion
 * - Removes undefined/empty optional fields
 */
export function toCreateInput(values: ModelFormValues): CreateCatalogModelInput {
  return {
    name: values.name,
    slug: values.slug,
    description: values.description || null,
    brandId: values.brandId,
    isActive: values.isActive,
    isHighlighted: values.isHighlighted,
    isRecommended: values.isRecommended,
    legacySystemId: values.legacySystemId || null,
    legacySlug: values.legacySlug || null,
  }
}

/**
 * Transform Form Values to UpdateCatalogModelInput
 * Same logic as toCreateInput, but returns UpdateCatalogModelInput type
 */
export function toUpdateInput(values: ModelFormValues): UpdateCatalogModelInput {
  return {
    name: values.name,
    slug: values.slug,
    description: values.description || null,
    brandId: values.brandId,
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
 * Test 1: Verify toCreateInput returns a valid CreateCatalogModelInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestCreateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toCreateInput>, CreateCatalogModelInput>
>

/**
 * Test 2: Verify toUpdateInput returns a valid UpdateCatalogModelInput
 * This ensures the transformer output is compatible with GraphQL mutation
 */
type _TestUpdateInputCompatibility = Expect<
  IsSubset<ReturnType<typeof toUpdateInput>, UpdateCatalogModelInput>
>

/**
 * Test 3: Verify toFormValues returns valid ModelFormValues
 * This ensures API data can be properly transformed to form values
 */
type _TestFormValuesCompatibility = Expect<
  IsSubset<ReturnType<typeof toFormValues>, ModelFormValues>
>

/**
 * If you see TypeScript errors here, it means:
 * - Your transformer is missing required fields from the GraphQL input type
 * - The types have drifted between form schema and GraphQL schema
 * - You need to update the transformer to match the latest GraphQL schema
 */
