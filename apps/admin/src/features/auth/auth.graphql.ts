import { graphql } from '@/gql';

/**
 * Login Mutation
 * Authenticates user and returns access/refresh tokens
 */
export const LOGIN_MUTATION = graphql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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

/**
 * Refresh Token Mutation
 * Gets new access/refresh tokens using existing refresh token
 */
export const REFRESH_TOKEN_MUTATION = graphql(`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
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
