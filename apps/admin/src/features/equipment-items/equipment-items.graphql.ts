import { graphql } from '@/gql'

/**
 * Get All Equipment Items Query
 * Fetches all equipment items with pagination
 */
export const GET_ALL_EQUIPMENT_ITEMS = graphql(`
  query GetAllEquipmentItems($limit: Float, $offset: Float) {
    allEquipmentItems(limit: $limit, offset: $offset) {
      id
      name
      legacySystemId
      createdAt
      updatedAt
    }
  }
`)

/**
 * Get Single Equipment Item Query
 * Fetches a single equipment item by ID
 */
export const GET_EQUIPMENT_ITEM = graphql(`
  query GetEquipmentItem($id: String!) {
    equipmentItem(id: $id) {
      id
      name
      legacySystemId
      createdAt
      updatedAt
    }
  }
`)

/**
 * Search Equipment Items Query
 * Search equipment items by name
 */
export const SEARCH_EQUIPMENT_ITEMS = graphql(`
  query SearchEquipmentItems($query: String!, $limit: Float) {
    searchEquipmentItems(query: $query, limit: $limit) {
      id
      name
      legacySystemId
    }
  }
`)

/**
 * Get Equipment Items Count Query
 * Gets the count of all equipment items
 */
export const GET_EQUIPMENT_ITEMS_COUNT = graphql(`
  query GetEquipmentItemsCount {
    equipmentItemsCount
  }
`)

/**
 * Create Equipment Item Mutation
 * Creates a new equipment item
 */
export const CREATE_EQUIPMENT_ITEM = graphql(`
  mutation CreateEquipmentItem($input: CreateCatalogBrandEquipmentItemInput!) {
    createEquipmentItem(input: $input) {
      id
      name
      legacySystemId
      createdAt
      updatedAt
    }
  }
`)

/**
 * Update Equipment Item Mutation
 * Updates an existing equipment item
 */
export const UPDATE_EQUIPMENT_ITEM = graphql(`
  mutation UpdateEquipmentItem($id: String!, $input: UpdateCatalogBrandEquipmentItemInput!) {
    updateEquipmentItem(id: $id, input: $input) {
      id
      name
      legacySystemId
      createdAt
      updatedAt
    }
  }
`)

/**
 * Delete Equipment Item Mutation
 * Deletes an equipment item
 */
export const DELETE_EQUIPMENT_ITEM = graphql(`
  mutation DeleteEquipmentItem($id: String!) {
    deleteEquipmentItem(id: $id)
  }
`)
