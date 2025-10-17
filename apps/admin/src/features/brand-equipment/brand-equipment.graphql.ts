import { graphql } from '@/gql'

/**
 * Get All Brand Equipment Query
 * Fetches all brand equipment with optional brand filtering
 */
export const GET_ALL_BRAND_EQUIPMENTS = graphql(`
  query GetAllBrandEquipments($limit: Float, $offset: Float, $brandId: String) {
    allBrandEquipments(limit: $limit, offset: $offset, brandId: $brandId) {
      id
      name
      description
      brandId
      brand {
        id
        name
        slug
      }
      assignedItems {
        id
        name
        legacySystemId
      }
      createdAt
      updatedAt
    }
  }
`)

/**
 * Get Single Brand Equipment Query
 * Fetches a single brand equipment by ID
 */
export const GET_BRAND_EQUIPMENT = graphql(`
  query GetBrandEquipment($id: String!) {
    brandEquipment(id: $id) {
      id
      name
      description
      brandId
      brand {
        id
        name
        slug
      }
      assignedItems {
        id
        name
        legacySystemId
      }
      createdAt
      updatedAt
    }
  }
`)

/**
 * Search Brand Equipment Query
 * Search brand equipment by name or description
 */
export const SEARCH_BRAND_EQUIPMENTS = graphql(`
  query SearchBrandEquipments($query: String!, $limit: Float) {
    searchBrandEquipments(query: $query, limit: $limit) {
      id
      name
      description
      brandId
      brand {
        id
        name
        slug
      }
    }
  }
`)

/**
 * Get Brand Equipment Count Query
 * Gets the count of brand equipment with optional brand filtering
 */
export const GET_BRAND_EQUIPMENTS_COUNT = graphql(`
  query GetBrandEquipmentsCount($brandId: String) {
    brandEquipmentsCount(brandId: $brandId)
  }
`)

/**
 * Create Brand Equipment Mutation
 * Creates a new brand equipment
 */
export const CREATE_BRAND_EQUIPMENT = graphql(`
  mutation CreateBrandEquipment($input: CreateCatalogBrandEquipmentInput!) {
    createBrandEquipment(input: $input) {
      id
      name
      description
      brandId
      brand {
        id
        name
        slug
      }
      assignedItems {
        id
        name
        legacySystemId
      }
      createdAt
      updatedAt
    }
  }
`)

/**
 * Update Brand Equipment Mutation
 * Updates an existing brand equipment
 */
export const UPDATE_BRAND_EQUIPMENT = graphql(`
  mutation UpdateBrandEquipment($id: String!, $input: UpdateCatalogBrandEquipmentInput!) {
    updateBrandEquipment(id: $id, input: $input) {
      id
      name
      description
      brandId
      brand {
        id
        name
        slug
      }
      assignedItems {
        id
        name
        legacySystemId
      }
      createdAt
      updatedAt
    }
  }
`)

/**
 * Delete Brand Equipment Mutation
 * Deletes a brand equipment
 */
export const DELETE_BRAND_EQUIPMENT = graphql(`
  mutation DeleteBrandEquipment($id: String!) {
    deleteBrandEquipment(id: $id)
  }
`)
