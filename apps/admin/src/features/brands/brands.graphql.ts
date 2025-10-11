import { graphql } from '@/gql';

/**
 * Get All Catalog Brands Query
 * Fetches all brands including inactive ones (admin view)
 */
export const GET_ALL_CATALOG_BRANDS = graphql(`
  query GetAllCatalogBrands($limit: Float, $offset: Float) {
    allCatalogBrands(limit: $limit, offset: $offset) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      legacySystemId
      legacySlug
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get Single Catalog Brand Query
 * Fetches a single brand by ID
 */
export const GET_CATALOG_BRAND = graphql(`
  query GetCatalogBrand($id: String!) {
    catalogBrand(id: $id) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      legacySystemId
      legacySlug
      createdAt
      updatedAt
    }
  }
`);

/**
 * Create Catalog Brand Mutation
 * Creates a new brand
 */
export const CREATE_CATALOG_BRAND = graphql(`
  mutation CreateCatalogBrand($input: CreateCatalogBrandInput!) {
    createCatalogBrand(input: $input) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      legacySystemId
      legacySlug
      createdAt
      updatedAt
    }
  }
`);

/**
 * Update Catalog Brand Mutation
 * Updates an existing brand
 */
export const UPDATE_CATALOG_BRAND = graphql(`
  mutation UpdateCatalogBrand($id: String!, $input: UpdateCatalogBrandInput!) {
    updateCatalogBrand(id: $id, input: $input) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      createdAt
      updatedAt
    }
  }
`);

/**
 * Delete Catalog Brand Mutation
 * Deletes a brand
 */
export const DELETE_CATALOG_BRAND = graphql(`
  mutation DeleteCatalogBrand($id: String!) {
    deleteCatalogBrand(id: $id)
  }
`);
