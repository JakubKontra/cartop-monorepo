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

/** Type of vehicle body style */
export enum CatalogBodyType {
  CommercialVan = 'COMMERCIAL_VAN',
  Convertible = 'CONVERTIBLE',
  CoupeCrossover = 'COUPE_CROSSOVER',
  CoupeSuvCrossover = 'COUPE_SUV_CROSSOVER',
  CrossoverFastback = 'CROSSOVER_FASTBACK',
  CrossoverLiftback = 'CROSSOVER_LIFTBACK',
  Cuv = 'CUV',
  Motorhome = 'MOTORHOME',
  OffRoadConvertible = 'OFF_ROAD_CONVERTIBLE',
  OffRoadCoupe = 'OFF_ROAD_COUPE',
  Sac = 'SAC',
  Sav = 'SAV',
  SedanLiftback = 'SEDAN_LIFTBACK',
  SmallCarHatchback = 'SMALL_CAR_HATCHBACK',
  SportsCarCoupe = 'SPORTS_CAR_COUPE',
  Suv = 'SUV',
  Van = 'VAN',
  WagonCrossover = 'WAGON_CROSSOVER',
  WagonMpv = 'WAGON_MPV'
}

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

/** Type of braking system used in vehicles */
export enum CatalogEquipmentBrakeType {
  Disc = 'DISC',
  Drum = 'DRUM',
  VentilatedDisc = 'VENTILATED_DISC'
}

export type CatalogModel = {
  __typename?: 'CatalogModel';
  brand?: Maybe<CatalogBrand>;
  brandId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  generations?: Maybe<Array<CatalogModelGeneration>>;
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

export type CatalogModelGeneration = {
  __typename?: 'CatalogModelGeneration';
  bodyType?: Maybe<CatalogBodyType>;
  brand?: Maybe<CatalogBrand>;
  brandId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  frontBrakesType?: Maybe<CatalogEquipmentBrakeType>;
  /** Front track in mm */
  frontTrack?: Maybe<Scalars['Int']['output']>;
  /** Height in mm */
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  legacySlug: Scalars['String']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  /** Length in mm */
  length?: Maybe<Scalars['Int']['output']>;
  model: CatalogModel;
  modelId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  productionStart?: Maybe<Scalars['DateTime']['output']>;
  productionStop?: Maybe<Scalars['DateTime']['output']>;
  rearBrakesType?: Maybe<CatalogEquipmentBrakeType>;
  /** Rear track in mm */
  rearTrack?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  /** Maximum trunk space in liters */
  trunkSpaceMax?: Maybe<Scalars['Int']['output']>;
  /** Minimum trunk space in liters */
  trunkSpaceMin?: Maybe<Scalars['Int']['output']>;
  /** Wheelbase in mm */
  wheelbase?: Maybe<Scalars['Int']['output']>;
  /** Width in mm */
  width?: Maybe<Scalars['Int']['output']>;
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

export type CreateCatalogModelGenerationInput = {
  bodyType?: InputMaybe<CatalogBodyType>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  frontBrakesType?: InputMaybe<CatalogEquipmentBrakeType>;
  frontTrack?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  legacySlug: Scalars['String']['input'];
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Int']['input']>;
  modelId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  productionStart?: InputMaybe<Scalars['String']['input']>;
  productionStop?: InputMaybe<Scalars['String']['input']>;
  rearBrakesType?: InputMaybe<CatalogEquipmentBrakeType>;
  rearTrack?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  trunkSpaceMax?: InputMaybe<Scalars['Int']['input']>;
  trunkSpaceMin?: InputMaybe<Scalars['Int']['input']>;
  wheelbase?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
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
  createCatalogModelGeneration: CatalogModelGeneration;
  createUser: User;
  deleteCatalogBrand: Scalars['Boolean']['output'];
  deleteCatalogColor: Scalars['Boolean']['output'];
  deleteCatalogModel: Scalars['Boolean']['output'];
  deleteCatalogModelGeneration: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  impersonateUser: ImpersonateResponse;
  login: AuthResponse;
  refreshToken: AuthResponse;
  softDeleteUser: User;
  stopImpersonation: AuthResponse;
  updateCatalogBrand: CatalogBrand;
  updateCatalogColor: CatalogColor;
  updateCatalogModel: CatalogModel;
  updateCatalogModelGeneration: CatalogModelGeneration;
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


export type MutationCreateCatalogModelGenerationArgs = {
  input: CreateCatalogModelGenerationInput;
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


export type MutationDeleteCatalogModelGenerationArgs = {
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


export type MutationUpdateCatalogModelGenerationArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogModelGenerationInput;
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
  catalogModelGeneration: CatalogModelGeneration;
  catalogModelGenerationByLegacySlug: CatalogModelGeneration;
  catalogModelGenerationBySlug: CatalogModelGeneration;
  catalogModelGenerations: Array<CatalogModelGeneration>;
  catalogModelGenerationsByModelId: Array<CatalogModelGeneration>;
  catalogModels: Array<CatalogModel>;
  catalogModelsByBrand: Array<CatalogModel>;
  entityHistory: Array<AuditLog>;
  highlightedCatalogBrands: Array<CatalogBrand>;
  highlightedCatalogModels: Array<CatalogModel>;
  recommendedCatalogBrands: Array<CatalogBrand>;
  recommendedCatalogModels: Array<CatalogModel>;
  searchCatalogBrands: Array<CatalogBrand>;
  searchCatalogColors: Array<CatalogColor>;
  searchCatalogModelGenerations: Array<CatalogModelGeneration>;
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


export type QueryCatalogModelGenerationArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationByLegacySlugArgs = {
  legacySlug: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationsArgs = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryCatalogModelGenerationsByModelIdArgs = {
  modelId: Scalars['String']['input'];
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


export type QuerySearchCatalogModelGenerationsArgs = {
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

export type UpdateCatalogModelGenerationInput = {
  bodyType?: InputMaybe<CatalogBodyType>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  frontBrakesType?: InputMaybe<CatalogEquipmentBrakeType>;
  frontTrack?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  legacySlug?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Int']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productionStart?: InputMaybe<Scalars['String']['input']>;
  productionStop?: InputMaybe<Scalars['String']['input']>;
  rearBrakesType?: InputMaybe<CatalogEquipmentBrakeType>;
  rearTrack?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  trunkSpaceMax?: InputMaybe<Scalars['Int']['input']>;
  trunkSpaceMin?: InputMaybe<Scalars['Int']['input']>;
  wheelbase?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
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

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, isActive: boolean } } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, isActive: boolean } } };

export type ImpersonateUserMutationVariables = Exact<{
  input: ImpersonateInput;
}>;


export type ImpersonateUserMutation = { __typename?: 'Mutation', impersonateUser: { __typename?: 'ImpersonateResponse', accessToken: string, refreshToken: string, impersonatedUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, isActive: boolean }, originalUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, isActive: boolean } } };

export type StopImpersonationMutationVariables = Exact<{ [key: string]: never; }>;


export type StopImpersonationMutation = { __typename?: 'Mutation', stopImpersonation: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, isActive: boolean } } };

export type GetAllCatalogBrandsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllCatalogBrandsQuery = { __typename?: 'Query', allCatalogBrands: Array<{ __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, legacySystemId?: string | null, legacySlug?: string | null, createdAt: any, updatedAt?: any | null }> };

export type GetCatalogBrandQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCatalogBrandQuery = { __typename?: 'Query', catalogBrand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, legacySystemId?: string | null, legacySlug?: string | null, createdAt: any, updatedAt?: any | null } };

export type CreateCatalogBrandMutationVariables = Exact<{
  input: CreateCatalogBrandInput;
}>;


export type CreateCatalogBrandMutation = { __typename?: 'Mutation', createCatalogBrand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, legacySystemId?: string | null, legacySlug?: string | null, createdAt: any, updatedAt?: any | null } };

export type UpdateCatalogBrandMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogBrandInput;
}>;


export type UpdateCatalogBrandMutation = { __typename?: 'Mutation', updateCatalogBrand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, createdAt: any, updatedAt?: any | null } };

export type DeleteCatalogBrandMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCatalogBrandMutation = { __typename?: 'Mutation', deleteCatalogBrand: boolean };

export type CheckBrandSlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CheckBrandSlugQuery = { __typename?: 'Query', catalogBrandBySlug: { __typename?: 'CatalogBrand', id: string, slug: string } };

export type GetAllCatalogModelGenerationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAllCatalogModelGenerationsQuery = { __typename?: 'Query', catalogModelGenerations: Array<{ __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, legacySlug: string, description?: string | null, productionStart?: any | null, productionStop?: any | null, wheelbase?: number | null, frontTrack?: number | null, rearTrack?: number | null, length?: number | null, width?: number | null, height?: number | null, trunkSpaceMin?: number | null, trunkSpaceMax?: number | null, bodyType?: CatalogBodyType | null, frontBrakesType?: CatalogEquipmentBrakeType | null, rearBrakesType?: CatalogEquipmentBrakeType | null, isActive: boolean, legacySystemId?: string | null, modelId: string, brandId?: string | null, createdAt: any, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null }, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null }> };

export type GetCatalogModelGenerationQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCatalogModelGenerationQuery = { __typename?: 'Query', catalogModelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, legacySlug: string, description?: string | null, productionStart?: any | null, productionStop?: any | null, wheelbase?: number | null, frontTrack?: number | null, rearTrack?: number | null, length?: number | null, width?: number | null, height?: number | null, trunkSpaceMin?: number | null, trunkSpaceMax?: number | null, bodyType?: CatalogBodyType | null, frontBrakesType?: CatalogEquipmentBrakeType | null, rearBrakesType?: CatalogEquipmentBrakeType | null, isActive: boolean, legacySystemId?: string | null, modelId: string, brandId?: string | null, createdAt: any, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null }, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } };

export type CreateCatalogModelGenerationMutationVariables = Exact<{
  input: CreateCatalogModelGenerationInput;
}>;


export type CreateCatalogModelGenerationMutation = { __typename?: 'Mutation', createCatalogModelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, legacySlug: string, description?: string | null, productionStart?: any | null, productionStop?: any | null, wheelbase?: number | null, frontTrack?: number | null, rearTrack?: number | null, length?: number | null, width?: number | null, height?: number | null, trunkSpaceMin?: number | null, trunkSpaceMax?: number | null, bodyType?: CatalogBodyType | null, frontBrakesType?: CatalogEquipmentBrakeType | null, rearBrakesType?: CatalogEquipmentBrakeType | null, isActive: boolean, modelId: string, brandId?: string | null, createdAt: any, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string }, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } };

export type UpdateCatalogModelGenerationMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogModelGenerationInput;
}>;


export type UpdateCatalogModelGenerationMutation = { __typename?: 'Mutation', updateCatalogModelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, legacySlug: string, description?: string | null, productionStart?: any | null, productionStop?: any | null, wheelbase?: number | null, frontTrack?: number | null, rearTrack?: number | null, length?: number | null, width?: number | null, height?: number | null, trunkSpaceMin?: number | null, trunkSpaceMax?: number | null, bodyType?: CatalogBodyType | null, frontBrakesType?: CatalogEquipmentBrakeType | null, rearBrakesType?: CatalogEquipmentBrakeType | null, isActive: boolean, modelId: string, brandId?: string | null, createdAt: any, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string }, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } };

export type DeleteCatalogModelGenerationMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCatalogModelGenerationMutation = { __typename?: 'Mutation', deleteCatalogModelGeneration: boolean };

export type CheckGenerationSlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CheckGenerationSlugQuery = { __typename?: 'Query', catalogModelGenerationBySlug: { __typename?: 'CatalogModelGeneration', id: string, slug?: string | null } };

export type GetAllCatalogModelsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllCatalogModelsQuery = { __typename?: 'Query', allCatalogModels: Array<{ __typename?: 'CatalogModel', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, legacySystemId?: string | null, legacySlug?: string | null, brandId: string, createdAt: any, updatedAt?: any | null, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null }> };

export type GetCatalogModelQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCatalogModelQuery = { __typename?: 'Query', catalogModel: { __typename?: 'CatalogModel', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, legacySystemId?: string | null, legacySlug?: string | null, brandId: string, createdAt: any, updatedAt?: any | null, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } };

export type CreateCatalogModelMutationVariables = Exact<{
  input: CreateCatalogModelInput;
}>;


export type CreateCatalogModelMutation = { __typename?: 'Mutation', createCatalogModel: { __typename?: 'CatalogModel', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, legacySystemId?: string | null, legacySlug?: string | null, brandId: string, createdAt: any, updatedAt?: any | null, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } };

export type UpdateCatalogModelMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogModelInput;
}>;


export type UpdateCatalogModelMutation = { __typename?: 'Mutation', updateCatalogModel: { __typename?: 'CatalogModel', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, brandId: string, createdAt: any, updatedAt?: any | null, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } };

export type DeleteCatalogModelMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCatalogModelMutation = { __typename?: 'Mutation', deleteCatalogModel: boolean };

export type CheckModelSlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CheckModelSlugQuery = { __typename?: 'Query', catalogModelBySlug: { __typename?: 'CatalogModel', id: string, slug: string } };

export type GetAllUsersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, phone?: string | null, bio?: string | null, isActive: boolean, createdAt: any, updatedAt: any }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, phone?: string | null, bio?: string | null, isActive: boolean, createdAt: any, updatedAt: any } };

export type SearchUsersQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, isActive: boolean }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, phone?: string | null, bio?: string | null, isActive: boolean, createdAt: any, updatedAt: any } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole>, phone?: string | null, bio?: string | null, isActive: boolean, createdAt: any, updatedAt: any } };

export type SoftDeleteUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SoftDeleteUserMutation = { __typename?: 'Mutation', softDeleteUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, isActive: boolean } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type RefreshTokenInternalMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenInternalMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles: Array<UserRole> } } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ImpersonateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImpersonateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImpersonateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impersonateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"impersonatedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<ImpersonateUserMutation, ImpersonateUserMutationVariables>;
export const StopImpersonationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StopImpersonation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopImpersonation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<StopImpersonationMutation, StopImpersonationMutationVariables>;
export const GetAllCatalogBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCatalogBrands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCatalogBrands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCatalogBrandsQuery, GetAllCatalogBrandsQueryVariables>;
export const GetCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogBrandQuery, GetCatalogBrandQueryVariables>;
export const CreateCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogBrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCatalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCatalogBrandMutation, CreateCatalogBrandMutationVariables>;
export const UpdateCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogBrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCatalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCatalogBrandMutation, UpdateCatalogBrandMutationVariables>;
export const DeleteCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCatalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCatalogBrandMutation, DeleteCatalogBrandMutationVariables>;
export const CheckBrandSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckBrandSlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogBrandBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CheckBrandSlugQuery, CheckBrandSlugQueryVariables>;
export const GetAllCatalogModelGenerationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCatalogModelGenerations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModelGenerations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"modelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"wheelbase"}},{"kind":"Field","name":{"kind":"Name","value":"frontTrack"}},{"kind":"Field","name":{"kind":"Name","value":"rearTrack"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMin"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMax"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"frontBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"rearBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCatalogModelGenerationsQuery, GetAllCatalogModelGenerationsQueryVariables>;
export const GetCatalogModelGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogModelGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModelGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"wheelbase"}},{"kind":"Field","name":{"kind":"Name","value":"frontTrack"}},{"kind":"Field","name":{"kind":"Name","value":"rearTrack"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMin"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMax"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"frontBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"rearBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogModelGenerationQuery, GetCatalogModelGenerationQueryVariables>;
export const CreateCatalogModelGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCatalogModelGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogModelGenerationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCatalogModelGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"wheelbase"}},{"kind":"Field","name":{"kind":"Name","value":"frontTrack"}},{"kind":"Field","name":{"kind":"Name","value":"rearTrack"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMin"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMax"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"frontBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"rearBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateCatalogModelGenerationMutation, CreateCatalogModelGenerationMutationVariables>;
export const UpdateCatalogModelGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCatalogModelGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogModelGenerationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCatalogModelGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"wheelbase"}},{"kind":"Field","name":{"kind":"Name","value":"frontTrack"}},{"kind":"Field","name":{"kind":"Name","value":"rearTrack"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMin"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMax"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"frontBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"rearBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCatalogModelGenerationMutation, UpdateCatalogModelGenerationMutationVariables>;
export const DeleteCatalogModelGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCatalogModelGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCatalogModelGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCatalogModelGenerationMutation, DeleteCatalogModelGenerationMutationVariables>;
export const CheckGenerationSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckGenerationSlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModelGenerationBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CheckGenerationSlugQuery, CheckGenerationSlugQueryVariables>;
export const GetAllCatalogModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCatalogModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCatalogModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCatalogModelsQuery, GetAllCatalogModelsQueryVariables>;
export const GetCatalogModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogModelQuery, GetCatalogModelQueryVariables>;
export const CreateCatalogModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCatalogModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCatalogModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCatalogModelMutation, CreateCatalogModelMutationVariables>;
export const UpdateCatalogModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCatalogModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCatalogModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCatalogModelMutation, UpdateCatalogModelMutationVariables>;
export const DeleteCatalogModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCatalogModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCatalogModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCatalogModelMutation, DeleteCatalogModelMutationVariables>;
export const CheckModelSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckModelSlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModelBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CheckModelSlugQuery, CheckModelSlugQueryVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const SoftDeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SoftDeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"softDeleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const RefreshTokenInternalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokenInternal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenInternalMutation, RefreshTokenInternalMutationVariables>;