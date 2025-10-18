import { graphql } from '@/gql'

/**
 * Get Catalog Equipment by Model Generation ID
 * Fetches all catalog equipment for a specific model generation
 */
export const GET_CATALOG_EQUIPMENT_BY_GENERATION = graphql(`
  query GetCatalogEquipmentByGeneration($modelGenerationId: String!) {
    catalogEquipmentByModelGenerationId(modelGenerationId: $modelGenerationId) {
      id
      name
      active
      standard
      customText
      createdAt
      modelGenerationId
      categoryId
      category {
        id
        name
      }
      items {
        id
        name
      }
    }
  }
`)

/**
 * Get All Catalog Equipment
 * Fetches catalog equipment with pagination and optional filters
 */
export const GET_ALL_CATALOG_EQUIPMENT = graphql(`
  query GetAllCatalogEquipment(
    $limit: Float!
    $offset: Float!
    $modelGenerationId: String
    $active: Boolean
    $standard: Boolean
  ) {
    catalogEquipment(
      limit: $limit
      offset: $offset
      modelGenerationId: $modelGenerationId
      active: $active
      standard: $standard
    ) {
      id
      name
      active
      standard
      customText
      createdAt
      modelGenerationId
      categoryId
      category {
        id
        name
      }
      items {
        id
        name
      }
    }
  }
`)

/**
 * Get Single Catalog Equipment by ID
 * Fetches a single catalog equipment item
 */
export const GET_CATALOG_EQUIPMENT_BY_ID = graphql(`
  query GetCatalogEquipmentById($id: String!) {
    catalogEquipmentById(id: $id) {
      id
      name
      active
      standard
      customText
      createdAt
      modelGenerationId
      categoryId
      category {
        id
        name
      }
      items {
        id
        name
      }
    }
  }
`)

/**
 * Search Catalog Equipment
 * Search catalog equipment by name or custom text
 */
export const SEARCH_CATALOG_EQUIPMENT = graphql(`
  query SearchCatalogEquipment($query: String!, $limit: Float) {
    searchCatalogEquipment(query: $query, limit: $limit) {
      id
      name
      active
      standard
      customText
      createdAt
      modelGenerationId
      categoryId
      category {
        id
        name
      }
    }
  }
`)

/**
 * Create Catalog Equipment Mutation
 * Creates a new catalog equipment item
 */
export const CREATE_CATALOG_EQUIPMENT = graphql(`
  mutation CreateCatalogEquipment($input: CreateCatalogEquipmentInput!) {
    createCatalogEquipment(input: $input) {
      id
      name
      active
      standard
      customText
      createdAt
      modelGenerationId
      categoryId
      category {
        id
        name
      }
      items {
        id
        name
      }
    }
  }
`)

/**
 * Update Catalog Equipment Mutation
 * Updates an existing catalog equipment item
 */
export const UPDATE_CATALOG_EQUIPMENT = graphql(`
  mutation UpdateCatalogEquipment($id: String!, $input: UpdateCatalogEquipmentInput!) {
    updateCatalogEquipment(id: $id, input: $input) {
      id
      name
      active
      standard
      customText
      createdAt
      modelGenerationId
      categoryId
      category {
        id
        name
      }
      items {
        id
        name
      }
    }
  }
`)

/**
 * Delete Catalog Equipment Mutation
 * Deletes a catalog equipment item
 */
export const DELETE_CATALOG_EQUIPMENT = graphql(`
  mutation DeleteCatalogEquipment($id: String!) {
    deleteCatalogEquipment(id: $id)
  }
`)
