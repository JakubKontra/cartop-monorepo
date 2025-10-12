import { graphql } from '@/gql';

/**
 * Get All Catalog Model Generations Query
 * Fetches all generations including inactive ones (admin view)
 */
export const GET_ALL_CATALOG_MODEL_GENERATIONS = graphql(`
  query GetAllCatalogModelGenerations($limit: Float, $offset: Float, $modelId: String, $isActive: Boolean) {
    catalogModelGenerations(limit: $limit, offset: $offset, modelId: $modelId, isActive: $isActive) {
      id
      name
      slug
      legacySlug
      description
      productionStart
      productionStop
      wheelbase
      frontTrack
      rearTrack
      length
      width
      height
      trunkSpaceMin
      trunkSpaceMax
      bodyType
      frontBrakesType
      rearBrakesType
      isActive
      legacySystemId
      modelId
      model {
        id
        name
        slug
        brand {
          id
          name
          slug
        }
      }
      brandId
      brand {
        id
        name
        slug
      }
      createdAt
    }
  }
`);

/**
 * Get Single Catalog Model Generation Query
 * Fetches a single generation by ID
 */
export const GET_CATALOG_MODEL_GENERATION = graphql(`
  query GetCatalogModelGeneration($id: String!) {
    catalogModelGeneration(id: $id) {
      id
      name
      slug
      legacySlug
      description
      productionStart
      productionStop
      wheelbase
      frontTrack
      rearTrack
      length
      width
      height
      trunkSpaceMin
      trunkSpaceMax
      bodyType
      frontBrakesType
      rearBrakesType
      isActive
      legacySystemId
      modelId
      model {
        id
        name
        slug
        brand {
          id
          name
          slug
        }
      }
      brandId
      brand {
        id
        name
        slug
      }
      createdAt
    }
  }
`);

/**
 * Create Catalog Model Generation Mutation
 * Creates a new generation
 */
export const CREATE_CATALOG_MODEL_GENERATION = graphql(`
  mutation CreateCatalogModelGeneration($input: CreateCatalogModelGenerationInput!) {
    createCatalogModelGeneration(input: $input) {
      id
      name
      slug
      legacySlug
      description
      productionStart
      productionStop
      wheelbase
      frontTrack
      rearTrack
      length
      width
      height
      trunkSpaceMin
      trunkSpaceMax
      bodyType
      frontBrakesType
      rearBrakesType
      isActive
      modelId
      model {
        id
        name
        slug
      }
      brandId
      brand {
        id
        name
        slug
      }
      createdAt
    }
  }
`);

/**
 * Update Catalog Model Generation Mutation
 * Updates an existing generation
 */
export const UPDATE_CATALOG_MODEL_GENERATION = graphql(`
  mutation UpdateCatalogModelGeneration($id: String!, $input: UpdateCatalogModelGenerationInput!) {
    updateCatalogModelGeneration(id: $id, input: $input) {
      id
      name
      slug
      legacySlug
      description
      productionStart
      productionStop
      wheelbase
      frontTrack
      rearTrack
      length
      width
      height
      trunkSpaceMin
      trunkSpaceMax
      bodyType
      frontBrakesType
      rearBrakesType
      isActive
      modelId
      model {
        id
        name
        slug
      }
      brandId
      brand {
        id
        name
        slug
      }
      createdAt
    }
  }
`);

/**
 * Delete Catalog Model Generation Mutation
 * Deletes a generation
 */
export const DELETE_CATALOG_MODEL_GENERATION = graphql(`
  mutation DeleteCatalogModelGeneration($id: String!) {
    deleteCatalogModelGeneration(id: $id)
  }
`);

/**
 * Check Generation Slug Uniqueness Query
 * Checks if a generation slug is already in use
 */
export const CHECK_GENERATION_SLUG = graphql(`
  query CheckGenerationSlug($slug: String!) {
    catalogModelGenerationBySlug(slug: $slug) {
      id
      slug
    }
  }
`);
