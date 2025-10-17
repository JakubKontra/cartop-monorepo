import { graphql } from '@/gql';

/**
 * Get All Catalog Colors Query
 * Fetches all colors
 */
export const GET_ALL_CATALOG_COLORS = graphql(`
  query GetAllCatalogColors($limit: Float, $offset: Float, $type: CatalogColorType) {
    catalogColors(limit: $limit, offset: $offset, type: $type) {
      id
      name
      slug
      color
      type
      legacySystemId
      createdAt
    }
  }
`);

/**
 * Get Single Catalog Color Query
 * Fetches a single color by ID
 */
export const GET_CATALOG_COLOR = graphql(`
  query GetCatalogColor($id: String!) {
    catalogColor(id: $id) {
      id
      name
      slug
      color
      type
      legacySystemId
      createdAt
    }
  }
`);

/**
 * Create Catalog Color Mutation
 * Creates a new color
 */
export const CREATE_CATALOG_COLOR = graphql(`
  mutation CreateCatalogColor($input: CreateCatalogColorInput!) {
    createCatalogColor(input: $input) {
      id
      name
      slug
      color
      type
      legacySystemId
      createdAt
    }
  }
`);

/**
 * Update Catalog Color Mutation
 * Updates an existing color
 */
export const UPDATE_CATALOG_COLOR = graphql(`
  mutation UpdateCatalogColor($id: String!, $input: UpdateCatalogColorInput!) {
    updateCatalogColor(id: $id, input: $input) {
      id
      name
      slug
      color
      type
      legacySystemId
      createdAt
    }
  }
`);

/**
 * Delete Catalog Color Mutation
 * Deletes a color
 */
export const DELETE_CATALOG_COLOR = graphql(`
  mutation DeleteCatalogColor($id: String!) {
    deleteCatalogColor(id: $id)
  }
`);
