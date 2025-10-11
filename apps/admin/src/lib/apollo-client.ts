import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  Observable,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { useAuthStore } from '@/stores/auth-store';
import { graphql } from '@/gql';

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
 */
const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState().auth.accessToken;

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
    console.error('Token refresh failed:', error);
    return null;
  }
};

/**
 * Error link: Handles token refresh on 401 errors
 */
const errorLink = onError((errorResponse: any) => {
  const { graphQLErrors, networkError, operation, forward } = errorResponse;
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Check for authentication errors
      if (err.extensions?.code === 'UNAUTHENTICATED' || err.message.includes('Unauthorized')) {
        // Attempt to refresh token
        return new Observable((observer) => {
          refreshToken()
            .then((tokens) => {
              if (tokens) {
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
                useAuthStore.getState().auth.reset();
                observer.error(err);
              }
            })
            .catch((error) => {
              // Refresh failed, logout user
              useAuthStore.getState().auth.reset();
              observer.error(error);
            });
        });
      }
    }
  }

  if (networkError) {
    console.error('[Network error]:', networkError);
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
