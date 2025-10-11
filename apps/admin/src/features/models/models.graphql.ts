import { graphql } from '@/gql';

/**
 * Get All Catalog Models Query
 * Fetches all models including inactive ones (admin view)
 */
export const GET_ALL_CATALOG_MODELS = graphql(`
  query GetAllCatalogModels($limit: Float, $offset: Float) {
    allCatalogModels(limit: $limit, offset: $offset) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      legacySystemId
      legacySlug
      brandId
      brand {
        id
        name
        slug
      }
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get Single Catalog Model Query
 * Fetches a single model by ID
 */
export const GET_CATALOG_MODEL = graphql(`
  query GetCatalogModel($id: String!) {
    catalogModel(id: $id) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      legacySystemId
      legacySlug
      brandId
      brand {
        id
        name
        slug
      }
      createdAt
      updatedAt
    }
  }
`);

/**
 * Create Catalog Model Mutation
 * Creates a new model
 */
export const CREATE_CATALOG_MODEL = graphql(`
  mutation CreateCatalogModel($input: CreateCatalogModelInput!) {
    createCatalogModel(input: $input) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      legacySystemId
      legacySlug
      brandId
      brand {
        id
        name
        slug
      }
      createdAt
      updatedAt
    }
  }
`);

/**
 * Update Catalog Model Mutation
 * Updates an existing model
 */
export const UPDATE_CATALOG_MODEL = graphql(`
  mutation UpdateCatalogModel($id: String!, $input: UpdateCatalogModelInput!) {
    updateCatalogModel(id: $id, input: $input) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      brandId
      brand {
        id
        name
        slug
      }
      createdAt
      updatedAt
    }
  }
`);

/**
 * Delete Catalog Model Mutation
 * Deletes a model
 */
export const DELETE_CATALOG_MODEL = graphql(`
  mutation DeleteCatalogModel($id: String!) {
    deleteCatalogModel(id: $id)
  }
`);
