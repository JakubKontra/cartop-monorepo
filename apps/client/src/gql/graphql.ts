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

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
};

export type PasswordResetRequestResponse = {
  __typename?: 'PasswordResetRequestResponse';
  success: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type PasswordResetResponse = {
  __typename?: 'PasswordResetResponse';
  success: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add a feature to a calculation (admin only) */
  addFeatureToCalculation: OfferCalculationFeature;
  /** Create a calculation for individual offer (admin only) */
  createCalculation: OfferCalculation;
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
  requestPasswordReset: PasswordResetRequestResponse;
  resetPassword: PasswordResetResponse;
  softDeleteUser: User;
  stopImpersonation: AuthResponse;
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


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
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
  allCatalogBrands: Array<CatalogBrand>;
  allCatalogModels: Array<CatalogModel>;
  /** Get all offers including individual offers (admin only) */
  allOffers: Array<Offer>;
  auditLogs: Array<AuditLog>;
  /** Get all calculations for an individual offer (admin only) */
  calculationsByOffer: Array<OfferCalculation>;
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

export type GetCatalogBrandsQueryVariables = Exact<{
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetCatalogBrandsQuery = { __typename?: 'Query', catalogBrands: Array<{ __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, createdAt: any, updatedAt?: any | null }> };

export type GetHighlightedBrandsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetHighlightedBrandsQuery = { __typename?: 'Query', highlightedCatalogBrands: Array<{ __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isHighlighted: boolean, logo?: { __typename?: 'File', id: string, url: string, alt?: string | null, width?: number | null, height?: number | null } | null }> };

export type GetBrandBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetBrandBySlugQuery = { __typename?: 'Query', catalogBrandBySlug: { __typename?: 'CatalogBrand', id: string, name: string, slug: string, description?: string | null, isActive: boolean, isHighlighted: boolean, isRecommended: boolean, createdAt: any, updatedAt?: any | null } };


export const GetCatalogBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogBrands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activeOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogBrands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"activeOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activeOnly"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogBrandsQuery, GetCatalogBrandsQueryVariables>;
export const GetHighlightedBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHighlightedBrands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"highlightedCatalogBrands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]} as unknown as DocumentNode<GetHighlightedBrandsQuery, GetHighlightedBrandsQueryVariables>;
export const GetBrandBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBrandBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogBrandBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetBrandBySlugQuery, GetBrandBySlugQueryVariables>;