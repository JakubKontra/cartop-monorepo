import { graphql } from '@/gql'

/**
 * Get all customers (users with CUSTOMER role)
 */
export const GET_ALL_CUSTOMERS = graphql(`
  query GetAllCustomers($limit: Float, $offset: Float) {
    users(limit: $limit, offset: $offset) {
      id
      email
      firstName
      lastName
      phone
      roles
      isActive
      avatar {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`)

/**
 * Get a single customer by ID with all relationships
 */
export const GET_CUSTOMER = graphql(`
  query GetCustomer($id: String!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      phone
      bio
      roles
      isActive
      avatar {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`)

/**
 * Search customers by name or email
 */
export const SEARCH_CUSTOMERS = graphql(`
  query SearchCustomers($query: String!, $limit: Float) {
    searchUsers(query: $query, limit: $limit) {
      id
      email
      firstName
      lastName
      phone
      roles
      isActive
      avatar {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`)
