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
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\n  mutation ImpersonateUser($input: ImpersonateInput!) {\n    impersonateUser(input: $input) {\n      accessToken\n      refreshToken\n      impersonatedUser {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n      originalUser {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n": typeof types.ImpersonateUserDocument,
    "\n  mutation StopImpersonation {\n    stopImpersonation {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n": typeof types.StopImpersonationDocument,
    "\n  query GetAllCatalogBrands($limit: Float, $offset: Float) {\n    allCatalogBrands(limit: $limit, offset: $offset) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetAllCatalogBrandsDocument,
    "\n  query GetCatalogBrand($id: String!) {\n    catalogBrand(id: $id) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCatalogBrandDocument,
    "\n  mutation CreateCatalogBrand($input: CreateCatalogBrandInput!) {\n    createCatalogBrand(input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateCatalogBrandDocument,
    "\n  mutation UpdateCatalogBrand($id: String!, $input: UpdateCatalogBrandInput!) {\n    updateCatalogBrand(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateCatalogBrandDocument,
    "\n  mutation DeleteCatalogBrand($id: String!) {\n    deleteCatalogBrand(id: $id)\n  }\n": typeof types.DeleteCatalogBrandDocument,
    "\n  query CheckBrandSlug($slug: String!) {\n    catalogBrandBySlug(slug: $slug) {\n      id\n      slug\n    }\n  }\n": typeof types.CheckBrandSlugDocument,
    "\n  query GetAllCatalogModels($limit: Float, $offset: Float) {\n    allCatalogModels(limit: $limit, offset: $offset) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetAllCatalogModelsDocument,
    "\n  query GetCatalogModel($id: String!) {\n    catalogModel(id: $id) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCatalogModelDocument,
    "\n  mutation CreateCatalogModel($input: CreateCatalogModelInput!) {\n    createCatalogModel(input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateCatalogModelDocument,
    "\n  mutation UpdateCatalogModel($id: String!, $input: UpdateCatalogModelInput!) {\n    updateCatalogModel(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateCatalogModelDocument,
    "\n  mutation DeleteCatalogModel($id: String!) {\n    deleteCatalogModel(id: $id)\n  }\n": typeof types.DeleteCatalogModelDocument,
    "\n  query CheckModelSlug($slug: String!) {\n    catalogModelBySlug(slug: $slug) {\n      id\n      slug\n    }\n  }\n": typeof types.CheckModelSlugDocument,
    "\n  query GetAllUsers($limit: Float, $offset: Float) {\n    users(limit: $limit, offset: $offset) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetAllUsersDocument,
    "\n  query GetUser($id: String!) {\n    user(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetUserDocument,
    "\n  query SearchUsers($query: String!, $limit: Float) {\n    searchUsers(query: $query, limit: $limit) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      isActive\n    }\n  }\n": typeof types.SearchUsersDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  mutation SoftDeleteUser($id: String!) {\n    softDeleteUser(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      isActive\n    }\n  }\n": typeof types.SoftDeleteUserDocument,
    "\n  mutation DeleteUser($id: String!) {\n    deleteUser(id: $id)\n  }\n": typeof types.DeleteUserDocument,
    "\n  mutation RefreshTokenInternal($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n      }\n    }\n  }\n": typeof types.RefreshTokenInternalDocument,
};
const documents: Documents = {
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation ImpersonateUser($input: ImpersonateInput!) {\n    impersonateUser(input: $input) {\n      accessToken\n      refreshToken\n      impersonatedUser {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n      originalUser {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n": types.ImpersonateUserDocument,
    "\n  mutation StopImpersonation {\n    stopImpersonation {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n": types.StopImpersonationDocument,
    "\n  query GetAllCatalogBrands($limit: Float, $offset: Float) {\n    allCatalogBrands(limit: $limit, offset: $offset) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetAllCatalogBrandsDocument,
    "\n  query GetCatalogBrand($id: String!) {\n    catalogBrand(id: $id) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCatalogBrandDocument,
    "\n  mutation CreateCatalogBrand($input: CreateCatalogBrandInput!) {\n    createCatalogBrand(input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateCatalogBrandDocument,
    "\n  mutation UpdateCatalogBrand($id: String!, $input: UpdateCatalogBrandInput!) {\n    updateCatalogBrand(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateCatalogBrandDocument,
    "\n  mutation DeleteCatalogBrand($id: String!) {\n    deleteCatalogBrand(id: $id)\n  }\n": types.DeleteCatalogBrandDocument,
    "\n  query CheckBrandSlug($slug: String!) {\n    catalogBrandBySlug(slug: $slug) {\n      id\n      slug\n    }\n  }\n": types.CheckBrandSlugDocument,
    "\n  query GetAllCatalogModels($limit: Float, $offset: Float) {\n    allCatalogModels(limit: $limit, offset: $offset) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetAllCatalogModelsDocument,
    "\n  query GetCatalogModel($id: String!) {\n    catalogModel(id: $id) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCatalogModelDocument,
    "\n  mutation CreateCatalogModel($input: CreateCatalogModelInput!) {\n    createCatalogModel(input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateCatalogModelDocument,
    "\n  mutation UpdateCatalogModel($id: String!, $input: UpdateCatalogModelInput!) {\n    updateCatalogModel(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateCatalogModelDocument,
    "\n  mutation DeleteCatalogModel($id: String!) {\n    deleteCatalogModel(id: $id)\n  }\n": types.DeleteCatalogModelDocument,
    "\n  query CheckModelSlug($slug: String!) {\n    catalogModelBySlug(slug: $slug) {\n      id\n      slug\n    }\n  }\n": types.CheckModelSlugDocument,
    "\n  query GetAllUsers($limit: Float, $offset: Float) {\n    users(limit: $limit, offset: $offset) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query GetUser($id: String!) {\n    user(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUserDocument,
    "\n  query SearchUsers($query: String!, $limit: Float) {\n    searchUsers(query: $query, limit: $limit) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      isActive\n    }\n  }\n": types.SearchUsersDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation SoftDeleteUser($id: String!) {\n    softDeleteUser(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      isActive\n    }\n  }\n": types.SoftDeleteUserDocument,
    "\n  mutation DeleteUser($id: String!) {\n    deleteUser(id: $id)\n  }\n": types.DeleteUserDocument,
    "\n  mutation RefreshTokenInternal($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n      }\n    }\n  }\n": types.RefreshTokenInternalDocument,
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
export function graphql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ImpersonateUser($input: ImpersonateInput!) {\n    impersonateUser(input: $input) {\n      accessToken\n      refreshToken\n      impersonatedUser {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n      originalUser {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ImpersonateUser($input: ImpersonateInput!) {\n    impersonateUser(input: $input) {\n      accessToken\n      refreshToken\n      impersonatedUser {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n      originalUser {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StopImpersonation {\n    stopImpersonation {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation StopImpersonation {\n    stopImpersonation {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllCatalogBrands($limit: Float, $offset: Float) {\n    allCatalogBrands(limit: $limit, offset: $offset) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetAllCatalogBrands($limit: Float, $offset: Float) {\n    allCatalogBrands(limit: $limit, offset: $offset) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCatalogBrand($id: String!) {\n    catalogBrand(id: $id) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetCatalogBrand($id: String!) {\n    catalogBrand(id: $id) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCatalogBrand($input: CreateCatalogBrandInput!) {\n    createCatalogBrand(input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCatalogBrand($input: CreateCatalogBrandInput!) {\n    createCatalogBrand(input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCatalogBrand($id: String!, $input: UpdateCatalogBrandInput!) {\n    updateCatalogBrand(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCatalogBrand($id: String!, $input: UpdateCatalogBrandInput!) {\n    updateCatalogBrand(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCatalogBrand($id: String!) {\n    deleteCatalogBrand(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteCatalogBrand($id: String!) {\n    deleteCatalogBrand(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CheckBrandSlug($slug: String!) {\n    catalogBrandBySlug(slug: $slug) {\n      id\n      slug\n    }\n  }\n"): (typeof documents)["\n  query CheckBrandSlug($slug: String!) {\n    catalogBrandBySlug(slug: $slug) {\n      id\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllCatalogModels($limit: Float, $offset: Float) {\n    allCatalogModels(limit: $limit, offset: $offset) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetAllCatalogModels($limit: Float, $offset: Float) {\n    allCatalogModels(limit: $limit, offset: $offset) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCatalogModel($id: String!) {\n    catalogModel(id: $id) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetCatalogModel($id: String!) {\n    catalogModel(id: $id) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCatalogModel($input: CreateCatalogModelInput!) {\n    createCatalogModel(input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCatalogModel($input: CreateCatalogModelInput!) {\n    createCatalogModel(input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      legacySystemId\n      legacySlug\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCatalogModel($id: String!, $input: UpdateCatalogModelInput!) {\n    updateCatalogModel(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCatalogModel($id: String!, $input: UpdateCatalogModelInput!) {\n    updateCatalogModel(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      isActive\n      isHighlighted\n      isRecommended\n      brandId\n      brand {\n        id\n        name\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCatalogModel($id: String!) {\n    deleteCatalogModel(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteCatalogModel($id: String!) {\n    deleteCatalogModel(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CheckModelSlug($slug: String!) {\n    catalogModelBySlug(slug: $slug) {\n      id\n      slug\n    }\n  }\n"): (typeof documents)["\n  query CheckModelSlug($slug: String!) {\n    catalogModelBySlug(slug: $slug) {\n      id\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllUsers($limit: Float, $offset: Float) {\n    users(limit: $limit, offset: $offset) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers($limit: Float, $offset: Float) {\n    users(limit: $limit, offset: $offset) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($id: String!) {\n    user(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetUser($id: String!) {\n    user(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchUsers($query: String!, $limit: Float) {\n    searchUsers(query: $query, limit: $limit) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      isActive\n    }\n  }\n"): (typeof documents)["\n  query SearchUsers($query: String!, $limit: Float) {\n    searchUsers(query: $query, limit: $limit) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      email\n      firstName\n      lastName\n      roles\n      phone\n      bio\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SoftDeleteUser($id: String!) {\n    softDeleteUser(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      isActive\n    }\n  }\n"): (typeof documents)["\n  mutation SoftDeleteUser($id: String!) {\n    softDeleteUser(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($id: String!) {\n    deleteUser(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: String!) {\n    deleteUser(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshTokenInternal($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshTokenInternal($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstName\n        lastName\n        roles\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;