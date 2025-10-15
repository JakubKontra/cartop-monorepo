/**
 * GraphQL mutations for authentication
 * These mutations will be validated by GraphQL Code Generator
 */

import { graphql } from '../gql';

/**
 * Request password reset email
 */
export const REQUEST_PASSWORD_RESET_MUTATION = graphql(`
  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      success
      message
    }
  }
`);

/**
 * Reset password with token
 */
export const RESET_PASSWORD_MUTATION = graphql(`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      message
    }
  }
`);
