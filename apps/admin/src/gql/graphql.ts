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

/** Reason why a car request was cancelled */
export enum CancellationReason {
  BadCreditScore = 'BAD_CREDIT_SCORE',
  CarUnavailable = 'CAR_UNAVAILABLE',
  ChangedMind = 'CHANGED_MIND',
  CompetitorOffer = 'COMPETITOR_OFFER',
  DuplicateRequest = 'DUPLICATE_REQUEST',
  IneligibleCustomer = 'INELIGIBLE_CUSTOMER',
  InternalError = 'INTERNAL_ERROR',
  InvalidContact = 'INVALID_CONTACT',
  NoInterest = 'NO_INTEREST',
  NoMoney = 'NO_MONEY',
  NoNeed = 'NO_NEED',
  NoOpportunity = 'NO_OPPORTUNITY',
  NoOther = 'NO_OTHER',
  NoTime = 'NO_TIME',
  Other = 'OTHER',
  PriceTooHigh = 'PRICE_TOO_HIGH',
  RejectedByFinance = 'REJECTED_BY_FINANCE',
  WaitTimeTooLong = 'WAIT_TIME_TOO_LONG'
}

export type CarRequest = {
  __typename?: 'CarRequest';
  assignedAgent?: Maybe<User>;
  assignedAgentId?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<CatalogBrand>;
  brandId?: Maybe<Scalars['String']['output']>;
  cancellationNote?: Maybe<Scalars['String']['output']>;
  cancellationReason?: Maybe<CancellationReason>;
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<User>;
  customerId?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  feedbackAt?: Maybe<Scalars['DateTime']['output']>;
  financingType: FinancingType;
  gclid?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isFromLegacySystem: Scalars['Boolean']['output'];
  leasingCompany?: Maybe<LeasingCompany>;
  leasingCompanyId?: Maybe<Scalars['String']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  model?: Maybe<CatalogModel>;
  modelId?: Maybe<Scalars['String']['output']>;
  modifiedAt: Scalars['DateTime']['output'];
  nextCallAt?: Maybe<Scalars['DateTime']['output']>;
  noteInternal?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  relayedAt?: Maybe<Scalars['DateTime']['output']>;
  requestEmail?: Maybe<Scalars['String']['output']>;
  requestFirstName?: Maybe<Scalars['String']['output']>;
  requestLastName?: Maybe<Scalars['String']['output']>;
  requestNewsletter?: Maybe<Scalars['Boolean']['output']>;
  requestPhone?: Maybe<Scalars['String']['output']>;
  requestPostalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<CarRequestState>;
  stateId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<CarRequestStatus>;
  statusId?: Maybe<Scalars['String']['output']>;
  waitingForOffer?: Maybe<Scalars['Boolean']['output']>;
};

export type CarRequestState = {
  __typename?: 'CarRequestState';
  code: Scalars['String']['output'];
  colorHex?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CarRequestStatus = {
  __typename?: 'CarRequestStatus';
  code: Scalars['String']['output'];
  colorHex?: Maybe<Scalars['String']['output']>;
  columnDisplayOrder: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isFinal: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  logo?: Maybe<File>;
  logoId?: Maybe<Scalars['String']['output']>;
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
  legacySlug?: Maybe<Scalars['String']['output']>;
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

export type CreateCarRequestInput = {
  assignedAgentId?: InputMaybe<Scalars['String']['input']>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  cancellationNote?: InputMaybe<Scalars['String']['input']>;
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
  closedAt?: InputMaybe<Scalars['DateTime']['input']>;
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  confirmedAt?: InputMaybe<Scalars['DateTime']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Float']['input']>;
  feedbackAt?: InputMaybe<Scalars['DateTime']['input']>;
  financingType: Scalars['String']['input'];
  gclid?: InputMaybe<Scalars['String']['input']>;
  isFromLegacySystem?: InputMaybe<Scalars['Boolean']['input']>;
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  nextCallAt?: InputMaybe<Scalars['DateTime']['input']>;
  noteInternal?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
  relayedAt?: InputMaybe<Scalars['DateTime']['input']>;
  requestEmail?: InputMaybe<Scalars['String']['input']>;
  requestFirstName?: InputMaybe<Scalars['String']['input']>;
  requestLastName?: InputMaybe<Scalars['String']['input']>;
  requestNewsletter?: InputMaybe<Scalars['Boolean']['input']>;
  requestPhone?: InputMaybe<Scalars['String']['input']>;
  requestPostalCode?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<Scalars['String']['input']>;
  waitingForOffer?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateCatalogBrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isHighlighted?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommended?: InputMaybe<Scalars['Boolean']['input']>;
  legacySlug?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  logoId?: InputMaybe<Scalars['String']['input']>;
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
  legacySlug?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Int']['input']>;
  modelId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  productionStart?: InputMaybe<Scalars['DateTime']['input']>;
  productionStop?: InputMaybe<Scalars['DateTime']['input']>;
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

export type CreateDirectPurchaseOfferInput = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  discountPercentage?: InputMaybe<Scalars['Float']['input']>;
  financingAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  includesWarranty?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  modelGenerationId: Scalars['String']['input'];
  modelId?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  totalPrice: Scalars['Float']['input'];
  warrantyYears?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateFileInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  checksum: Scalars['String']['input'];
  extension: Scalars['String']['input'];
  height?: InputMaybe<Scalars['Int']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  mimeType: Scalars['String']['input'];
  name: Scalars['String']['input'];
  relativePath: Scalars['String']['input'];
  size: Scalars['Int']['input'];
  thumbnailPath?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateIndividualOfferInput = {
  assignedToId?: InputMaybe<Scalars['String']['input']>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  customRequirements?: InputMaybe<Scalars['String']['input']>;
  customerId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  modelGenerationId: Scalars['String']['input'];
  modelId?: InputMaybe<Scalars['String']['input']>;
  responseDeadline?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: IndividualOfferStatus;
  totalPrice: Scalars['Float']['input'];
};

export type CreateLeasingCompanyInput = {
  link?: InputMaybe<Scalars['String']['input']>;
  logoId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateOperationalLeasingOfferInput = {
  annualMileageLimit: Scalars['Int']['input'];
  brandId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  downPaymentLeasing?: InputMaybe<Scalars['Float']['input']>;
  hasAssistanceServiceIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasGapIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasServiceIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasWinterTyresIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  leasingDurationMonths: Scalars['Int']['input'];
  modelGenerationId: Scalars['String']['input'];
  modelId?: InputMaybe<Scalars['String']['input']>;
  monthlyPayment: Scalars['Float']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  totalPrice: Scalars['Float']['input'];
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

export type DirectPurchaseOffer = {
  __typename?: 'DirectPurchaseOffer';
  annualMileageLimit?: Maybe<Scalars['Int']['output']>;
  assignedTo?: Maybe<User>;
  assignedToId?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<CatalogBrand>;
  brandId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customRequirements?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<User>;
  customerId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  downPaymentLeasing?: Maybe<Scalars['Float']['output']>;
  financingAvailable?: Maybe<Scalars['Boolean']['output']>;
  hasAssistanceServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasGapIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasWinterTyresIncluded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  includesWarranty?: Maybe<Scalars['Boolean']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  leasingDurationMonths?: Maybe<Scalars['Int']['output']>;
  model?: Maybe<CatalogModel>;
  modelGeneration: CatalogModelGeneration;
  modelGenerationId: Scalars['String']['output'];
  modelId?: Maybe<Scalars['String']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  responseDeadline?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<IndividualOfferStatus>;
  totalPrice: Scalars['Float']['output'];
  type: OfferType;
  updatedAt: Scalars['DateTime']['output'];
  warrantyYears?: Maybe<Scalars['Int']['output']>;
};

export type File = {
  __typename?: 'File';
  alt?: Maybe<Scalars['String']['output']>;
  checksum: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  extension: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isImage: Scalars['Boolean']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  relativePath: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  sizeFormatted: Scalars['String']['output'];
  thumbnailPath?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  uploadedBy?: Maybe<User>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type FileFiltersInput = {
  extension?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  minHeight?: InputMaybe<Scalars['Int']['input']>;
  minSize?: InputMaybe<Scalars['Int']['input']>;
  minWidth?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onlyImages?: InputMaybe<Scalars['Boolean']['input']>;
  onlyOrphaned?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Type of financing for the car request */
export enum FinancingType {
  Cash = 'CASH',
  Leasing = 'LEASING'
}

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

export type IndividualOffer = {
  __typename?: 'IndividualOffer';
  annualMileageLimit?: Maybe<Scalars['Int']['output']>;
  assignedTo?: Maybe<User>;
  assignedToId?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<CatalogBrand>;
  brandId?: Maybe<Scalars['String']['output']>;
  calculations?: Maybe<Array<OfferCalculation>>;
  createdAt: Scalars['DateTime']['output'];
  customRequirements?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<User>;
  customerId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  downPaymentLeasing?: Maybe<Scalars['Float']['output']>;
  financingAvailable?: Maybe<Scalars['Boolean']['output']>;
  hasAssistanceServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasGapIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasWinterTyresIncluded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  includesWarranty?: Maybe<Scalars['Boolean']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  leasingDurationMonths?: Maybe<Scalars['Int']['output']>;
  model?: Maybe<CatalogModel>;
  modelGeneration: CatalogModelGeneration;
  modelGenerationId: Scalars['String']['output'];
  modelId?: Maybe<Scalars['String']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  responseDeadline?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<IndividualOfferStatus>;
  totalPrice: Scalars['Float']['output'];
  type: OfferType;
  updatedAt: Scalars['DateTime']['output'];
  warrantyYears?: Maybe<Scalars['Int']['output']>;
};

/** Status of individual offer */
export enum IndividualOfferStatus {
  /** Offer successfully completed */
  Completed = 'COMPLETED',
  /** Offer is being processed */
  InProgress = 'IN_PROGRESS',
  /** New offer, not yet processed */
  New = 'NEW',
  /** Offer was rejected */
  Rejected = 'REJECTED'
}

export type LeasingCompany = {
  __typename?: 'LeasingCompany';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<File>;
  logoId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add a feature to a calculation (admin only) */
  addFeatureToCalculation: OfferCalculationFeature;
  /** Create a calculation for individual offer (admin only) */
  createCalculation: OfferCalculation;
  createCarRequest: CarRequest;
  createCatalogBrand: CatalogBrand;
  createCatalogColor: CatalogColor;
  createCatalogModel: CatalogModel;
  createCatalogModelGeneration: CatalogModelGeneration;
  /** Create a new color variant (admin only) */
  createColorVariant: OfferColorVariant;
  /** Create a new direct purchase offer (admin only) */
  createDirectPurchaseOffer: DirectPurchaseOffer;
  createFile: File;
  /** Create a new individual (custom) offer (admin only) */
  createIndividualOffer: IndividualOffer;
  createLeasingCompany: LeasingCompany;
  /** Create a new leasing variant (admin only) */
  createLeasingVariant: OfferLeasingVariant;
  /** Create a new operational leasing offer (admin only) */
  createOperationalLeasingOffer: OperationalLeasingOffer;
  /** Create optional equipment (admin only) */
  createOptionalEquipment: OfferOptionalEquipment;
  createUser: User;
  /** Delete a calculation (admin only) */
  deleteCalculation: Scalars['Boolean']['output'];
  deleteCarRequest: Scalars['Boolean']['output'];
  deleteCatalogBrand: Scalars['Boolean']['output'];
  deleteCatalogColor: Scalars['Boolean']['output'];
  deleteCatalogModel: Scalars['Boolean']['output'];
  deleteCatalogModelGeneration: Scalars['Boolean']['output'];
  /** Delete a color variant (admin only) */
  deleteColorVariant: Scalars['Boolean']['output'];
  deleteFile: Scalars['Boolean']['output'];
  deleteFileCompletely: Scalars['Boolean']['output'];
  deleteLeasingCompany: Scalars['Boolean']['output'];
  /** Delete a leasing variant (admin only) */
  deleteLeasingVariant: Scalars['Boolean']['output'];
  /** Delete an offer (admin only) */
  deleteOffer: Scalars['Boolean']['output'];
  /** Delete optional equipment (admin only) */
  deleteOptionalEquipment: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  generateUploadUrl: Scalars['String']['output'];
  impersonateUser: ImpersonateResponse;
  login: AuthResponse;
  refreshToken: AuthResponse;
  softDeleteUser: User;
  stopImpersonation: AuthResponse;
  updateCarRequest: CarRequest;
  updateCatalogBrand: CatalogBrand;
  updateCatalogColor: CatalogColor;
  updateCatalogModel: CatalogModel;
  updateCatalogModelGeneration: CatalogModelGeneration;
  updateFile: File;
  /** Update status of an individual offer (admin only) */
  updateIndividualOfferStatus: IndividualOffer;
  updateLeasingCompany: LeasingCompany;
  /** Update an existing offer (admin only) */
  updateOffer: Offer;
  updateUser: User;
};


export type MutationAddFeatureToCalculationArgs = {
  calculationId: Scalars['String']['input'];
  featureDescription?: InputMaybe<Scalars['String']['input']>;
  featureName: Scalars['String']['input'];
};


export type MutationCreateCalculationArgs = {
  availability?: InputMaybe<Scalars['String']['input']>;
  exteriorColorId?: InputMaybe<Scalars['String']['input']>;
  interiorColorId?: InputMaybe<Scalars['String']['input']>;
  offerId: Scalars['String']['input'];
};


export type MutationCreateCarRequestArgs = {
  input: CreateCarRequestInput;
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


export type MutationCreateColorVariantArgs = {
  colorName?: InputMaybe<Scalars['String']['input']>;
  exteriorColorId: Scalars['String']['input'];
  interiorColorId: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  offerId: Scalars['String']['input'];
};


export type MutationCreateDirectPurchaseOfferArgs = {
  input: CreateDirectPurchaseOfferInput;
};


export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


export type MutationCreateIndividualOfferArgs = {
  input: CreateIndividualOfferInput;
};


export type MutationCreateLeasingCompanyArgs = {
  input: CreateLeasingCompanyInput;
};


export type MutationCreateLeasingVariantArgs = {
  annualMileageLimit: Scalars['Float']['input'];
  downPayment?: InputMaybe<Scalars['Float']['input']>;
  isBestOffer?: InputMaybe<Scalars['Boolean']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  leasingDurationMonths: Scalars['Float']['input'];
  monthlyPayment: Scalars['Float']['input'];
  offerId: Scalars['String']['input'];
  totalPrice: Scalars['Float']['input'];
};


export type MutationCreateOperationalLeasingOfferArgs = {
  input: CreateOperationalLeasingOfferInput;
};


export type MutationCreateOptionalEquipmentArgs = {
  additionalPrice: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  offerId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCalculationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCarRequestArgs = {
  id: Scalars['String']['input'];
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


export type MutationDeleteColorVariantArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFileArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFileCompletelyArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteLeasingCompanyArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteLeasingVariantArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOfferArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOptionalEquipmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationGenerateUploadUrlArgs = {
  contentType: Scalars['String']['input'];
  filename: Scalars['String']['input'];
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


export type MutationUpdateCarRequestArgs = {
  id: Scalars['String']['input'];
  input: UpdateCarRequestInput;
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


export type MutationUpdateFileArgs = {
  id: Scalars['String']['input'];
  input: UpdateFileInput;
};


export type MutationUpdateIndividualOfferStatusArgs = {
  id: Scalars['String']['input'];
  status: IndividualOfferStatus;
};


export type MutationUpdateLeasingCompanyArgs = {
  id: Scalars['String']['input'];
  input: UpdateLeasingCompanyInput;
};


export type MutationUpdateOfferArgs = {
  id: Scalars['String']['input'];
  input: UpdateOfferInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: UpdateUserInput;
};

export type Offer = {
  __typename?: 'Offer';
  annualMileageLimit?: Maybe<Scalars['Int']['output']>;
  assignedTo?: Maybe<User>;
  assignedToId?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<CatalogBrand>;
  brandId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customRequirements?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<User>;
  customerId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  downPaymentLeasing?: Maybe<Scalars['Float']['output']>;
  financingAvailable?: Maybe<Scalars['Boolean']['output']>;
  hasAssistanceServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasGapIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasWinterTyresIncluded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  includesWarranty?: Maybe<Scalars['Boolean']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  leasingDurationMonths?: Maybe<Scalars['Int']['output']>;
  model?: Maybe<CatalogModel>;
  modelGeneration: CatalogModelGeneration;
  modelGenerationId: Scalars['String']['output'];
  modelId?: Maybe<Scalars['String']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  responseDeadline?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<IndividualOfferStatus>;
  totalPrice: Scalars['Float']['output'];
  type: OfferType;
  updatedAt: Scalars['DateTime']['output'];
  warrantyYears?: Maybe<Scalars['Int']['output']>;
};

export type OfferCalculation = {
  __typename?: 'OfferCalculation';
  availability: OfferCalculationAvailability;
  createdAt: Scalars['DateTime']['output'];
  exteriorColor?: Maybe<CatalogColor>;
  exteriorColorId?: Maybe<Scalars['String']['output']>;
  features: Array<OfferCalculationFeature>;
  id: Scalars['ID']['output'];
  interiorColor?: Maybe<CatalogColor>;
  interiorColorId?: Maybe<Scalars['String']['output']>;
  offer: IndividualOffer;
  offerId: Scalars['String']['output'];
};

/** Availability status for offer calculation */
export enum OfferCalculationAvailability {
  InStock = 'IN_STOCK',
  NotAvailable = 'NOT_AVAILABLE',
  OnOrder = 'ON_ORDER'
}

export type OfferCalculationFeature = {
  __typename?: 'OfferCalculationFeature';
  calculation: OfferCalculation;
  calculationId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  featureDescription?: Maybe<Scalars['String']['output']>;
  featureName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type OfferColorVariant = {
  __typename?: 'OfferColorVariant';
  colorName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  exteriorColor: CatalogColor;
  exteriorColorId: Scalars['String']['output'];
  galleryId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interiorColor: CatalogColor;
  interiorColorId: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  offer: OperationalLeasingOffer;
  offerId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OfferFiltersInput = {
  assignedToId?: InputMaybe<Scalars['String']['input']>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  modelGenerationId?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  priceMax?: InputMaybe<Scalars['Float']['input']>;
  priceMin?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<IndividualOfferStatus>;
  type?: InputMaybe<OfferType>;
};

export type OfferLeasingVariant = {
  __typename?: 'OfferLeasingVariant';
  annualMileageLimit: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  downPayment?: Maybe<Scalars['Float']['output']>;
  freeMileageLimit?: Maybe<Scalars['Int']['output']>;
  hasAssistanceServiceIncluded: Scalars['Boolean']['output'];
  hasGapIncluded: Scalars['Boolean']['output'];
  hasGlassInsuranceIncluded: Scalars['Boolean']['output'];
  hasHighwayIncluded: Scalars['Boolean']['output'];
  hasServiceIncluded: Scalars['Boolean']['output'];
  hasWinterTyresIncluded: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isBestOffer: Scalars['Boolean']['output'];
  isDefault: Scalars['Boolean']['output'];
  leasingCompany?: Maybe<LeasingCompany>;
  leasingCompanyId?: Maybe<Scalars['String']['output']>;
  leasingDurationMonths: Scalars['Int']['output'];
  monthlyPayment: Scalars['Float']['output'];
  offer: OperationalLeasingOffer;
  offerId: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  totalPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wearTolerance?: Maybe<Scalars['Boolean']['output']>;
};

export type OfferOptionalEquipment = {
  __typename?: 'OfferOptionalEquipment';
  additionalPrice: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAvailable: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  offer: OperationalLeasingOffer;
  offerId: Scalars['String']['output'];
};

/** Type of offer */
export enum OfferType {
  /** Direct purchase offer (public) */
  DirectPurchase = 'DIRECT_PURCHASE',
  /** Individual custom offer (admin-only) */
  Individual = 'INDIVIDUAL',
  /** Operational leasing offer (public) */
  OperationalLeasing = 'OPERATIONAL_LEASING'
}

export type OperationalLeasingOffer = {
  __typename?: 'OperationalLeasingOffer';
  annualMileageLimit?: Maybe<Scalars['Int']['output']>;
  assignedTo?: Maybe<User>;
  assignedToId?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<CatalogBrand>;
  brandId?: Maybe<Scalars['String']['output']>;
  colorVariants?: Maybe<Array<OfferColorVariant>>;
  createdAt: Scalars['DateTime']['output'];
  customRequirements?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<User>;
  customerId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  downPaymentLeasing?: Maybe<Scalars['Float']['output']>;
  financingAvailable?: Maybe<Scalars['Boolean']['output']>;
  hasAssistanceServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasGapIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasWinterTyresIncluded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  includesWarranty?: Maybe<Scalars['Boolean']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  leasingDurationMonths?: Maybe<Scalars['Int']['output']>;
  model?: Maybe<CatalogModel>;
  modelGeneration: CatalogModelGeneration;
  modelGenerationId: Scalars['String']['output'];
  modelId?: Maybe<Scalars['String']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  optionalEquipment?: Maybe<Array<OfferOptionalEquipment>>;
  responseDeadline?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<IndividualOfferStatus>;
  totalPrice: Scalars['Float']['output'];
  type: OfferType;
  updatedAt: Scalars['DateTime']['output'];
  variants?: Maybe<Array<OfferLeasingVariant>>;
  warrantyYears?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  allCarRequests: Array<CarRequest>;
  allCatalogBrands: Array<CatalogBrand>;
  allCatalogModels: Array<CatalogModel>;
  /** Get all offers including individual offers (admin only) */
  allOffers: Array<Offer>;
  auditLogs: Array<AuditLog>;
  /** Get all calculations for an individual offer (admin only) */
  calculationsByOffer: Array<OfferCalculation>;
  carRequest: CarRequest;
  carRequestsCount: Scalars['Int']['output'];
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
  /** Returns the brand if slug exists, null if available */
  checkBrandSlugAvailability?: Maybe<CatalogBrand>;
  /** Get all color variants for an offer (admin only) */
  colorVariantsByOffer: Array<OfferColorVariant>;
  /** Get all direct purchase offers */
  directPurchaseOffers: Array<Offer>;
  documents: Array<File>;
  entityHistory: Array<AuditLog>;
  file: File;
  fileByChecksum?: Maybe<File>;
  files: Array<File>;
  filesCount: Scalars['Int']['output'];
  highlightedCatalogBrands: Array<CatalogBrand>;
  highlightedCatalogModels: Array<CatalogModel>;
  images: Array<File>;
  /** Get all individual offers (admin only) */
  individualOffers: Array<IndividualOffer>;
  leasingCompanies: Array<LeasingCompany>;
  leasingCompaniesCount: Scalars['Int']['output'];
  leasingCompany: LeasingCompany;
  leasingCompanyByName?: Maybe<LeasingCompany>;
  /** Get all leasing variants for an offer (admin only) */
  leasingVariantsByOffer: Array<OfferLeasingVariant>;
  /** Get a single offer by ID (admin only) */
  offer: Offer;
  /** Get a single offer by slug (admin only) */
  offerBySlug: Offer;
  /** Get all public offers for a specific model generation */
  offersByModelGeneration: Array<Offer>;
  /** Get all operational leasing offers */
  operationalLeasingOffers: Array<Offer>;
  /** Get all optional equipment for an offer (admin only) */
  optionalEquipmentByOffer: Array<OfferOptionalEquipment>;
  publicFile: File;
  publicFileByLegacyId?: Maybe<File>;
  /** Get a single public offer by ID */
  publicOffer: Offer;
  /** Get a single public offer by slug */
  publicOfferBySlug: Offer;
  /** Get all public offers (operational leasing and direct purchase) */
  publicOffers: Array<Offer>;
  recommendedCatalogBrands: Array<CatalogBrand>;
  recommendedCatalogModels: Array<CatalogModel>;
  searchCatalogBrands: Array<CatalogBrand>;
  searchCatalogColors: Array<CatalogColor>;
  searchCatalogModelGenerations: Array<CatalogModelGeneration>;
  searchCatalogModels: Array<CatalogModel>;
  searchUsers: Array<User>;
  storageStats: StorageStats;
  user: User;
  userActivity: Array<AuditLog>;
  users: Array<User>;
};


export type QueryAllCarRequestsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryAllCatalogBrandsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryAllCatalogModelsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryAllOffersArgs = {
  filters?: InputMaybe<OfferFiltersInput>;
};


export type QueryAuditLogsArgs = {
  query: AuditQueryInput;
};


export type QueryCalculationsByOfferArgs = {
  offerId: Scalars['String']['input'];
};


export type QueryCarRequestArgs = {
  id: Scalars['String']['input'];
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


export type QueryCheckBrandSlugAvailabilityArgs = {
  slug: Scalars['String']['input'];
};


export type QueryColorVariantsByOfferArgs = {
  offerId: Scalars['String']['input'];
};


export type QueryDirectPurchaseOffersArgs = {
  filters?: InputMaybe<OfferFiltersInput>;
};


export type QueryEntityHistoryArgs = {
  entityId: Scalars['String']['input'];
  entityName: Scalars['String']['input'];
};


export type QueryFileArgs = {
  id: Scalars['String']['input'];
};


export type QueryFileByChecksumArgs = {
  checksum: Scalars['String']['input'];
};


export type QueryFilesArgs = {
  filters?: InputMaybe<FileFiltersInput>;
};


export type QueryFilesCountArgs = {
  filters?: InputMaybe<FileFiltersInput>;
};


export type QueryHighlightedCatalogBrandsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryIndividualOffersArgs = {
  filters?: InputMaybe<OfferFiltersInput>;
};


export type QueryLeasingCompanyArgs = {
  id: Scalars['String']['input'];
};


export type QueryLeasingCompanyByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryLeasingVariantsByOfferArgs = {
  offerId: Scalars['String']['input'];
};


export type QueryOfferArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfferBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryOffersByModelGenerationArgs = {
  modelGenerationId: Scalars['String']['input'];
};


export type QueryOperationalLeasingOffersArgs = {
  filters?: InputMaybe<OfferFiltersInput>;
};


export type QueryOptionalEquipmentByOfferArgs = {
  offerId: Scalars['String']['input'];
};


export type QueryPublicFileArgs = {
  id: Scalars['String']['input'];
};


export type QueryPublicFileByLegacyIdArgs = {
  legacySystemId: Scalars['String']['input'];
};


export type QueryPublicOfferArgs = {
  id: Scalars['String']['input'];
};


export type QueryPublicOfferBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPublicOffersArgs = {
  filters?: InputMaybe<OfferFiltersInput>;
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

export type StorageStats = {
  __typename?: 'StorageStats';
  documentCount: Scalars['Int']['output'];
  documentSize: Scalars['Int']['output'];
  imageCount: Scalars['Int']['output'];
  imageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalSize: Scalars['Int']['output'];
};

export type UpdateCarRequestInput = {
  assignedAgentId?: InputMaybe<Scalars['String']['input']>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  cancellationNote?: InputMaybe<Scalars['String']['input']>;
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
  closedAt?: InputMaybe<Scalars['DateTime']['input']>;
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  confirmedAt?: InputMaybe<Scalars['DateTime']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Float']['input']>;
  feedbackAt?: InputMaybe<Scalars['DateTime']['input']>;
  financingType?: InputMaybe<Scalars['String']['input']>;
  gclid?: InputMaybe<Scalars['String']['input']>;
  isFromLegacySystem?: InputMaybe<Scalars['Boolean']['input']>;
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  nextCallAt?: InputMaybe<Scalars['DateTime']['input']>;
  noteInternal?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
  relayedAt?: InputMaybe<Scalars['DateTime']['input']>;
  requestEmail?: InputMaybe<Scalars['String']['input']>;
  requestFirstName?: InputMaybe<Scalars['String']['input']>;
  requestLastName?: InputMaybe<Scalars['String']['input']>;
  requestNewsletter?: InputMaybe<Scalars['Boolean']['input']>;
  requestPhone?: InputMaybe<Scalars['String']['input']>;
  requestPostalCode?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<Scalars['String']['input']>;
  waitingForOffer?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCatalogBrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isHighlighted?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommended?: InputMaybe<Scalars['Boolean']['input']>;
  logoId?: InputMaybe<Scalars['String']['input']>;
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
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  legacySlug?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Int']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productionStart?: InputMaybe<Scalars['DateTime']['input']>;
  productionStop?: InputMaybe<Scalars['DateTime']['input']>;
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

export type UpdateFileInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  checksum?: InputMaybe<Scalars['String']['input']>;
  extension?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  relativePath?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  thumbnailPath?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateLeasingCompanyInput = {
  link?: InputMaybe<Scalars['String']['input']>;
  logoId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOfferInput = {
  annualMileageLimit?: InputMaybe<Scalars['Int']['input']>;
  customRequirements?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  discountPercentage?: InputMaybe<Scalars['Float']['input']>;
  hasServiceIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasWinterTyresIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  includesWarranty?: InputMaybe<Scalars['Boolean']['input']>;
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  leasingDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  monthlyPayment?: InputMaybe<Scalars['Float']['input']>;
  responseDeadline?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<IndividualOfferStatus>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
  warrantyYears?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<File>;
  avatarId?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  impersonatedBy?: Maybe<Scalars['ID']['output']>;
  isActive: Scalars['Boolean']['output'];
  isImpersonating: Scalars['Boolean']['output'];
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


export type GetAllCatalogBrandsQuery = { __typename?: 'Query', allCatalogBrands: Array<{ __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, logoId?: string | null, legacySystemId?: string | null, legacySlug?: string | null, createdAt: any, updatedAt?: any | null, logo?: { __typename?: 'File', id: string, url: string, alt?: string | null } | null }> };

export type GetCatalogBrandQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCatalogBrandQuery = { __typename?: 'Query', catalogBrand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, logoId?: string | null, legacySystemId?: string | null, legacySlug?: string | null, createdAt: any, updatedAt?: any | null, logo?: { __typename?: 'File', id: string, url: string, alt?: string | null } | null } };

export type CreateCatalogBrandMutationVariables = Exact<{
  input: CreateCatalogBrandInput;
}>;


export type CreateCatalogBrandMutation = { __typename?: 'Mutation', createCatalogBrand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, logoId?: string | null, legacySystemId?: string | null, legacySlug?: string | null, createdAt: any, updatedAt?: any | null, logo?: { __typename?: 'File', id: string, url: string, alt?: string | null } | null } };

export type UpdateCatalogBrandMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogBrandInput;
}>;


export type UpdateCatalogBrandMutation = { __typename?: 'Mutation', updateCatalogBrand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, logoId?: string | null, createdAt: any, updatedAt?: any | null, logo?: { __typename?: 'File', id: string, url: string, alt?: string | null } | null } };

export type DeleteCatalogBrandMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCatalogBrandMutation = { __typename?: 'Mutation', deleteCatalogBrand: boolean };

export type CheckBrandSlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CheckBrandSlugQuery = { __typename?: 'Query', checkBrandSlugAvailability?: { __typename?: 'CatalogBrand', id: string, slug: string } | null };

export type GetAllCarRequestsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllCarRequestsQuery = { __typename?: 'Query', allCarRequests: Array<{ __typename?: 'CarRequest', id: string, isFromLegacySystem: boolean, legacySystemId?: string | null, createdAt: any, modifiedAt: any, notes?: string | null, financingType: FinancingType, requestEmail?: string | null, requestPhone?: string | null, requestFirstName?: string | null, requestLastName?: string | null, requestNewsletter?: boolean | null, requestPostalCode?: string | null, customerId?: string | null, assignedAgentId?: string | null, brandId?: string | null, modelId?: string | null, leasingCompanyId?: string | null, order?: number | null, gclid?: string | null, noteInternal?: string | null, completedAt?: any | null, nextCallAt?: any | null, confirmedAt?: any | null, relayedAt?: any | null, feedbackAt?: any | null, closedAt?: any | null, waitingForOffer?: boolean | null, displayOrder: number, cancellationReason?: CancellationReason | null, cancellationNote?: string | null, statusId?: string | null, stateId?: string | null, customer?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, assignedAgent?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null, model?: { __typename?: 'CatalogModel', id: string, name: string, slug: string } | null, leasingCompany?: { __typename?: 'LeasingCompany', id: string, name: string } | null, status?: { __typename?: 'CarRequestStatus', id: string, name: string, code: string, colorHex?: string | null, isFinal: boolean } | null, state?: { __typename?: 'CarRequestState', id: string, name: string, code: string, colorHex?: string | null } | null }> };

export type GetCarRequestQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCarRequestQuery = { __typename?: 'Query', carRequest: { __typename?: 'CarRequest', id: string, isFromLegacySystem: boolean, legacySystemId?: string | null, createdAt: any, modifiedAt: any, notes?: string | null, financingType: FinancingType, requestEmail?: string | null, requestPhone?: string | null, requestFirstName?: string | null, requestLastName?: string | null, requestNewsletter?: boolean | null, requestPostalCode?: string | null, customerId?: string | null, assignedAgentId?: string | null, brandId?: string | null, modelId?: string | null, leasingCompanyId?: string | null, order?: number | null, gclid?: string | null, noteInternal?: string | null, completedAt?: any | null, nextCallAt?: any | null, confirmedAt?: any | null, relayedAt?: any | null, feedbackAt?: any | null, closedAt?: any | null, waitingForOffer?: boolean | null, displayOrder: number, cancellationReason?: CancellationReason | null, cancellationNote?: string | null, statusId?: string | null, stateId?: string | null, customer?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, assignedAgent?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null, model?: { __typename?: 'CatalogModel', id: string, name: string, slug: string } | null, leasingCompany?: { __typename?: 'LeasingCompany', id: string, name: string } | null, status?: { __typename?: 'CarRequestStatus', id: string, name: string, code: string, colorHex?: string | null, isFinal: boolean } | null, state?: { __typename?: 'CarRequestState', id: string, name: string, code: string, colorHex?: string | null } | null } };

export type CreateCarRequestMutationVariables = Exact<{
  input: CreateCarRequestInput;
}>;


export type CreateCarRequestMutation = { __typename?: 'Mutation', createCarRequest: { __typename?: 'CarRequest', id: string, createdAt: any, modifiedAt: any } };

export type UpdateCarRequestMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCarRequestInput;
}>;


export type UpdateCarRequestMutation = { __typename?: 'Mutation', updateCarRequest: { __typename?: 'CarRequest', id: string, modifiedAt: any } };

export type DeleteCarRequestMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCarRequestMutation = { __typename?: 'Mutation', deleteCarRequest: boolean };

export type GetAllCatalogModelGenerationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAllCatalogModelGenerationsQuery = { __typename?: 'Query', catalogModelGenerations: Array<{ __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, legacySlug?: string | null, description?: string | null, productionStart?: any | null, productionStop?: any | null, wheelbase?: number | null, frontTrack?: number | null, rearTrack?: number | null, length?: number | null, width?: number | null, height?: number | null, trunkSpaceMin?: number | null, trunkSpaceMax?: number | null, bodyType?: CatalogBodyType | null, frontBrakesType?: CatalogEquipmentBrakeType | null, rearBrakesType?: CatalogEquipmentBrakeType | null, isActive: boolean, legacySystemId?: string | null, modelId: string, brandId?: string | null, createdAt: any, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null }, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null }> };

export type GetCatalogModelGenerationQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCatalogModelGenerationQuery = { __typename?: 'Query', catalogModelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, legacySlug?: string | null, description?: string | null, productionStart?: any | null, productionStop?: any | null, wheelbase?: number | null, frontTrack?: number | null, rearTrack?: number | null, length?: number | null, width?: number | null, height?: number | null, trunkSpaceMin?: number | null, trunkSpaceMax?: number | null, bodyType?: CatalogBodyType | null, frontBrakesType?: CatalogEquipmentBrakeType | null, rearBrakesType?: CatalogEquipmentBrakeType | null, isActive: boolean, legacySystemId?: string | null, modelId: string, brandId?: string | null, createdAt: any, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null }, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } };

export type CreateCatalogModelGenerationMutationVariables = Exact<{
  input: CreateCatalogModelGenerationInput;
}>;


export type CreateCatalogModelGenerationMutation = { __typename?: 'Mutation', createCatalogModelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, legacySlug?: string | null, description?: string | null, productionStart?: any | null, productionStop?: any | null, wheelbase?: number | null, frontTrack?: number | null, rearTrack?: number | null, length?: number | null, width?: number | null, height?: number | null, trunkSpaceMin?: number | null, trunkSpaceMax?: number | null, bodyType?: CatalogBodyType | null, frontBrakesType?: CatalogEquipmentBrakeType | null, rearBrakesType?: CatalogEquipmentBrakeType | null, isActive: boolean, modelId: string, brandId?: string | null, createdAt: any, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string }, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } };

export type UpdateCatalogModelGenerationMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogModelGenerationInput;
}>;


export type UpdateCatalogModelGenerationMutation = { __typename?: 'Mutation', updateCatalogModelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, legacySlug?: string | null, description?: string | null, productionStart?: any | null, productionStop?: any | null, wheelbase?: number | null, frontTrack?: number | null, rearTrack?: number | null, length?: number | null, width?: number | null, height?: number | null, trunkSpaceMin?: number | null, trunkSpaceMax?: number | null, bodyType?: CatalogBodyType | null, frontBrakesType?: CatalogEquipmentBrakeType | null, rearBrakesType?: CatalogEquipmentBrakeType | null, isActive: boolean, modelId: string, brandId?: string | null, createdAt: any, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string }, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } };

export type DeleteCatalogModelGenerationMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCatalogModelGenerationMutation = { __typename?: 'Mutation', deleteCatalogModelGeneration: boolean };

export type CheckGenerationSlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CheckGenerationSlugQuery = { __typename?: 'Query', catalogModelGenerationBySlug: { __typename?: 'CatalogModelGeneration', id: string, slug?: string | null } };

export type GetAllLeasingCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLeasingCompaniesQuery = { __typename?: 'Query', leasingCompanies: Array<{ __typename?: 'LeasingCompany', id: string, name: string, link?: string | null, logoId?: string | null, createdAt: any, updatedAt: any, logo?: { __typename?: 'File', id: string, url: string, alt?: string | null } | null }> };

export type GetLeasingCompanyQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetLeasingCompanyQuery = { __typename?: 'Query', leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, link?: string | null, logoId?: string | null, createdAt: any, updatedAt: any, logo?: { __typename?: 'File', id: string, url: string, alt?: string | null } | null } };

export type CreateLeasingCompanyMutationVariables = Exact<{
  input: CreateLeasingCompanyInput;
}>;


export type CreateLeasingCompanyMutation = { __typename?: 'Mutation', createLeasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, link?: string | null, logoId?: string | null, createdAt: any, updatedAt: any } };

export type UpdateLeasingCompanyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateLeasingCompanyInput;
}>;


export type UpdateLeasingCompanyMutation = { __typename?: 'Mutation', updateLeasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, link?: string | null, logoId?: string | null, createdAt: any, updatedAt: any, logo?: { __typename?: 'File', id: string, url: string, alt?: string | null } | null } };

export type DeleteLeasingCompanyMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteLeasingCompanyMutation = { __typename?: 'Mutation', deleteLeasingCompany: boolean };

export type CountLeasingCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountLeasingCompaniesQuery = { __typename?: 'Query', leasingCompaniesCount: number };

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

export type GetCatalogModelsByBrandQueryVariables = Exact<{
  brandId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetCatalogModelsByBrandQuery = { __typename?: 'Query', allCatalogModels: Array<{ __typename?: 'CatalogModel', id: string, name: string, slug: string, brandId: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null }> };

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

export type GenerateUploadUrlMutationVariables = Exact<{
  filename: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
}>;


export type GenerateUploadUrlMutation = { __typename?: 'Mutation', generateUploadUrl: string };

export type CreateFileMutationVariables = Exact<{
  input: CreateFileInput;
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: { __typename?: 'File', id: string, relativePath: string, url: string, name: string, extension: string, size: number, mimeType: string, checksum: string, width?: number | null, height?: number | null, alt?: string | null, title?: string | null, thumbnailPath?: string | null, isImage: boolean, createdAt: any, updatedAt: any } };

export type DeleteFileMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteFile: boolean };

export type DeleteFileCompletelyMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteFileCompletelyMutation = { __typename?: 'Mutation', deleteFileCompletely: boolean };

export type GetFileByChecksumQueryVariables = Exact<{
  checksum: Scalars['String']['input'];
}>;


export type GetFileByChecksumQuery = { __typename?: 'Query', fileByChecksum?: { __typename?: 'File', id: string, url: string, relativePath: string, name: string, extension: string, size: number, mimeType: string, checksum: string, width?: number | null, height?: number | null, isImage: boolean } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ImpersonateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImpersonateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImpersonateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impersonateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"impersonatedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<ImpersonateUserMutation, ImpersonateUserMutationVariables>;
export const StopImpersonationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StopImpersonation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopImpersonation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<StopImpersonationMutation, StopImpersonationMutationVariables>;
export const GetAllCatalogBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCatalogBrands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCatalogBrands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCatalogBrandsQuery, GetAllCatalogBrandsQueryVariables>;
export const GetCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogBrandQuery, GetCatalogBrandQueryVariables>;
export const CreateCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogBrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCatalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCatalogBrandMutation, CreateCatalogBrandMutationVariables>;
export const UpdateCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogBrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCatalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCatalogBrandMutation, UpdateCatalogBrandMutationVariables>;
export const DeleteCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCatalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCatalogBrandMutation, DeleteCatalogBrandMutationVariables>;
export const CheckBrandSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckBrandSlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkBrandSlugAvailability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CheckBrandSlugQuery, CheckBrandSlugQueryVariables>;
export const GetAllCarRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCarRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCarRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFromLegacySystem"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"financingType"}},{"kind":"Field","name":{"kind":"Name","value":"requestEmail"}},{"kind":"Field","name":{"kind":"Name","value":"requestPhone"}},{"kind":"Field","name":{"kind":"Name","value":"requestFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"requestLastName"}},{"kind":"Field","name":{"kind":"Name","value":"requestNewsletter"}},{"kind":"Field","name":{"kind":"Name","value":"requestPostalCode"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAgent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompanyId"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"gclid"}},{"kind":"Field","name":{"kind":"Name","value":"noteInternal"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextCallAt"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}},{"kind":"Field","name":{"kind":"Name","value":"relayedAt"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"waitingForOffer"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationReason"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationNote"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"isFinal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stateId"}}]}}]}}]} as unknown as DocumentNode<GetAllCarRequestsQuery, GetAllCarRequestsQueryVariables>;
export const GetCarRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCarRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFromLegacySystem"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"financingType"}},{"kind":"Field","name":{"kind":"Name","value":"requestEmail"}},{"kind":"Field","name":{"kind":"Name","value":"requestPhone"}},{"kind":"Field","name":{"kind":"Name","value":"requestFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"requestLastName"}},{"kind":"Field","name":{"kind":"Name","value":"requestNewsletter"}},{"kind":"Field","name":{"kind":"Name","value":"requestPostalCode"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAgent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompanyId"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"gclid"}},{"kind":"Field","name":{"kind":"Name","value":"noteInternal"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextCallAt"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}},{"kind":"Field","name":{"kind":"Name","value":"relayedAt"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"waitingForOffer"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationReason"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationNote"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"isFinal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stateId"}}]}}]}}]} as unknown as DocumentNode<GetCarRequestQuery, GetCarRequestQueryVariables>;
export const CreateCarRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCarRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCarRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCarRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCarRequestMutation, CreateCarRequestMutationVariables>;
export const UpdateCarRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCarRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCarRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCarRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCarRequestMutation, UpdateCarRequestMutationVariables>;
export const DeleteCarRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCarRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCarRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCarRequestMutation, DeleteCarRequestMutationVariables>;
export const GetAllCatalogModelGenerationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCatalogModelGenerations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModelGenerations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"modelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"wheelbase"}},{"kind":"Field","name":{"kind":"Name","value":"frontTrack"}},{"kind":"Field","name":{"kind":"Name","value":"rearTrack"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMin"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMax"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"frontBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"rearBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCatalogModelGenerationsQuery, GetAllCatalogModelGenerationsQueryVariables>;
export const GetCatalogModelGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogModelGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModelGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"wheelbase"}},{"kind":"Field","name":{"kind":"Name","value":"frontTrack"}},{"kind":"Field","name":{"kind":"Name","value":"rearTrack"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMin"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMax"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"frontBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"rearBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogModelGenerationQuery, GetCatalogModelGenerationQueryVariables>;
export const CreateCatalogModelGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCatalogModelGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogModelGenerationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCatalogModelGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"wheelbase"}},{"kind":"Field","name":{"kind":"Name","value":"frontTrack"}},{"kind":"Field","name":{"kind":"Name","value":"rearTrack"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMin"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMax"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"frontBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"rearBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateCatalogModelGenerationMutation, CreateCatalogModelGenerationMutationVariables>;
export const UpdateCatalogModelGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCatalogModelGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogModelGenerationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCatalogModelGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"wheelbase"}},{"kind":"Field","name":{"kind":"Name","value":"frontTrack"}},{"kind":"Field","name":{"kind":"Name","value":"rearTrack"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMin"}},{"kind":"Field","name":{"kind":"Name","value":"trunkSpaceMax"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"frontBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"rearBrakesType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCatalogModelGenerationMutation, UpdateCatalogModelGenerationMutationVariables>;
export const DeleteCatalogModelGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCatalogModelGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCatalogModelGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCatalogModelGenerationMutation, DeleteCatalogModelGenerationMutationVariables>;
export const CheckGenerationSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckGenerationSlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModelGenerationBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CheckGenerationSlugQuery, CheckGenerationSlugQueryVariables>;
export const GetAllLeasingCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllLeasingCompanies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leasingCompanies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllLeasingCompaniesQuery, GetAllLeasingCompaniesQueryVariables>;
export const GetLeasingCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeasingCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetLeasingCompanyQuery, GetLeasingCompanyQueryVariables>;
export const CreateLeasingCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLeasingCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLeasingCompanyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLeasingCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateLeasingCompanyMutation, CreateLeasingCompanyMutationVariables>;
export const UpdateLeasingCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLeasingCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLeasingCompanyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLeasingCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateLeasingCompanyMutation, UpdateLeasingCompanyMutationVariables>;
export const DeleteLeasingCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLeasingCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLeasingCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteLeasingCompanyMutation, DeleteLeasingCompanyMutationVariables>;
export const CountLeasingCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountLeasingCompanies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leasingCompaniesCount"}}]}}]} as unknown as DocumentNode<CountLeasingCompaniesQuery, CountLeasingCompaniesQueryVariables>;
export const GetAllCatalogModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCatalogModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCatalogModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCatalogModelsQuery, GetAllCatalogModelsQueryVariables>;
export const GetCatalogModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogModelQuery, GetCatalogModelQueryVariables>;
export const CreateCatalogModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCatalogModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCatalogModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCatalogModelMutation, CreateCatalogModelMutationVariables>;
export const UpdateCatalogModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCatalogModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCatalogModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCatalogModelMutation, UpdateCatalogModelMutationVariables>;
export const DeleteCatalogModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCatalogModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCatalogModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCatalogModelMutation, DeleteCatalogModelMutationVariables>;
export const GetCatalogModelsByBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogModelsByBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCatalogModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<GetCatalogModelsByBrandQuery, GetCatalogModelsByBrandQueryVariables>;
export const CheckModelSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckModelSlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogModelBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CheckModelSlugQuery, CheckModelSlugQueryVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const SoftDeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SoftDeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"softDeleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const RefreshTokenInternalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokenInternal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenInternalMutation, RefreshTokenInternalMutationVariables>;
export const GenerateUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateUploadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filename"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filename"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filename"}}},{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}]}]}}]} as unknown as DocumentNode<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>;
export const CreateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"relativePath"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"checksum"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailPath"}},{"kind":"Field","name":{"kind":"Name","value":"isImage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateFileMutation, CreateFileMutationVariables>;
export const DeleteFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFileMutation, DeleteFileMutationVariables>;
export const DeleteFileCompletelyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFileCompletely"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFileCompletely"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFileCompletelyMutation, DeleteFileCompletelyMutationVariables>;
export const GetFileByChecksumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFileByChecksum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checksum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileByChecksum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"checksum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checksum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"relativePath"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"checksum"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"isImage"}}]}}]}}]} as unknown as DocumentNode<GetFileByChecksumQuery, GetFileByChecksumQueryVariables>;