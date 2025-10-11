import { graphql } from '@/gql';

/**
 * Get All Users Query
 * Fetches all users (admin-only operation)
 */
export const GET_ALL_USERS = graphql(`
  query GetAllUsers($limit: Float, $offset: Float) {
    users(limit: $limit, offset: $offset) {
      id
      email
      firstName
      lastName
      roles
      phone
      bio
      isActive
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get Single User Query
 * Fetches a single user by ID
 */
export const GET_USER = graphql(`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      roles
      phone
      bio
      isActive
      createdAt
      updatedAt
    }
  }
`);

/**
 * Search Users Query
 * Search users by name or email
 */
export const SEARCH_USERS = graphql(`
  query SearchUsers($query: String!, $limit: Float) {
    searchUsers(query: $query, limit: $limit) {
      id
      email
      firstName
      lastName
      roles
      isActive
    }
  }
`);

/**
 * Create User Mutation
 * Creates a new user (admin-only)
 */
export const CREATE_USER = graphql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      firstName
      lastName
      roles
      phone
      bio
      isActive
      createdAt
      updatedAt
    }
  }
`);

/**
 * Update User Mutation
 * Updates an existing user
 */
export const UPDATE_USER = graphql(`
  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      firstName
      lastName
      roles
      phone
      bio
      isActive
      createdAt
      updatedAt
    }
  }
`);

/**
 * Soft Delete User Mutation
 * Deactivates a user (sets isActive to false)
 */
export const SOFT_DELETE_USER = graphql(`
  mutation SoftDeleteUser($id: String!) {
    softDeleteUser(id: $id) {
      id
      email
      firstName
      lastName
      isActive
    }
  }
`);

/**
 * Delete User Mutation
 * Permanently deletes a user (admin-only)
 */
export const DELETE_USER = graphql(`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`);
