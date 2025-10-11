/**
 * GraphQL Client for fetching data from backend
 */

import { print } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql';

export interface GraphQLRequest<TVariables = Record<string, unknown>> {
  query: string | TypedDocumentNode<unknown, TVariables>;
  variables?: TVariables;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

/**
 * Execute a GraphQL query
 */
export async function graphqlRequest<T, TVariables = Record<string, unknown>>(
  request: GraphQLRequest<TVariables>,
  options?: RequestInit
): Promise<T> {
  // Convert DocumentNode to string if needed
  const query = typeof request.query === 'string'
    ? request.query
    : print(request.query);

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: JSON.stringify({
      query,
      variables: request.variables,
    }),
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GraphQL HTTP error: ${response.status} - ${text}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors && json.errors.length > 0) {
    const errorMessage = json.errors.map(e => e.message).join(', ');
    throw new Error(`GraphQL error: ${errorMessage}`);
  }

  if (!json.data) {
    throw new Error('GraphQL response has no data');
  }

  return json.data;
}
