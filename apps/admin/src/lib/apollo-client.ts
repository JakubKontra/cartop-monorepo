import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  Observable,
} from '@apollo/client/core';
import { onError, type ErrorResponse } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { useAuthStore } from '@/stores/auth-store';
import { graphql } from '@/gql';
import { logger } from '@/lib/logger';

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql';

/**
 * GraphQL mutation for refreshing tokens
 */
const REFRESH_TOKEN_MUTATION_INTERNAL = graphql(`
  mutation RefreshTokenInternal($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        firstName
        lastName
        roles
      }
    }
  }
`);

/**
 * Auth link: Adds Authorization header with access token
 * Syncs Zustand state with cookies to prevent using expired tokens
 */
const authLink = setContext((_, { headers }) => {
  const store = useAuthStore.getState();
  let token = store.auth.accessToken;

  // Check if access token cookie still exists (not expired)
  // If cookie is missing but Zustand has a token, clear the stale token
  const cookieToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('cartop_access_token='));

  if (!cookieToken && token) {
    // Cookie expired but state still has it - clear the stale token
    logger.warn('Access token cookie expired, clearing stale token from state');
    store.auth.resetAccessToken();
    token = '';
  }

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

/**
 * HTTP link for GraphQL requests
 */
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: 'same-origin',
});

/**
 * Attempt to refresh the access token
 */
const refreshToken = async (): Promise<{ accessToken: string; refreshToken: string } | null> => {
  const { auth } = useAuthStore.getState();
  const currentRefreshToken = auth.refreshToken;

  if (!currentRefreshToken) {
    return null;
  }

  try {
    // Create a temporary client without auth for refresh request
    const tempClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    const { data } = await tempClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION_INTERNAL,
      variables: {
        input: { refreshToken: currentRefreshToken },
      },
    });

    if (data?.refreshToken) {
      // Update tokens in store
      auth.setAccessToken(data.refreshToken.accessToken);
      auth.setRefreshToken(data.refreshToken.refreshToken);
      auth.setUser({
        id: data.refreshToken.user.id,
        email: data.refreshToken.user.email,
        firstName: data.refreshToken.user.firstName,
        lastName: data.refreshToken.user.lastName,
        roles: data.refreshToken.user.roles,
      });

      return {
        accessToken: data.refreshToken.accessToken,
        refreshToken: data.refreshToken.refreshToken,
      };
    }

    return null;
  } catch (error) {
    logger.error('Token refresh failed', error);
    return null;
  }
};

/**
 * Check if error is an authentication error that should trigger token refresh
 */
const isAuthError = (err: any): boolean => {
  // Check for UNAUTHENTICATED code
  if (err.extensions?.code === 'UNAUTHENTICATED') {
    return true;
  }

  // Check for 401 HTTP status
  if (err.extensions?.http?.status === 401 || err.extensions?.code === 401) {
    return true;
  }

  // Check for auth error keys
  const errorKey = err.extensions?.key;
  if (
    errorKey === 'AUTH_UNAUTHORIZED' ||
    errorKey === 'AUTH_TOKEN_EXPIRED' ||
    errorKey === 'AUTH_TOKEN_INVALID'
  ) {
    return true;
  }

  // Check message patterns
  if (
    err.message.includes('Unauthorized') ||
    err.message.includes('unauthenticated') ||
    err.message.includes('authentication token')
  ) {
    return true;
  }

  // Check nested error messages (for wrapped errors)
  if (err.extensions?.errors && Array.isArray(err.extensions.errors)) {
    for (const nestedErr of err.extensions.errors) {
      if (
        nestedErr.message?.includes('authentication token') ||
        nestedErr.message?.includes('Unauthorized')
      ) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Error link: Handles token refresh on authentication errors
 */
const errorLink = onError((errorResponse: ErrorResponse) => {
  const { graphQLErrors, networkError, operation, forward } = errorResponse;
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Check for authentication errors
      if (isAuthError(err)) {
        logger.info('Authentication error detected, attempting token refresh', {
          errorKey: err.extensions?.key,
          errorCode: err.extensions?.code,
        });

        // Attempt to refresh token
        return new Observable((observer) => {
          refreshToken()
            .then((tokens) => {
              if (tokens) {
                logger.info('Token refresh successful, retrying operation');
                // Retry the failed operation with new token
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${tokens.accessToken}`,
                  },
                });

                // Retry the request
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };

                forward(operation).subscribe(subscriber);
              } else {
                // Refresh failed, logout user
                logger.warn('Token refresh failed, logging out user');
                useAuthStore.getState().auth.reset();
                observer.error(err);
              }
            })
            .catch((error) => {
              // Refresh failed, logout user
              logger.error('Token refresh error', error);
              useAuthStore.getState().auth.reset();
              observer.error(error);
            });
        });
      }
    }
  }

  if (networkError) {
    logger.error('GraphQL network error', networkError);
  }
});

/**
 * Apollo Client instance
 * Configured with auth and error handling
 */
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Add any field policies for caching here
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
