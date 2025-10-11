import { graphql } from '@/gql';

/**
 * Impersonate User Mutation
 * Allows admins to impersonate other users
 */
export const IMPERSONATE_USER_MUTATION = graphql(`
  mutation ImpersonateUser($input: ImpersonateInput!) {
    impersonateUser(input: $input) {
      accessToken
      refreshToken
      impersonatedUser {
        id
        email
        firstName
        lastName
        roles
        isActive
      }
      originalUser {
        id
        email
        firstName
        lastName
        roles
        isActive
      }
    }
  }
`);

/**
 * Stop Impersonation Mutation
 * Returns admin back to their original session
 */
export const STOP_IMPERSONATION_MUTATION = graphql(`
  mutation StopImpersonation {
    stopImpersonation {
      accessToken
      refreshToken
      user {
        id
        email
        firstName
        lastName
        roles
        isActive
      }
    }
  }
`);
