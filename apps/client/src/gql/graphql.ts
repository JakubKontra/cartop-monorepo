/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

/** The type of action performed on the entity */
export enum AuditAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type AuditLog = {
  __typename?: 'AuditLog';
  action: AuditAction;
  changes?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  entityId: Scalars['String']['output'];
  entityName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  newValue?: Maybe<Scalars['JSON']['output']>;
  oldValue?: Maybe<Scalars['JSON']['output']>;
  userAgent?: Maybe<Scalars['String']['output']>;
  userEmail?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type AuditQueryInput = {
  action?: InputMaybe<AuditAction>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  entityId?: InputMaybe<Scalars['String']['input']>;
  entityName?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type CatalogBrand = {
  __typename?: 'CatalogBrand';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isHighlighted: Scalars['Boolean']['output'];
  isRecommended: Scalars['Boolean']['output'];
  legacySlug?: Maybe<Scalars['String']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CatalogColor = {
  __typename?: 'CatalogColor';
  /** Hex color code (e.g., #FFFFFF) */
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  type: CatalogColorType;
};

/** Type of catalog color (exterior or interior) */
export enum CatalogColorType {
  Exterior = 'EXTERIOR',
  Interior = 'INTERIOR'
}

export type CatalogModel = {
  __typename?: 'CatalogModel';
  brand: CatalogBrand;
  brandId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isHighlighted: Scalars['Boolean']['output'];
  isRecommended: Scalars['Boolean']['output'];
  legacySlug?: Maybe<Scalars['String']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateCatalogBrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isHighlighted?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommended?: InputMaybe<Scalars['Boolean']['input']>;
  legacySlug?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateCatalogColorInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  type: CatalogColorType;
};

export type CreateCatalogModelInput = {
  brandId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isHighlighted?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommended?: InputMaybe<Scalars['Boolean']['input']>;
  legacySlug?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<UserRole>>;
};

export type ImpersonateInput = {
  targetUserId: Scalars['String']['input'];
};

export type ImpersonateResponse = {
  __typename?: 'ImpersonateResponse';
  accessToken: Scalars['String']['output'];
  impersonatedUser: User;
  originalUser: User;
  refreshToken: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCatalogBrand: CatalogBrand;
  createCatalogColor: CatalogColor;
  createCatalogModel: CatalogModel;
  createUser: User;
  deleteCatalogBrand: Scalars['Boolean']['output'];
  deleteCatalogColor: Scalars['Boolean']['output'];
  deleteCatalogModel: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  impersonateUser: ImpersonateResponse;
  login: AuthResponse;
  refreshToken: AuthResponse;
  softDeleteUser: User;
  stopImpersonation: AuthResponse;
  updateCatalogBrand: CatalogBrand;
  updateCatalogColor: CatalogColor;
  updateCatalogModel: CatalogModel;
  updateUser: User;
};


export type MutationCreateCatalogBrandArgs = {
  input: CreateCatalogBrandInput;
};


export type MutationCreateCatalogColorArgs = {
  input: CreateCatalogColorInput;
};


export type MutationCreateCatalogModelArgs = {
  input: CreateCatalogModelInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCatalogBrandArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogColorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogModelArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationImpersonateUserArgs = {
  input: ImpersonateInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationSoftDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCatalogBrandArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogBrandInput;
};


export type MutationUpdateCatalogColorArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogColorInput;
};


export type MutationUpdateCatalogModelArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogModelInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  allCatalogBrands: Array<CatalogBrand>;
  allCatalogModels: Array<CatalogModel>;
  auditLogs: Array<AuditLog>;
  catalogBrand: CatalogBrand;
  catalogBrandBySlug: CatalogBrand;
  catalogBrands: Array<CatalogBrand>;
  catalogColor: CatalogColor;
  catalogColorBySlug: CatalogColor;
  catalogColors: Array<CatalogColor>;
  catalogColorsByType: Array<CatalogColor>;
  catalogModel: CatalogModel;
  catalogModelBySlug: CatalogModel;
  catalogModels: Array<CatalogModel>;
  catalogModelsByBrand: Array<CatalogModel>;
  entityHistory: Array<AuditLog>;
  highlightedCatalogBrands: Array<CatalogBrand>;
  highlightedCatalogModels: Array<CatalogModel>;
  recommendedCatalogBrands: Array<CatalogBrand>;
  recommendedCatalogModels: Array<CatalogModel>;
  searchCatalogBrands: Array<CatalogBrand>;
  searchCatalogColors: Array<CatalogColor>;
  searchCatalogModels: Array<CatalogModel>;
  searchUsers: Array<User>;
  user: User;
  userActivity: Array<AuditLog>;
  users: Array<User>;
};


export type QueryAllCatalogBrandsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryAllCatalogModelsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryAuditLogsArgs = {
  query: AuditQueryInput;
};


export type QueryCatalogBrandArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogBrandBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCatalogBrandsArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryCatalogColorArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogColorBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCatalogColorsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<CatalogColorType>;
};


export type QueryCatalogColorsByTypeArgs = {
  type: CatalogColorType;
};


export type QueryCatalogModelArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogModelBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCatalogModelsArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryCatalogModelsByBrandArgs = {
  brandId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryEntityHistoryArgs = {
  entityId: Scalars['String']['input'];
  entityName: Scalars['String']['input'];
};


export type QuerySearchCatalogBrandsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchCatalogColorsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchCatalogModelsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchUsersArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserActivityArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type UpdateCatalogBrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isHighlighted?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommended?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCatalogColorInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CatalogColorType>;
};

export type UpdateCatalogModelInput = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isHighlighted?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommended?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  roles: Array<UserRole>;
  updatedAt: Scalars['DateTime']['output'];
};

/** User roles for access control */
export enum UserRole {
  Admin = 'ADMIN',
  CatalogManager = 'CATALOG_MANAGER',
  Customer = 'CUSTOMER',
  CustomerService = 'CUSTOMER_SERVICE',
  JuniorSalesRepresentative = 'JUNIOR_SALES_REPRESENTATIVE',
  Marketing = 'MARKETING',
  Public = 'PUBLIC',
  SalesRepresentative = 'SALES_REPRESENTATIVE'
}

export type GetCatalogBrandsQueryVariables = Exact<{
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetCatalogBrandsQuery = { __typename?: 'Query', catalogBrands: Array<{ __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, createdAt: any, updatedAt?: any | null }> };

export type GetHighlightedBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHighlightedBrandsQuery = { __typename?: 'Query', highlightedCatalogBrands: Array<{ __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isHighlighted: boolean }> };

export type GetBrandBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetBrandBySlugQuery = { __typename?: 'Query', catalogBrandBySlug: { __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, createdAt: any, updatedAt?: any | null } };


export const GetCatalogBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogBrands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activeOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogBrands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"activeOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activeOnly"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogBrandsQuery, GetCatalogBrandsQueryVariables>;
export const GetHighlightedBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHighlightedBrands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"highlightedCatalogBrands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}}]}}]}}]} as unknown as DocumentNode<GetHighlightedBrandsQuery, GetHighlightedBrandsQueryVariables>;
export const GetBrandBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBrandBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogBrandBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetBrandBySlugQuery, GetBrandBySlugQueryVariables>;