/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {\n    requestPasswordReset(input: $input) {\n      success\n      message\n    }\n  }\n": typeof types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n      message\n    }\n  }\n": typeof types.ResetPasswordDocument,
    "\n  query GetCatalogBrands($activeOnly: Boolean, $limit: Float) {\n    catalogBrands(activeOnly: $activeOnly, limit: $limit) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      logo {\n        id\n        url\n        alt\n        width\n        height\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCatalogBrandsDocument,
    "\n  query GetHighlightedBrands($limit: Float) {\n    highlightedCatalogBrands(limit: $limit) {\n      id\n      name\n      slug\n      description\n      isHighlighted\n      logo {\n        id\n        url\n        alt\n        width\n        height\n      }\n    }\n  }\n": typeof types.GetHighlightedBrandsDocument,
    "\n  query GetBrandBySlug($slug: String!) {\n    catalogBrandBySlug(slug: $slug) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetBrandBySlugDocument,
};
const documents: Documents = {
    "\n  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {\n    requestPasswordReset(input: $input) {\n      success\n      message\n    }\n  }\n": types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n      message\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  query GetCatalogBrands($activeOnly: Boolean, $limit: Float) {\n    catalogBrands(activeOnly: $activeOnly, limit: $limit) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      logo {\n        id\n        url\n        alt\n        width\n        height\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCatalogBrandsDocument,
    "\n  query GetHighlightedBrands($limit: Float) {\n    highlightedCatalogBrands(limit: $limit) {\n      id\n      name\n      slug\n      description\n      isHighlighted\n      logo {\n        id\n        url\n        alt\n        width\n        height\n      }\n    }\n  }\n": types.GetHighlightedBrandsDocument,
    "\n  query GetBrandBySlug($slug: String!) {\n    catalogBrandBySlug(slug: $slug) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetBrandBySlugDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {\n    requestPasswordReset(input: $input) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {\n    requestPasswordReset(input: $input) {\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCatalogBrands($activeOnly: Boolean, $limit: Float) {\n    catalogBrands(activeOnly: $activeOnly, limit: $limit) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      logo {\n        id\n        url\n        alt\n        width\n        height\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetCatalogBrands($activeOnly: Boolean, $limit: Float) {\n    catalogBrands(activeOnly: $activeOnly, limit: $limit) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      logo {\n        id\n        url\n        alt\n        width\n        height\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetHighlightedBrands($limit: Float) {\n    highlightedCatalogBrands(limit: $limit) {\n      id\n      name\n      slug\n      description\n      isHighlighted\n      logo {\n        id\n        url\n        alt\n        width\n        height\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetHighlightedBrands($limit: Float) {\n    highlightedCatalogBrands(limit: $limit) {\n      id\n      name\n      slug\n      description\n      isHighlighted\n      logo {\n        id\n        url\n        alt\n        width\n        height\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBrandBySlug($slug: String!) {\n    catalogBrandBySlug(slug: $slug) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetBrandBySlug($slug: String!) {\n    catalogBrandBySlug(slug: $slug) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;