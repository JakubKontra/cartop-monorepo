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

export type AddOfferQuoteInput = {
  adminFee?: InputMaybe<Scalars['Float']['input']>;
  calculationId: Scalars['String']['input'];
  downPayment?: InputMaybe<Scalars['Float']['input']>;
  includesAssistance?: InputMaybe<Scalars['Boolean']['input']>;
  includesGap?: InputMaybe<Scalars['Boolean']['input']>;
  includesService?: InputMaybe<Scalars['Boolean']['input']>;
  includesWinterTires?: InputMaybe<Scalars['Boolean']['input']>;
  interestRate?: InputMaybe<Scalars['Float']['input']>;
  leasingCompanyId: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  monthlyPayment?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  termsAndConditions?: InputMaybe<Scalars['String']['input']>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
  validUntil?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AgentPerformance = {
  __typename?: 'AgentPerformance';
  agentId: Scalars['String']['output'];
  agentName: Scalars['String']['output'];
  averageProcessingDays?: Maybe<Scalars['Float']['output']>;
  carRequestsCount: Scalars['Int']['output'];
  conversionRate?: Maybe<Scalars['Float']['output']>;
  vehiclesCount: Scalars['Int']['output'];
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

export type BrandStats = {
  __typename?: 'BrandStats';
  brandId: Scalars['String']['output'];
  brandName: Scalars['String']['output'];
  calculationsCount: Scalars['Int']['output'];
  percentage: Scalars['Float']['output'];
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
  calculations?: Maybe<Array<CarRequestCalculation>>;
  cancellationNote?: Maybe<Scalars['String']['output']>;
  cancellationReason?: Maybe<CancellationReason>;
  carDelivered?: Maybe<Scalars['Boolean']['output']>;
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<User>;
  customerId?: Maybe<Scalars['String']['output']>;
  deliveryExpectedAt?: Maybe<Scalars['DateTime']['output']>;
  displayOrder: Scalars['Int']['output'];
  feedbackAt?: Maybe<Scalars['DateTime']['output']>;
  financingType: FinancingType;
  gclid?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isFromLegacySystem: Scalars['Boolean']['output'];
  leasingCompany?: Maybe<LeasingCompany>;
  leasingCompanyId?: Maybe<Scalars['String']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  logs?: Maybe<Array<CarRequestLog>>;
  model?: Maybe<CatalogModel>;
  modelId?: Maybe<Scalars['String']['output']>;
  modifiedAt: Scalars['DateTime']['output'];
  nextCallAt?: Maybe<Scalars['DateTime']['output']>;
  noteInternal?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  offersSentAt?: Maybe<Scalars['DateTime']['output']>;
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

export type CarRequestCalculation = {
  __typename?: 'CarRequestCalculation';
  annualMileageKm: Scalars['Int']['output'];
  assignedTo?: Maybe<User>;
  assignedToId?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<CatalogBrand>;
  brandId?: Maybe<Scalars['String']['output']>;
  carRequest: CarRequest;
  carRequestId: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deliveryExpectedAt?: Maybe<Scalars['DateTime']['output']>;
  durationMonths: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  internalNotes?: Maybe<Scalars['String']['output']>;
  items: Array<CarRequestCalculationItem>;
  leasingCompany?: Maybe<LeasingCompany>;
  leasingCompanyId?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  model?: Maybe<CatalogModel>;
  modelGeneration?: Maybe<CatalogModelGeneration>;
  modelGenerationId?: Maybe<Scalars['String']['output']>;
  modelId?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  offers: Array<CarRequestCalculationOffer>;
  requestedBy: User;
  requestedById: Scalars['String']['output'];
  status: CarRequestCalculationStatus;
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type CarRequestCalculationItem = {
  __typename?: 'CarRequestCalculationItem';
  calculation: CarRequestCalculation;
  calculationId: Scalars['String']['output'];
  catalogColor?: Maybe<CatalogColor>;
  catalogColorId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isIncluded: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  itemType: CarRequestCalculationItemType;
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  priceImpact?: Maybe<Scalars['Float']['output']>;
};

/** Type of configuration item */
export enum CarRequestCalculationItemType {
  /** Additional accessory or option */
  Accessory = 'ACCESSORY',
  /** Exterior paint color */
  ExteriorColor = 'EXTERIOR_COLOR',
  /** Interior color/material */
  InteriorColor = 'INTERIOR_COLOR',
  /** Other configuration item */
  Other = 'OTHER',
  /** Equipment package */
  Package = 'PACKAGE',
  /** Service package (maintenance, insurance, etc.) */
  Service = 'SERVICE'
}

export type CarRequestCalculationOffer = {
  __typename?: 'CarRequestCalculationOffer';
  adminFee?: Maybe<Scalars['Float']['output']>;
  calculation: CarRequestCalculation;
  calculationId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  downPayment?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  includesAssistance?: Maybe<Scalars['Boolean']['output']>;
  includesGap?: Maybe<Scalars['Boolean']['output']>;
  includesService?: Maybe<Scalars['Boolean']['output']>;
  includesWinterTires?: Maybe<Scalars['Boolean']['output']>;
  interestRate?: Maybe<Scalars['Float']['output']>;
  leasingCompany: LeasingCompany;
  leasingCompanyId: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  quotedAt?: Maybe<Scalars['DateTime']['output']>;
  quotedBy?: Maybe<User>;
  quotedById?: Maybe<Scalars['String']['output']>;
  status: CarRequestCalculationOfferStatus;
  termsAndConditions?: Maybe<Scalars['String']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  validUntil?: Maybe<Scalars['DateTime']['output']>;
};

/** Status of individual offer from leasing company */
export enum CarRequestCalculationOfferStatus {
  /** Quote was accepted by customer */
  Accepted = 'ACCEPTED',
  /** Waiting for quote from leasing company */
  Pending = 'PENDING',
  /** Leasing company provided a quote */
  Quoted = 'QUOTED',
  /** Quote was rejected */
  Rejected = 'REJECTED'
}

/** Status workflow for calculation requests */
export enum CarRequestCalculationStatus {
  /** Calculation was cancelled */
  Cancelled = 'CANCELLED',
  /** Calculation completed with quotes */
  Completed = 'COMPLETED',
  /** Draft calculation, not yet submitted */
  Draft = 'DRAFT',
  /** Calculation is being processed by back office */
  InProgress = 'IN_PROGRESS',
  /** Calculation was rejected */
  Rejected = 'REJECTED',
  /** Calculation submitted and waiting for processing */
  Submitted = 'SUBMITTED'
}

export type CarRequestLog = {
  __typename?: 'CarRequestLog';
  actionType: CarRequestLogAction;
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['ID']['output']>;
  carRequest: CarRequest;
  carRequestId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
};

/** The type of action performed on a car request */
export enum CarRequestLogAction {
  Assigned = 'ASSIGNED',
  CallbackScheduled = 'CALLBACK_SCHEDULED',
  CallLogged = 'CALL_LOGGED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Custom = 'CUSTOM',
  EmailSent = 'EMAIL_SENT',
  MarkedPurchased = 'MARKED_PURCHASED',
  MarkedVip = 'MARKED_VIP',
  MessageSent = 'MESSAGE_SENT',
  NoteAdded = 'NOTE_ADDED',
  OfferSent = 'OFFER_SENT',
  PassedToDealer = 'PASSED_TO_DEALER',
  StateChanged = 'STATE_CHANGED',
  StatusChanged = 'STATUS_CHANGED',
  WaitingForOffer = 'WAITING_FOR_OFFER'
}

export type CarRequestLogFilterInput = {
  actionTypes?: InputMaybe<Array<CarRequestLogAction>>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  carRequestId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
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
  equipments?: Maybe<Array<CatalogBrandEquipment>>;
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

export type CatalogBrandEquipment = {
  __typename?: 'CatalogBrandEquipment';
  assignedItems?: Maybe<Array<CatalogBrandEquipmentItem>>;
  brand: CatalogBrand;
  brandId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CatalogBrandEquipmentItem = {
  __typename?: 'CatalogBrandEquipmentItem';
  createdAt: Scalars['DateTime']['output'];
  equipments?: Maybe<Array<CatalogBrandEquipment>>;
  id: Scalars['ID']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CatalogColor = {
  __typename?: 'CatalogColor';
  /** Hex color code (e.g., #FFFFFF) */
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  generationColors?: Maybe<Array<CatalogModelGenerationColor>>;
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

export type CatalogEngine = {
  __typename?: 'CatalogEngine';
  /** Acceleration 0-100 km/h in seconds */
  acceleration?: Maybe<Scalars['Float']['output']>;
  active: Scalars['Boolean']['output'];
  /** City fuel consumption (l/100km) */
  consumptionCity?: Maybe<Scalars['Float']['output']>;
  /** Combined fuel consumption (l/100km) */
  consumptionCombined?: Maybe<Scalars['Float']['output']>;
  /** Highway fuel consumption (l/100km) */
  consumptionOutOfCity?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Number of cylinders */
  cylinderCount?: Maybe<Scalars['Int']['output']>;
  driveType?: Maybe<CatalogEngineDriveType>;
  /** CO2 emissions in g/km */
  emission?: Maybe<Scalars['Int']['output']>;
  /** Fuel tank volume in liters */
  fuelTankVolume?: Maybe<Scalars['Int']['output']>;
  fuelType?: Maybe<CatalogEngineFuelType>;
  /** Number of gears */
  gearsCount?: Maybe<Scalars['Int']['output']>;
  generation: CatalogModelGeneration;
  generationId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  /** Maximum speed in km/h */
  maxSpeed?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  /** Power in kW */
  performance?: Maybe<Scalars['Int']['output']>;
  productionStart?: Maybe<Scalars['DateTime']['output']>;
  productionStop?: Maybe<Scalars['DateTime']['output']>;
  /** Range in km (for electric vehicles) */
  rangeKm?: Maybe<Scalars['Int']['output']>;
  recommended: Scalars['Boolean']['output'];
  /** Torque in Nm */
  torque?: Maybe<Scalars['Int']['output']>;
  transmissionType?: Maybe<CatalogEngineTransmissionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Engine volume in cm³ */
  volume?: Maybe<Scalars['Int']['output']>;
  /** Weight in kg */
  weight?: Maybe<Scalars['Int']['output']>;
};

/** Type of drive system used by vehicle */
export enum CatalogEngineDriveType {
  Awd = 'AWD',
  FourWd = 'FOUR_WD',
  Fwd = 'FWD',
  Rwd = 'RWD'
}

/** Type of fuel used by vehicle engine */
export enum CatalogEngineFuelType {
  Diesel = 'DIESEL',
  Electric = 'ELECTRIC',
  EthanolE85 = 'ETHANOL_E85',
  Gasoline = 'GASOLINE',
  Hybrid = 'HYBRID',
  Hydrogen = 'HYDROGEN',
  TwoStroke = 'TWO_STROKE'
}

/** Type of transmission used by vehicle engine */
export enum CatalogEngineTransmissionType {
  Automatic = 'AUTOMATIC',
  Cvt = 'CVT',
  Manual = 'MANUAL',
  SemiAutomatic = 'SEMI_AUTOMATIC'
}

export type CatalogEquipment = {
  __typename?: 'CatalogEquipment';
  active?: Maybe<Scalars['Boolean']['output']>;
  availablePackets?: Maybe<Array<CatalogEquipmentPacket>>;
  category?: Maybe<CatalogEquipmentItemCategory>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  includedPackets?: Maybe<Array<CatalogEquipmentPacket>>;
  items?: Maybe<Array<CatalogEquipmentItem>>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  modelGeneration?: Maybe<CatalogModelGeneration>;
  modelGenerationId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  packets?: Maybe<Array<CatalogEquipmentPacket>>;
  paidItems?: Maybe<Array<CatalogEquipmentPaidItem>>;
  standard: Scalars['Boolean']['output'];
};

/** Type of braking system used in vehicles */
export enum CatalogEquipmentBrakeType {
  Disc = 'DISC',
  Drum = 'DRUM',
  VentilatedDisc = 'VENTILATED_DISC'
}

export type CatalogEquipmentItem = {
  __typename?: 'CatalogEquipmentItem';
  category?: Maybe<CatalogEquipmentItemCategory>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  equipments?: Maybe<Array<CatalogEquipment>>;
  id: Scalars['ID']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  packets?: Maybe<Array<CatalogEquipmentPacket>>;
  paidItemPrices?: Maybe<Array<CatalogEquipmentPaidItem>>;
};

export type CatalogEquipmentItemCategory = {
  __typename?: 'CatalogEquipmentItemCategory';
  createdAt: Scalars['DateTime']['output'];
  equipmentItems?: Maybe<Array<CatalogEquipment>>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<CatalogEquipmentItem>>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type CatalogEquipmentPacket = {
  __typename?: 'CatalogEquipmentPacket';
  availableInEquipments?: Maybe<Array<CatalogEquipment>>;
  createdAt: Scalars['DateTime']['output'];
  equipment?: Maybe<CatalogEquipment>;
  equipmentId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  includedInEquipments?: Maybe<Array<CatalogEquipment>>;
  items?: Maybe<Array<CatalogEquipmentItem>>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** Price in cents */
  price: Scalars['Int']['output'];
};

export type CatalogEquipmentPaidItem = {
  __typename?: 'CatalogEquipmentPaidItem';
  createdAt: Scalars['DateTime']['output'];
  equipment?: Maybe<CatalogEquipment>;
  equipmentId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  item?: Maybe<CatalogEquipmentItem>;
  itemId?: Maybe<Scalars['String']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  /** Price in cents */
  price: Scalars['Int']['output'];
};

/** Type/purpose of a catalog image */
export enum CatalogImageType {
  Detail = 'DETAIL',
  Exterior = 'EXTERIOR',
  Gallery_360 = 'GALLERY_360',
  Hero = 'HERO',
  Interior = 'INTERIOR',
  Thumbnail = 'THUMBNAIL'
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
  colors?: Maybe<Array<CatalogModelGenerationColor>>;
  configurations?: Maybe<Array<CatalogModelGenerationConfiguration>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  engines?: Maybe<Array<CatalogEngine>>;
  frontBrakesType?: Maybe<CatalogEquipmentBrakeType>;
  /** Front track in mm */
  frontTrack?: Maybe<Scalars['Int']['output']>;
  /** Height in mm */
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<CatalogModelGenerationImage>>;
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

export type CatalogModelGenerationColor = {
  __typename?: 'CatalogModelGenerationColor';
  color: CatalogColor;
  colorId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  generation: CatalogModelGeneration;
  generationId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  /** Price in cents */
  price: Scalars['Int']['output'];
};

export type CatalogModelGenerationConfiguration = {
  __typename?: 'CatalogModelGenerationConfiguration';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  engine?: Maybe<CatalogEngine>;
  engineId?: Maybe<Scalars['String']['output']>;
  equipment?: Maybe<CatalogEquipment>;
  equipmentId?: Maybe<Scalars['String']['output']>;
  generation: CatalogModelGeneration;
  generationId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  legacySystemId?: Maybe<Scalars['String']['output']>;
  /** Price from (base price) */
  priceFrom: Scalars['Float']['output'];
};

export type CatalogModelGenerationImage = {
  __typename?: 'CatalogModelGenerationImage';
  active: Scalars['Boolean']['output'];
  /** Description/alt text for SEO */
  description?: Maybe<Scalars['String']['output']>;
  /** Exterior color for this image */
  exteriorColor?: Maybe<CatalogColor>;
  exteriorColorId?: Maybe<Scalars['String']['output']>;
  /** 360 gallery frame position (0-35 for 36 frames) */
  galleryPosition?: Maybe<Scalars['Int']['output']>;
  generation: CatalogModelGeneration;
  generationId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: File;
  imageId: Scalars['String']['output'];
  /** Type/purpose of this image */
  imageType: CatalogImageType;
  /** Interior color for this image */
  interiorColor?: Maybe<CatalogColor>;
  interiorColorId?: Maybe<Scalars['String']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  /** Display order */
  order: Scalars['Int']['output'];
};

export type CreateCalculationInput = {
  annualMileageKm: Scalars['Int']['input'];
  brandId?: InputMaybe<Scalars['String']['input']>;
  carRequestId: Scalars['String']['input'];
  deliveryExpectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  durationMonths: Scalars['Int']['input'];
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<CreateCalculationItemInput>>;
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  modelGenerationId?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCalculationItemInput = {
  catalogColorId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  isIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  itemType: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  priceImpact?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateCarRequestInput = {
  assignedAgentId?: InputMaybe<Scalars['String']['input']>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  cancellationNote?: InputMaybe<Scalars['String']['input']>;
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  financingType: Scalars['String']['input'];
  gclid?: InputMaybe<Scalars['String']['input']>;
  isFromLegacySystem?: InputMaybe<Scalars['Boolean']['input']>;
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  noteInternal?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
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

export type CreateCarRequestLogInput = {
  actionType: CarRequestLogAction;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  carRequestId: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
};

export type CreateCatalogBrandEquipmentInput = {
  brandId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCatalogBrandEquipmentItemInput = {
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
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

export type CreateCatalogEngineInput = {
  acceleration?: InputMaybe<Scalars['Float']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  consumptionCity?: InputMaybe<Scalars['Float']['input']>;
  consumptionCombined?: InputMaybe<Scalars['Float']['input']>;
  consumptionOutOfCity?: InputMaybe<Scalars['Float']['input']>;
  cylinderCount?: InputMaybe<Scalars['Int']['input']>;
  driveType?: InputMaybe<CatalogEngineDriveType>;
  emission?: InputMaybe<Scalars['Int']['input']>;
  fuelTankVolume?: InputMaybe<Scalars['Int']['input']>;
  fuelType?: InputMaybe<CatalogEngineFuelType>;
  gearsCount?: InputMaybe<Scalars['Int']['input']>;
  generationId: Scalars['String']['input'];
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  maxSpeed?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  performance?: InputMaybe<Scalars['Int']['input']>;
  productionStart?: InputMaybe<Scalars['DateTime']['input']>;
  productionStop?: InputMaybe<Scalars['DateTime']['input']>;
  rangeKm?: InputMaybe<Scalars['Int']['input']>;
  recommended?: InputMaybe<Scalars['Boolean']['input']>;
  torque?: InputMaybe<Scalars['Int']['input']>;
  transmissionType?: InputMaybe<CatalogEngineTransmissionType>;
  volume?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCatalogEquipmentInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  customText?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  modelGenerationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  standard?: Scalars['Boolean']['input'];
};

export type CreateCatalogEquipmentItemCategoryInput = {
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCatalogEquipmentItemInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCatalogEquipmentPacketInput = {
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** Price in cents */
  price: Scalars['Int']['input'];
};

export type CreateCatalogEquipmentPaidItemInput = {
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  /** Price in cents */
  price: Scalars['Int']['input'];
};

export type CreateCatalogModelGenerationColorInput = {
  colorId: Scalars['String']['input'];
  generationId: Scalars['String']['input'];
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  /** Price in cents */
  price: Scalars['Int']['input'];
};

export type CreateCatalogModelGenerationConfigurationInput = {
  active: Scalars['Boolean']['input'];
  engineId?: InputMaybe<Scalars['String']['input']>;
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  generationId: Scalars['String']['input'];
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  /** Price from (base price) */
  priceFrom: Scalars['Float']['input'];
};

export type CreateCatalogModelGenerationImageInput = {
  active?: Scalars['Boolean']['input'];
  /** Description/alt text for SEO */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Exterior color ID for this image */
  exteriorColorId?: InputMaybe<Scalars['String']['input']>;
  /** 360 gallery frame position (0-35) */
  galleryPosition?: InputMaybe<Scalars['Int']['input']>;
  generationId: Scalars['String']['input'];
  imageId: Scalars['String']['input'];
  /** Type/purpose of this image */
  imageType?: CatalogImageType;
  /** Interior color ID for this image */
  interiorColorId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  /** Display order */
  order?: Scalars['Int']['input'];
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

export type CreateDocumentTemplateInput = {
  acceptedFormats: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  fieldName: Scalars['String']['input'];
  helpText?: InputMaybe<Scalars['String']['input']>;
  isRequired: Scalars['Boolean']['input'];
  leasingCompanyId: Scalars['String']['input'];
  maxSizeBytes: Scalars['Int']['input'];
  name: Scalars['String']['input'];
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

export type CreateOfferAdditionalEquipmentItemInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateOfferColorVariantInput = {
  colorName?: InputMaybe<Scalars['String']['input']>;
  exteriorColorId: Scalars['String']['input'];
  galleryId?: InputMaybe<Scalars['String']['input']>;
  interiorColorId?: InputMaybe<Scalars['String']['input']>;
  isDefault?: Scalars['Boolean']['input'];
  offerId: Scalars['String']['input'];
};

export type CreateOfferLeasingVariantInput = {
  annualMileageLimit: Scalars['Int']['input'];
  currency?: Scalars['String']['input'];
  downPayment?: InputMaybe<Scalars['Int']['input']>;
  freeMileageLimit?: InputMaybe<Scalars['Int']['input']>;
  hasAssistanceServiceIncluded?: Scalars['Boolean']['input'];
  hasGapIncluded?: Scalars['Boolean']['input'];
  hasGlassInsuranceIncluded?: Scalars['Boolean']['input'];
  hasHighwayIncluded?: Scalars['Boolean']['input'];
  hasServiceIncluded?: Scalars['Boolean']['input'];
  hasWinterTyresIncluded?: Scalars['Boolean']['input'];
  isActive?: Scalars['Boolean']['input'];
  isBestOffer?: Scalars['Boolean']['input'];
  isDefault?: Scalars['Boolean']['input'];
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
  leasingDurationMonths: Scalars['Int']['input'];
  offerId: Scalars['String']['input'];
  originalPriceWithVat?: InputMaybe<Scalars['Int']['input']>;
  originalPriceWithoutVat?: InputMaybe<Scalars['Int']['input']>;
  pricePeriod?: PricePeriod;
  priceWithVat: Scalars['Int']['input'];
  priceWithoutVat: Scalars['Int']['input'];
  securityDeposit?: InputMaybe<Scalars['Int']['input']>;
  setupFee?: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
  validFrom?: InputMaybe<Scalars['String']['input']>;
  validTo?: InputMaybe<Scalars['String']['input']>;
  vatRate?: Scalars['Float']['input'];
  wearTolerancePercent?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateOfferOptionalEquipmentInput = {
  additionalPrice?: InputMaybe<Scalars['Int']['input']>;
  currency?: Scalars['String']['input'];
  equipmentItemId: Scalars['String']['input'];
  isAvailable?: Scalars['Boolean']['input'];
  isDefaultSelected?: Scalars['Boolean']['input'];
  offerId: Scalars['String']['input'];
  pricePeriod?: PricePeriod;
};

export type CreateOperationalLeasingOfferInput = {
  annualMileageLimit: Scalars['Int']['input'];
  brandId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  disableCustomGallery?: InputMaybe<Scalars['Boolean']['input']>;
  downPaymentLeasing?: InputMaybe<Scalars['Float']['input']>;
  engineId: Scalars['String']['input'];
  fileId?: InputMaybe<Scalars['String']['input']>;
  hasAssistanceServiceIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasGapIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasServiceIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasWinterTyresIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  isPromoted?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommendedForActionPage?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommendedForBrand?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommendedForModel?: InputMaybe<Scalars['Boolean']['input']>;
  leasingDurationMonths: Scalars['Int']['input'];
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  modelGenerationId: Scalars['String']['input'];
  modelId?: InputMaybe<Scalars['String']['input']>;
  monthlyPayment: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  publicId?: InputMaybe<Scalars['String']['input']>;
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

export type DashboardOverviewStats = {
  __typename?: 'DashboardOverviewStats';
  activeCarRequests: Scalars['Int']['output'];
  activeCarRequestsChange: Scalars['Float']['output'];
  awaitingAction: Scalars['Int']['output'];
  completedOnboardingsThisMonth: Scalars['Int']['output'];
  totalVehicles: Scalars['Int']['output'];
  totalVehiclesChange: Scalars['Float']['output'];
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  agentPerformance: Array<AgentPerformance>;
  funnel: VehicleFunnelStats;
  leasingCompanies: Array<LeasingCompanyStats>;
  overview: DashboardOverviewStats;
  timeline: Array<TimelineDataPoint>;
  topBrands: Array<BrandStats>;
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
  disableCustomGallery?: Maybe<Scalars['Boolean']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  downPaymentLeasing?: Maybe<Scalars['Float']['output']>;
  engine?: Maybe<CatalogEngine>;
  engineId?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  financingAvailable?: Maybe<Scalars['Boolean']['output']>;
  hasAssistanceServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasGapIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasWinterTyresIncluded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  includesWarranty?: Maybe<Scalars['Boolean']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isPrivate: Scalars['Boolean']['output'];
  isPromoted: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  isRecommendedForActionPage: Scalars['Boolean']['output'];
  isRecommendedForBrand: Scalars['Boolean']['output'];
  isRecommendedForModel: Scalars['Boolean']['output'];
  leasingDurationMonths?: Maybe<Scalars['Int']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  model?: Maybe<CatalogModel>;
  modelGeneration: CatalogModelGeneration;
  modelGenerationId: Scalars['String']['output'];
  modelId?: Maybe<Scalars['String']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  publicId?: Maybe<Scalars['String']['output']>;
  responseDeadline?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<IndividualOfferStatus>;
  totalPrice: Scalars['Float']['output'];
  type: OfferType;
  updatedAt: Scalars['DateTime']['output'];
  warrantyYears?: Maybe<Scalars['Int']['output']>;
};

export type DocumentTemplate = {
  __typename?: 'DocumentTemplate';
  acceptedFormats: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  fieldName: Scalars['String']['output'];
  helpText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isGlobal: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  leasingCompany?: Maybe<LeasingCompany>;
  leasingCompanyId?: Maybe<Scalars['String']['output']>;
  maxSizeBytes: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Validation status of an uploaded document */
export enum DocumentValidationStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type File = {
  __typename?: 'File';
  alt?: Maybe<Scalars['String']['output']>;
  checksum: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  extension: Scalars['String']['output'];
  generationImages?: Maybe<Array<CatalogModelGenerationImage>>;
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
  disableCustomGallery?: Maybe<Scalars['Boolean']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  downPaymentLeasing?: Maybe<Scalars['Float']['output']>;
  engine?: Maybe<CatalogEngine>;
  engineId?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  financingAvailable?: Maybe<Scalars['Boolean']['output']>;
  hasAssistanceServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasGapIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasWinterTyresIncluded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  includesWarranty?: Maybe<Scalars['Boolean']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isPrivate: Scalars['Boolean']['output'];
  isPromoted: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  isRecommendedForActionPage: Scalars['Boolean']['output'];
  isRecommendedForBrand: Scalars['Boolean']['output'];
  isRecommendedForModel: Scalars['Boolean']['output'];
  leasingDurationMonths?: Maybe<Scalars['Int']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  model?: Maybe<CatalogModel>;
  modelGeneration: CatalogModelGeneration;
  modelGenerationId: Scalars['String']['output'];
  modelId?: Maybe<Scalars['String']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  publicId?: Maybe<Scalars['String']['output']>;
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

export type LeasingCompanyStats = {
  __typename?: 'LeasingCompanyStats';
  calculationsCount: Scalars['Int']['output'];
  completedOnboardingsCount: Scalars['Int']['output'];
  conversionRate?: Maybe<Scalars['Float']['output']>;
  leasingCompanyId: Scalars['String']['output'];
  leasingCompanyName: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add a feature to a calculation (admin only) */
  addFeatureToCalculation: OfferCalculationFeature;
  addOfferQuote: CarRequestCalculationOffer;
  completeCalculation: CarRequestCalculation;
  createBrandEquipment: CatalogBrandEquipment;
  createCalculation: CarRequestCalculation;
  createCarRequest: CarRequest;
  createCarRequestLog: CarRequestLog;
  createCatalogBrand: CatalogBrand;
  createCatalogColor: CatalogColor;
  createCatalogEquipment: CatalogEquipment;
  createCatalogEquipmentItem: CatalogEquipmentItem;
  createCatalogEquipmentItemCategory: CatalogEquipmentItemCategory;
  createCatalogEquipmentPacket: CatalogEquipmentPacket;
  /** Create a new equipment paid item (Admin only) */
  createCatalogEquipmentPaidItem: CatalogEquipmentPaidItem;
  createCatalogModel: CatalogModel;
  createCatalogModelGeneration: CatalogModelGeneration;
  /** Create a new generation color (Admin only) */
  createCatalogModelGenerationColor: CatalogModelGenerationColor;
  /** Create a new generation configuration (Admin only) */
  createCatalogModelGenerationConfiguration: CatalogModelGenerationConfiguration;
  /** Create a new generation image (Admin only) */
  createCatalogModelGenerationImage: CatalogModelGenerationImage;
  /** Create a new color variant (admin only) */
  createColorVariant: OfferColorVariant;
  /** Create a new direct purchase offer (admin only) */
  createDirectPurchaseOffer: DirectPurchaseOffer;
  createDocumentTemplate: DocumentTemplate;
  createEngine: CatalogEngine;
  createEquipmentItem: CatalogBrandEquipmentItem;
  createFile: File;
  createFilePublic: File;
  /** Create a new individual (custom) offer (admin only) */
  createIndividualOffer: IndividualOffer;
  createLeasingCompany: LeasingCompany;
  /** Create a new leasing variant (admin only) */
  createLeasingVariant: OfferLeasingVariant;
  createOfferAdditionalEquipmentItem: OfferAdditionalEquipmentItem;
  createOfferColorVariant: OfferColorVariant;
  createOfferLeasingVariant: OfferLeasingVariant;
  createOfferOptionalEquipment: OfferOptionalEquipment;
  createOnboarding: Onboarding;
  /** Create a new operational leasing offer (admin only) */
  createOperationalLeasingOffer: OperationalLeasingOffer;
  /** Create optional equipment (admin only) */
  createOptionalEquipment: OfferOptionalEquipment;
  createUser: User;
  deleteBrandEquipment: Scalars['Boolean']['output'];
  deleteCalculation: Scalars['Boolean']['output'];
  deleteCarRequest: Scalars['Boolean']['output'];
  deleteCatalogBrand: Scalars['Boolean']['output'];
  deleteCatalogColor: Scalars['Boolean']['output'];
  deleteCatalogEquipment: Scalars['Boolean']['output'];
  deleteCatalogEquipmentItem: Scalars['Boolean']['output'];
  deleteCatalogEquipmentItemCategory: Scalars['Boolean']['output'];
  deleteCatalogEquipmentPacket: Scalars['Boolean']['output'];
  /** Delete an equipment paid item (Admin only) */
  deleteCatalogEquipmentPaidItem: Scalars['Boolean']['output'];
  deleteCatalogModel: Scalars['Boolean']['output'];
  deleteCatalogModelGeneration: Scalars['Boolean']['output'];
  /** Delete a generation color (Admin only) */
  deleteCatalogModelGenerationColor: Scalars['Boolean']['output'];
  /** Delete a generation configuration (Admin only) */
  deleteCatalogModelGenerationConfiguration: Scalars['Boolean']['output'];
  /** Delete a generation image (Admin only) */
  deleteCatalogModelGenerationImage: Scalars['Boolean']['output'];
  /** Delete a color variant (admin only) */
  deleteColorVariant: Scalars['Boolean']['output'];
  deleteDocumentTemplate: Scalars['Boolean']['output'];
  deleteEngine: Scalars['Boolean']['output'];
  deleteEquipmentItem: Scalars['Boolean']['output'];
  deleteFile: Scalars['Boolean']['output'];
  deleteFileCompletely: Scalars['Boolean']['output'];
  deleteLeasingCompany: Scalars['Boolean']['output'];
  /** Delete a leasing variant (admin only) */
  deleteLeasingVariant: Scalars['Boolean']['output'];
  /** Delete an offer (admin only) */
  deleteOffer: Scalars['Boolean']['output'];
  deleteOfferAdditionalEquipmentItem: Scalars['Boolean']['output'];
  deleteOfferColorVariant: Scalars['Boolean']['output'];
  deleteOfferLeasingVariant: Scalars['Boolean']['output'];
  deleteOfferOptionalEquipment: Scalars['Boolean']['output'];
  /** Delete optional equipment (admin only) */
  deleteOptionalEquipment: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  generateUploadUrl: Scalars['String']['output'];
  generateUploadUrlPublic: Scalars['String']['output'];
  impersonateUser: ImpersonateResponse;
  login: AuthResponse;
  refreshToken: AuthResponse;
  reorderDocumentTemplates: Scalars['Boolean']['output'];
  requestPasswordReset: PasswordResetRequestResponse;
  resetPassword: PasswordResetResponse;
  sendOnboardingReminder: Scalars['Boolean']['output'];
  softDeleteUser: User;
  startProcessingCalculation: CarRequestCalculation;
  stopImpersonation: AuthResponse;
  submitCalculation: CarRequestCalculation;
  updateBrandEquipment: CatalogBrandEquipment;
  updateCalculation: CarRequestCalculation;
  updateCarRequest: CarRequest;
  updateCatalogBrand: CatalogBrand;
  updateCatalogColor: CatalogColor;
  updateCatalogEquipment: CatalogEquipment;
  updateCatalogEquipmentItem: CatalogEquipmentItem;
  updateCatalogEquipmentItemCategory: CatalogEquipmentItemCategory;
  updateCatalogEquipmentPacket: CatalogEquipmentPacket;
  /** Update an equipment paid item (Admin only) */
  updateCatalogEquipmentPaidItem: CatalogEquipmentPaidItem;
  updateCatalogModel: CatalogModel;
  updateCatalogModelGeneration: CatalogModelGeneration;
  /** Update a generation color (Admin only) */
  updateCatalogModelGenerationColor: CatalogModelGenerationColor;
  /** Update a generation configuration (Admin only) */
  updateCatalogModelGenerationConfiguration: CatalogModelGenerationConfiguration;
  /** Update a generation image (Admin only) */
  updateCatalogModelGenerationImage: CatalogModelGenerationImage;
  updateDocumentTemplate: DocumentTemplate;
  updateEngine: CatalogEngine;
  updateEquipmentItem: CatalogBrandEquipmentItem;
  updateFile: File;
  /** Update status of an individual offer (admin only) */
  updateIndividualOfferStatus: IndividualOffer;
  updateLeasingCompany: LeasingCompany;
  /** Update an existing offer (admin only) */
  updateOffer: Offer;
  updateOfferAdditionalEquipmentItem: OfferAdditionalEquipmentItem;
  updateOfferColorVariant: OfferColorVariant;
  updateOfferLeasingVariant: OfferLeasingVariant;
  updateOfferOptionalEquipment: OfferOptionalEquipment;
  updateOfferQuote: CarRequestCalculationOffer;
  updateOnboardingStatus: Scalars['Boolean']['output'];
  updateUser: User;
  uploadOnboardingDocument: OnboardingDocument;
  validateDocument: OnboardingDocument;
};


export type MutationAddFeatureToCalculationArgs = {
  calculationId: Scalars['String']['input'];
  featureDescription?: InputMaybe<Scalars['String']['input']>;
  featureName: Scalars['String']['input'];
};


export type MutationAddOfferQuoteArgs = {
  input: AddOfferQuoteInput;
};


export type MutationCompleteCalculationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateBrandEquipmentArgs = {
  input: CreateCatalogBrandEquipmentInput;
};


export type MutationCreateCalculationArgs = {
  input: CreateCalculationInput;
};


export type MutationCreateCarRequestArgs = {
  input: CreateCarRequestInput;
};


export type MutationCreateCarRequestLogArgs = {
  input: CreateCarRequestLogInput;
};


export type MutationCreateCatalogBrandArgs = {
  input: CreateCatalogBrandInput;
};


export type MutationCreateCatalogColorArgs = {
  input: CreateCatalogColorInput;
};


export type MutationCreateCatalogEquipmentArgs = {
  input: CreateCatalogEquipmentInput;
};


export type MutationCreateCatalogEquipmentItemArgs = {
  input: CreateCatalogEquipmentItemInput;
};


export type MutationCreateCatalogEquipmentItemCategoryArgs = {
  input: CreateCatalogEquipmentItemCategoryInput;
};


export type MutationCreateCatalogEquipmentPacketArgs = {
  input: CreateCatalogEquipmentPacketInput;
};


export type MutationCreateCatalogEquipmentPaidItemArgs = {
  input: CreateCatalogEquipmentPaidItemInput;
};


export type MutationCreateCatalogModelArgs = {
  input: CreateCatalogModelInput;
};


export type MutationCreateCatalogModelGenerationArgs = {
  input: CreateCatalogModelGenerationInput;
};


export type MutationCreateCatalogModelGenerationColorArgs = {
  input: CreateCatalogModelGenerationColorInput;
};


export type MutationCreateCatalogModelGenerationConfigurationArgs = {
  input: CreateCatalogModelGenerationConfigurationInput;
};


export type MutationCreateCatalogModelGenerationImageArgs = {
  input: CreateCatalogModelGenerationImageInput;
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


export type MutationCreateDocumentTemplateArgs = {
  input: CreateDocumentTemplateInput;
};


export type MutationCreateEngineArgs = {
  input: CreateCatalogEngineInput;
};


export type MutationCreateEquipmentItemArgs = {
  input: CreateCatalogBrandEquipmentItemInput;
};


export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


export type MutationCreateFilePublicArgs = {
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
  offerId: Scalars['String']['input'];
  priceWithVat: Scalars['Float']['input'];
  priceWithoutVat: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
};


export type MutationCreateOfferAdditionalEquipmentItemArgs = {
  input: CreateOfferAdditionalEquipmentItemInput;
};


export type MutationCreateOfferColorVariantArgs = {
  input: CreateOfferColorVariantInput;
};


export type MutationCreateOfferLeasingVariantArgs = {
  input: CreateOfferLeasingVariantInput;
};


export type MutationCreateOfferOptionalEquipmentArgs = {
  input: CreateOfferOptionalEquipmentInput;
};


export type MutationCreateOnboardingArgs = {
  carRequestId: Scalars['String']['input'];
  expirationDays?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationCreateOperationalLeasingOfferArgs = {
  input: CreateOperationalLeasingOfferInput;
};


export type MutationCreateOptionalEquipmentArgs = {
  additionalPrice?: InputMaybe<Scalars['Float']['input']>;
  equipmentItemId: Scalars['String']['input'];
  offerId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBrandEquipmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCalculationArgs = {
  id: Scalars['ID']['input'];
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


export type MutationDeleteCatalogEquipmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogEquipmentItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogEquipmentItemCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogEquipmentPacketArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogEquipmentPaidItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogModelArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogModelGenerationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogModelGenerationColorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogModelGenerationConfigurationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCatalogModelGenerationImageArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteColorVariantArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDocumentTemplateArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteEngineArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteEquipmentItemArgs = {
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


export type MutationDeleteOfferAdditionalEquipmentItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOfferColorVariantArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOfferLeasingVariantArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOfferOptionalEquipmentArgs = {
  id: Scalars['ID']['input'];
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


export type MutationGenerateUploadUrlPublicArgs = {
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


export type MutationReorderDocumentTemplatesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendOnboardingReminderArgs = {
  onboardingId: Scalars['String']['input'];
};


export type MutationSoftDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationStartProcessingCalculationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSubmitCalculationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBrandEquipmentArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogBrandEquipmentInput;
};


export type MutationUpdateCalculationArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCalculationInput;
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


export type MutationUpdateCatalogEquipmentArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogEquipmentInput;
};


export type MutationUpdateCatalogEquipmentItemArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogEquipmentItemInput;
};


export type MutationUpdateCatalogEquipmentItemCategoryArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogEquipmentItemCategoryInput;
};


export type MutationUpdateCatalogEquipmentPacketArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogEquipmentPacketInput;
};


export type MutationUpdateCatalogEquipmentPaidItemArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogEquipmentPaidItemInput;
};


export type MutationUpdateCatalogModelArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogModelInput;
};


export type MutationUpdateCatalogModelGenerationArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogModelGenerationInput;
};


export type MutationUpdateCatalogModelGenerationColorArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogModelGenerationColorInput;
};


export type MutationUpdateCatalogModelGenerationConfigurationArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogModelGenerationConfigurationInput;
};


export type MutationUpdateCatalogModelGenerationImageArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogModelGenerationImageInput;
};


export type MutationUpdateDocumentTemplateArgs = {
  id: Scalars['String']['input'];
  input: UpdateDocumentTemplateInput;
};


export type MutationUpdateEngineArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogEngineInput;
};


export type MutationUpdateEquipmentItemArgs = {
  id: Scalars['String']['input'];
  input: UpdateCatalogBrandEquipmentItemInput;
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


export type MutationUpdateOfferAdditionalEquipmentItemArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOfferAdditionalEquipmentItemInput;
};


export type MutationUpdateOfferColorVariantArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOfferColorVariantInput;
};


export type MutationUpdateOfferLeasingVariantArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOfferLeasingVariantInput;
};


export type MutationUpdateOfferOptionalEquipmentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOfferOptionalEquipmentInput;
};


export type MutationUpdateOfferQuoteArgs = {
  input: UpdateOfferQuoteInput;
  offerId: Scalars['ID']['input'];
};


export type MutationUpdateOnboardingStatusArgs = {
  onboardingId: Scalars['String']['input'];
  status: OnboardingStatus;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: UpdateUserInput;
};


export type MutationUploadOnboardingDocumentArgs = {
  input: UploadDocumentInput;
  token: Scalars['String']['input'];
};


export type MutationValidateDocumentArgs = {
  documentId: Scalars['String']['input'];
  input: ValidateDocumentInput;
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
  disableCustomGallery?: Maybe<Scalars['Boolean']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  downPaymentLeasing?: Maybe<Scalars['Float']['output']>;
  engine?: Maybe<CatalogEngine>;
  engineId?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  financingAvailable?: Maybe<Scalars['Boolean']['output']>;
  hasAssistanceServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasGapIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasWinterTyresIncluded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  includesWarranty?: Maybe<Scalars['Boolean']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isPrivate: Scalars['Boolean']['output'];
  isPromoted: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  isRecommendedForActionPage: Scalars['Boolean']['output'];
  isRecommendedForBrand: Scalars['Boolean']['output'];
  isRecommendedForModel: Scalars['Boolean']['output'];
  leasingDurationMonths?: Maybe<Scalars['Int']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  model?: Maybe<CatalogModel>;
  modelGeneration: CatalogModelGeneration;
  modelGenerationId: Scalars['String']['output'];
  modelId?: Maybe<Scalars['String']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  publicId?: Maybe<Scalars['String']['output']>;
  responseDeadline?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<IndividualOfferStatus>;
  totalPrice: Scalars['Float']['output'];
  type: OfferType;
  updatedAt: Scalars['DateTime']['output'];
  warrantyYears?: Maybe<Scalars['Int']['output']>;
};

export type OfferAdditionalEquipmentItem = {
  __typename?: 'OfferAdditionalEquipmentItem';
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  interiorColor?: Maybe<CatalogColor>;
  interiorColorId?: Maybe<Scalars['String']['output']>;
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
  currency: Scalars['String']['output'];
  downPayment?: Maybe<Scalars['Int']['output']>;
  freeMileageLimit?: Maybe<Scalars['Int']['output']>;
  hasAssistanceServiceIncluded: Scalars['Boolean']['output'];
  hasGapIncluded: Scalars['Boolean']['output'];
  hasGlassInsuranceIncluded: Scalars['Boolean']['output'];
  hasHighwayIncluded: Scalars['Boolean']['output'];
  hasServiceIncluded: Scalars['Boolean']['output'];
  hasWinterTyresIncluded: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isBestOffer: Scalars['Boolean']['output'];
  isDefault: Scalars['Boolean']['output'];
  leasingCompany?: Maybe<LeasingCompany>;
  leasingCompanyId?: Maybe<Scalars['String']['output']>;
  leasingDurationMonths: Scalars['Int']['output'];
  offer: OperationalLeasingOffer;
  offerId: Scalars['String']['output'];
  originalPriceWithVat?: Maybe<Scalars['Int']['output']>;
  originalPriceWithoutVat?: Maybe<Scalars['Int']['output']>;
  pricePeriod: PricePeriod;
  priceWithVat?: Maybe<Scalars['Int']['output']>;
  priceWithoutVat?: Maybe<Scalars['Int']['output']>;
  securityDeposit?: Maybe<Scalars['Int']['output']>;
  setupFee?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  validTo?: Maybe<Scalars['DateTime']['output']>;
  vatRate: Scalars['Float']['output'];
  wearTolerancePercent?: Maybe<Scalars['Int']['output']>;
};

export type OfferOptionalEquipment = {
  __typename?: 'OfferOptionalEquipment';
  additionalPrice?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  equipmentItem?: Maybe<OfferAdditionalEquipmentItem>;
  equipmentItemId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAvailable: Scalars['Boolean']['output'];
  isDefaultSelected: Scalars['Boolean']['output'];
  offer: OperationalLeasingOffer;
  offerId: Scalars['String']['output'];
  pricePeriod: PricePeriod;
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

export type Onboarding = {
  __typename?: 'Onboarding';
  carRequest: CarRequest;
  carRequestId: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  documents?: Maybe<Array<OnboardingDocument>>;
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastReminderSentAt?: Maybe<Scalars['DateTime']['output']>;
  leasingCompany: LeasingCompany;
  leasingCompanyId: Scalars['String']['output'];
  status: OnboardingStatus;
  token: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OnboardingDocument = {
  __typename?: 'OnboardingDocument';
  documentTemplate: DocumentTemplate;
  documentTemplateId: Scalars['String']['output'];
  file: File;
  fileId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  onboarding: Onboarding;
  onboardingId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploadedAt: Scalars['DateTime']['output'];
  validatedAt?: Maybe<Scalars['DateTime']['output']>;
  validatedBy?: Maybe<User>;
  validatedById?: Maybe<Scalars['String']['output']>;
  validationNote?: Maybe<Scalars['String']['output']>;
  validationStatus: DocumentValidationStatus;
};

/** Status of the onboarding process */
export enum OnboardingStatus {
  Complete = 'COMPLETE',
  Expired = 'EXPIRED',
  Incomplete = 'INCOMPLETE',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
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
  disableCustomGallery?: Maybe<Scalars['Boolean']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  downPaymentLeasing?: Maybe<Scalars['Float']['output']>;
  engine?: Maybe<CatalogEngine>;
  engineId?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  financingAvailable?: Maybe<Scalars['Boolean']['output']>;
  hasAssistanceServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasGapIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasServiceIncluded?: Maybe<Scalars['Boolean']['output']>;
  hasWinterTyresIncluded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  includesWarranty?: Maybe<Scalars['Boolean']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isPrivate: Scalars['Boolean']['output'];
  isPromoted: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  isRecommendedForActionPage: Scalars['Boolean']['output'];
  isRecommendedForBrand: Scalars['Boolean']['output'];
  isRecommendedForModel: Scalars['Boolean']['output'];
  leasingDurationMonths?: Maybe<Scalars['Int']['output']>;
  legacySystemId?: Maybe<Scalars['String']['output']>;
  model?: Maybe<CatalogModel>;
  modelGeneration: CatalogModelGeneration;
  modelGenerationId: Scalars['String']['output'];
  modelId?: Maybe<Scalars['String']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  optionalEquipment?: Maybe<Array<OfferOptionalEquipment>>;
  publicId?: Maybe<Scalars['String']['output']>;
  responseDeadline?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<IndividualOfferStatus>;
  totalPrice: Scalars['Float']['output'];
  type: OfferType;
  updatedAt: Scalars['DateTime']['output'];
  variants?: Maybe<Array<OfferLeasingVariant>>;
  warrantyYears?: Maybe<Scalars['Int']['output']>;
};

export type PasswordResetRequestResponse = {
  __typename?: 'PasswordResetRequestResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type PasswordResetResponse = {
  __typename?: 'PasswordResetResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

/** Period for which the price is valid */
export enum PricePeriod {
  Monthly = 'MONTHLY',
  OneTime = 'ONE_TIME'
}

export type Query = {
  __typename?: 'Query';
  activeEngines: Array<CatalogEngine>;
  allBrandEquipments: Array<CatalogBrandEquipment>;
  allCarRequestStates: Array<CarRequestState>;
  allCarRequestStatuses: Array<CarRequestStatus>;
  allCarRequests: Array<CarRequest>;
  allCatalogBrands: Array<CatalogBrand>;
  allCatalogModels: Array<CatalogModel>;
  allDocumentTemplates: Array<DocumentTemplate>;
  allEngines: Array<CatalogEngine>;
  allEquipmentItems: Array<CatalogBrandEquipmentItem>;
  /** Get all offers including individual offers (admin only) */
  allOffers: Array<Offer>;
  allOnboardings: Array<Onboarding>;
  auditLogs: Array<AuditLog>;
  brandEquipment: CatalogBrandEquipment;
  brandEquipmentsCount: Scalars['Int']['output'];
  calculation?: Maybe<CarRequestCalculation>;
  calculationsByCarRequest: Array<CarRequestCalculation>;
  /** Get all calculations for an individual offer (admin only) */
  calculationsByOffer: Array<OfferCalculation>;
  carRequest: CarRequest;
  carRequestLogs: Array<CarRequestLog>;
  carRequestsCount: Scalars['Int']['output'];
  carRequestsDashboardStats: DashboardStats;
  catalogBrand: CatalogBrand;
  catalogBrandBySlug: CatalogBrand;
  catalogBrands: Array<CatalogBrand>;
  catalogColor: CatalogColor;
  catalogColorBySlug: CatalogColor;
  catalogColors: Array<CatalogColor>;
  catalogColorsByType: Array<CatalogColor>;
  catalogEquipment: Array<CatalogEquipment>;
  catalogEquipmentById: CatalogEquipment;
  catalogEquipmentByModelGenerationId: Array<CatalogEquipment>;
  catalogEquipmentItemById: CatalogEquipmentItem;
  catalogEquipmentItemCategories: Array<CatalogEquipmentItemCategory>;
  catalogEquipmentItemCategoryById: CatalogEquipmentItemCategory;
  catalogEquipmentItems: Array<CatalogEquipmentItem>;
  catalogEquipmentItemsByCategoryId: Array<CatalogEquipmentItem>;
  catalogEquipmentPacketById: CatalogEquipmentPacket;
  catalogEquipmentPackets: Array<CatalogEquipmentPacket>;
  catalogEquipmentPacketsByEquipmentId: Array<CatalogEquipmentPacket>;
  /** Get a single equipment paid item by ID */
  catalogEquipmentPaidItemById: CatalogEquipmentPaidItem;
  /** Get all equipment paid items with optional filters */
  catalogEquipmentPaidItems: Array<CatalogEquipmentPaidItem>;
  /** Get all paid items for a specific equipment */
  catalogEquipmentPaidItemsByEquipmentId: Array<CatalogEquipmentPaidItem>;
  /** Get all paid item prices for a specific equipment item */
  catalogEquipmentPaidItemsByItemId: Array<CatalogEquipmentPaidItem>;
  catalogModel: CatalogModel;
  catalogModelBySlug: CatalogModel;
  catalogModelGeneration: CatalogModelGeneration;
  /** Get 360° gallery images for a specific generation and optional exterior color */
  catalogModelGeneration360Gallery: Array<CatalogModelGenerationImage>;
  catalogModelGenerationByLegacySlug: CatalogModelGeneration;
  catalogModelGenerationBySlug: CatalogModelGeneration;
  /** Get a single generation color by ID */
  catalogModelGenerationColorById: CatalogModelGenerationColor;
  /** Get all generation colors with optional filters */
  catalogModelGenerationColors: Array<CatalogModelGenerationColor>;
  /** Get all generations that have a specific color */
  catalogModelGenerationColorsByColorId: Array<CatalogModelGenerationColor>;
  /** Get all colors for a specific generation */
  catalogModelGenerationColorsByGenerationId: Array<CatalogModelGenerationColor>;
  /** Get a single configuration by ID */
  catalogModelGenerationConfigurationById: CatalogModelGenerationConfiguration;
  /** Get all generation configurations with optional filters */
  catalogModelGenerationConfigurations: Array<CatalogModelGenerationConfiguration>;
  /** Get all configurations with specific engine */
  catalogModelGenerationConfigurationsByEngineId: Array<CatalogModelGenerationConfiguration>;
  /** Get all configurations with specific equipment */
  catalogModelGenerationConfigurationsByEquipmentId: Array<CatalogModelGenerationConfiguration>;
  /** Get all configurations for a specific generation */
  catalogModelGenerationConfigurationsByGenerationId: Array<CatalogModelGenerationConfiguration>;
  /** Get a single generation image by ID */
  catalogModelGenerationImageById: CatalogModelGenerationImage;
  /** Get all generation images with optional filters */
  catalogModelGenerationImages: Array<CatalogModelGenerationImage>;
  /** Get images for a specific generation and color combination */
  catalogModelGenerationImagesByColorCombination: Array<CatalogModelGenerationImage>;
  /** Get all images for a specific generation */
  catalogModelGenerationImagesByGenerationId: Array<CatalogModelGenerationImage>;
  /** Get all generations using a specific image */
  catalogModelGenerationImagesByImageId: Array<CatalogModelGenerationImage>;
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
  documentTemplate: DocumentTemplate;
  documentTemplatesByLeasingCompany: Array<DocumentTemplate>;
  documents: Array<File>;
  engine: CatalogEngine;
  enginesCount: Scalars['Int']['output'];
  entityHistory: Array<AuditLog>;
  equipmentItem: CatalogBrandEquipmentItem;
  equipmentItemsCount: Scalars['Int']['output'];
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
  offerAdditionalEquipmentItemAdmin: OfferAdditionalEquipmentItem;
  offerAdditionalEquipmentItemsAdmin: Array<OfferAdditionalEquipmentItem>;
  offerAdditionalEquipmentItemsByCategoryAdmin: Array<OfferAdditionalEquipmentItem>;
  /** Get a single offer by slug (admin only) */
  offerBySlug: Offer;
  offerColorVariantAdmin: OfferColorVariant;
  offerColorVariantsAdmin: Array<OfferColorVariant>;
  offerColorVariantsByOfferAdmin: Array<OfferColorVariant>;
  offerLeasingVariantAdmin: OfferLeasingVariant;
  offerLeasingVariantBySlugAdmin?: Maybe<OfferLeasingVariant>;
  offerLeasingVariantsAdmin: Array<OfferLeasingVariant>;
  offerLeasingVariantsByOfferAdmin: Array<OfferLeasingVariant>;
  offerOptionalEquipmentAdmin: OfferOptionalEquipment;
  offerOptionalEquipmentAvailableByOfferAdmin: Array<OfferOptionalEquipment>;
  offerOptionalEquipmentByOfferAdmin: Array<OfferOptionalEquipment>;
  offerOptionalEquipmentListAdmin: Array<OfferOptionalEquipment>;
  /** Get all public offers for a specific model generation */
  offersByModelGeneration: Array<Offer>;
  onboarding: Onboarding;
  onboardingByToken: Onboarding;
  /** Get all operational leasing offers */
  operationalLeasingOffers: Array<Offer>;
  /** Get all optional equipment for an offer (admin only) */
  optionalEquipmentByOffer: Array<OfferOptionalEquipment>;
  pendingCalculations: Array<CarRequestCalculation>;
  publicEngine: CatalogEngine;
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
  recommendedEngines: Array<CatalogEngine>;
  requiredDocumentsByToken: Array<DocumentTemplate>;
  requiredDocumentsForOnboarding: Array<DocumentTemplate>;
  searchBrandEquipments: Array<CatalogBrandEquipment>;
  searchCatalogBrands: Array<CatalogBrand>;
  searchCatalogColors: Array<CatalogColor>;
  searchCatalogEquipment: Array<CatalogEquipment>;
  searchCatalogEquipmentItemCategories: Array<CatalogEquipmentItemCategory>;
  searchCatalogEquipmentItems: Array<CatalogEquipmentItem>;
  searchCatalogEquipmentPackets: Array<CatalogEquipmentPacket>;
  searchCatalogModelGenerations: Array<CatalogModelGeneration>;
  searchCatalogModels: Array<CatalogModel>;
  searchEngines: Array<CatalogEngine>;
  searchEquipmentItems: Array<CatalogBrandEquipmentItem>;
  searchOfferAdditionalEquipmentItemsAdmin: Array<OfferAdditionalEquipmentItem>;
  searchUsers: Array<User>;
  storageStats: StorageStats;
  user: User;
  userActivity: Array<AuditLog>;
  users: Array<User>;
};


export type QueryActiveEnginesArgs = {
  driveType?: InputMaybe<CatalogEngineDriveType>;
  fuelType?: InputMaybe<CatalogEngineFuelType>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  transmissionType?: InputMaybe<CatalogEngineTransmissionType>;
};


export type QueryAllBrandEquipmentsArgs = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
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


export type QueryAllDocumentTemplatesArgs = {
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAllEnginesArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  driveType?: InputMaybe<CatalogEngineDriveType>;
  fuelType?: InputMaybe<CatalogEngineFuelType>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  recommendedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  transmissionType?: InputMaybe<CatalogEngineTransmissionType>;
};


export type QueryAllEquipmentItemsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryAllOffersArgs = {
  filters?: InputMaybe<OfferFiltersInput>;
};


export type QueryAllOnboardingsArgs = {
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OnboardingStatus>;
};


export type QueryAuditLogsArgs = {
  query: AuditQueryInput;
};


export type QueryBrandEquipmentArgs = {
  id: Scalars['String']['input'];
};


export type QueryBrandEquipmentsCountArgs = {
  brandId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCalculationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCalculationsByCarRequestArgs = {
  carRequestId: Scalars['ID']['input'];
};


export type QueryCalculationsByOfferArgs = {
  offerId: Scalars['String']['input'];
};


export type QueryCarRequestArgs = {
  id: Scalars['String']['input'];
};


export type QueryCarRequestLogsArgs = {
  filter: CarRequestLogFilterInput;
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


export type QueryCatalogEquipmentArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  modelGenerationId?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  standard?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCatalogEquipmentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogEquipmentByModelGenerationIdArgs = {
  modelGenerationId: Scalars['String']['input'];
};


export type QueryCatalogEquipmentItemByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogEquipmentItemCategoriesArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryCatalogEquipmentItemCategoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogEquipmentItemsArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryCatalogEquipmentItemsByCategoryIdArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryCatalogEquipmentPacketByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogEquipmentPacketsArgs = {
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryCatalogEquipmentPacketsByEquipmentIdArgs = {
  equipmentId: Scalars['String']['input'];
};


export type QueryCatalogEquipmentPaidItemByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogEquipmentPaidItemsArgs = {
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCatalogEquipmentPaidItemsByEquipmentIdArgs = {
  equipmentId: Scalars['String']['input'];
};


export type QueryCatalogEquipmentPaidItemsByItemIdArgs = {
  itemId: Scalars['String']['input'];
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


export type QueryCatalogModelGeneration360GalleryArgs = {
  exteriorColorId?: InputMaybe<Scalars['String']['input']>;
  generationId: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationByLegacySlugArgs = {
  legacySlug: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationColorByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationColorsArgs = {
  colorId?: InputMaybe<Scalars['String']['input']>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCatalogModelGenerationColorsByColorIdArgs = {
  colorId: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationColorsByGenerationIdArgs = {
  generationId: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationConfigurationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationConfigurationsArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  engineId?: InputMaybe<Scalars['String']['input']>;
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCatalogModelGenerationConfigurationsByEngineIdArgs = {
  engineId: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationConfigurationsByEquipmentIdArgs = {
  equipmentId: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationConfigurationsByGenerationIdArgs = {
  generationId: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationImageByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationImagesArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  exteriorColorId?: InputMaybe<Scalars['String']['input']>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['String']['input']>;
  imageType?: InputMaybe<CatalogImageType>;
  interiorColorId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCatalogModelGenerationImagesByColorCombinationArgs = {
  exteriorColorId?: InputMaybe<Scalars['String']['input']>;
  generationId: Scalars['String']['input'];
  imageType?: InputMaybe<CatalogImageType>;
  interiorColorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCatalogModelGenerationImagesByGenerationIdArgs = {
  generationId: Scalars['String']['input'];
};


export type QueryCatalogModelGenerationImagesByImageIdArgs = {
  imageId: Scalars['String']['input'];
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


export type QueryDocumentTemplateArgs = {
  id: Scalars['String']['input'];
};


export type QueryDocumentTemplatesByLeasingCompanyArgs = {
  leasingCompanyId: Scalars['String']['input'];
};


export type QueryEngineArgs = {
  id: Scalars['String']['input'];
};


export type QueryEnginesCountArgs = {
  fuelType?: InputMaybe<CatalogEngineFuelType>;
  generationId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEntityHistoryArgs = {
  entityId: Scalars['String']['input'];
  entityName: Scalars['String']['input'];
};


export type QueryEquipmentItemArgs = {
  id: Scalars['String']['input'];
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


export type QueryOfferAdditionalEquipmentItemAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOfferAdditionalEquipmentItemsByCategoryAdminArgs = {
  category: Scalars['String']['input'];
};


export type QueryOfferBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryOfferColorVariantAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOfferColorVariantsByOfferAdminArgs = {
  offerId: Scalars['ID']['input'];
};


export type QueryOfferLeasingVariantAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOfferLeasingVariantBySlugAdminArgs = {
  offerId: Scalars['ID']['input'];
  slug: Scalars['String']['input'];
};


export type QueryOfferLeasingVariantsByOfferAdminArgs = {
  offerId: Scalars['ID']['input'];
};


export type QueryOfferOptionalEquipmentAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOfferOptionalEquipmentAvailableByOfferAdminArgs = {
  offerId: Scalars['ID']['input'];
};


export type QueryOfferOptionalEquipmentByOfferAdminArgs = {
  offerId: Scalars['ID']['input'];
};


export type QueryOffersByModelGenerationArgs = {
  modelGenerationId: Scalars['String']['input'];
};


export type QueryOnboardingArgs = {
  id: Scalars['String']['input'];
};


export type QueryOnboardingByTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryOperationalLeasingOffersArgs = {
  filters?: InputMaybe<OfferFiltersInput>;
};


export type QueryOptionalEquipmentByOfferArgs = {
  offerId: Scalars['String']['input'];
};


export type QueryPublicEngineArgs = {
  id: Scalars['String']['input'];
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


export type QueryRecommendedEnginesArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryRequiredDocumentsByTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryRequiredDocumentsForOnboardingArgs = {
  onboardingId: Scalars['String']['input'];
};


export type QuerySearchBrandEquipmentsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchCatalogBrandsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchCatalogColorsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchCatalogEquipmentArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchCatalogEquipmentItemCategoriesArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchCatalogEquipmentItemsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchCatalogEquipmentPacketsArgs = {
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


export type QuerySearchEnginesArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchEquipmentItemsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchOfferAdditionalEquipmentItemsAdminArgs = {
  searchTerm: Scalars['String']['input'];
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

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
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

export type TimelineDataPoint = {
  __typename?: 'TimelineDataPoint';
  completedOnboardings: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  newCarRequests: Scalars['Int']['output'];
};

export type UpdateCalculationInput = {
  annualMileageKm?: InputMaybe<Scalars['Int']['input']>;
  assignedToId?: InputMaybe<Scalars['String']['input']>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  deliveryExpectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  durationMonths?: InputMaybe<Scalars['Int']['input']>;
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<CreateCalculationItemInput>>;
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  modelGenerationId?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarRequestInput = {
  assignedAgentId?: InputMaybe<Scalars['String']['input']>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  cancellationNote?: InputMaybe<Scalars['String']['input']>;
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  financingType?: InputMaybe<Scalars['String']['input']>;
  gclid?: InputMaybe<Scalars['String']['input']>;
  isFromLegacySystem?: InputMaybe<Scalars['Boolean']['input']>;
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  modelId?: InputMaybe<Scalars['String']['input']>;
  noteInternal?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateCatalogBrandEquipmentInput = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCatalogBrandEquipmentItemInput = {
  name?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateCatalogEngineInput = {
  acceleration?: InputMaybe<Scalars['Float']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  consumptionCity?: InputMaybe<Scalars['Float']['input']>;
  consumptionCombined?: InputMaybe<Scalars['Float']['input']>;
  consumptionOutOfCity?: InputMaybe<Scalars['Float']['input']>;
  cylinderCount?: InputMaybe<Scalars['Int']['input']>;
  driveType?: InputMaybe<CatalogEngineDriveType>;
  emission?: InputMaybe<Scalars['Int']['input']>;
  fuelTankVolume?: InputMaybe<Scalars['Int']['input']>;
  fuelType?: InputMaybe<CatalogEngineFuelType>;
  gearsCount?: InputMaybe<Scalars['Int']['input']>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  maxSpeed?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  performance?: InputMaybe<Scalars['Int']['input']>;
  productionStart?: InputMaybe<Scalars['DateTime']['input']>;
  productionStop?: InputMaybe<Scalars['DateTime']['input']>;
  rangeKm?: InputMaybe<Scalars['Int']['input']>;
  recommended?: InputMaybe<Scalars['Boolean']['input']>;
  torque?: InputMaybe<Scalars['Int']['input']>;
  transmissionType?: InputMaybe<CatalogEngineTransmissionType>;
  volume?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCatalogEquipmentInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  customText?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  modelGenerationId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  standard?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCatalogEquipmentItemCategoryInput = {
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCatalogEquipmentItemInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCatalogEquipmentPacketInput = {
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** Price in cents */
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCatalogEquipmentPaidItemInput = {
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  /** Price in cents */
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCatalogModelGenerationColorInput = {
  colorId?: InputMaybe<Scalars['String']['input']>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  /** Price in cents */
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCatalogModelGenerationConfigurationInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  engineId?: InputMaybe<Scalars['String']['input']>;
  equipmentId?: InputMaybe<Scalars['String']['input']>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  /** Price from (base price) */
  priceFrom?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateCatalogModelGenerationImageInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Description/alt text for SEO */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Exterior color ID for this image */
  exteriorColorId?: InputMaybe<Scalars['String']['input']>;
  /** 360 gallery frame position (0-35) */
  galleryPosition?: InputMaybe<Scalars['Int']['input']>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['String']['input']>;
  /** Type/purpose of this image */
  imageType?: InputMaybe<CatalogImageType>;
  /** Interior color ID for this image */
  interiorColorId?: InputMaybe<Scalars['String']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  /** Display order */
  order?: InputMaybe<Scalars['Int']['input']>;
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

export type UpdateDocumentTemplateInput = {
  acceptedFormats?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  helpText?: InputMaybe<Scalars['String']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  maxSizeBytes?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateOfferAdditionalEquipmentItemInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOfferColorVariantInput = {
  colorName?: InputMaybe<Scalars['String']['input']>;
  exteriorColorId?: InputMaybe<Scalars['String']['input']>;
  galleryId?: InputMaybe<Scalars['String']['input']>;
  interiorColorId?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateOfferInput = {
  annualMileageLimit?: InputMaybe<Scalars['Int']['input']>;
  customRequirements?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  disableCustomGallery?: InputMaybe<Scalars['Boolean']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  discountPercentage?: InputMaybe<Scalars['Float']['input']>;
  engineId?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  hasServiceIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasWinterTyresIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  includesWarranty?: InputMaybe<Scalars['Boolean']['input']>;
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  isPromoted?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommendedForActionPage?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommendedForBrand?: InputMaybe<Scalars['Boolean']['input']>;
  isRecommendedForModel?: InputMaybe<Scalars['Boolean']['input']>;
  leasingDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  legacySystemId?: InputMaybe<Scalars['String']['input']>;
  monthlyPayment?: InputMaybe<Scalars['Float']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  publicId?: InputMaybe<Scalars['String']['input']>;
  responseDeadline?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<IndividualOfferStatus>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
  warrantyYears?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOfferLeasingVariantInput = {
  annualMileageLimit?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  downPayment?: InputMaybe<Scalars['Int']['input']>;
  freeMileageLimit?: InputMaybe<Scalars['Int']['input']>;
  hasAssistanceServiceIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasGapIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasGlassInsuranceIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasHighwayIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasServiceIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  hasWinterTyresIncluded?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isBestOffer?: InputMaybe<Scalars['Boolean']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
  leasingDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  originalPriceWithVat?: InputMaybe<Scalars['Int']['input']>;
  originalPriceWithoutVat?: InputMaybe<Scalars['Int']['input']>;
  pricePeriod?: InputMaybe<PricePeriod>;
  priceWithVat?: InputMaybe<Scalars['Int']['input']>;
  priceWithoutVat?: InputMaybe<Scalars['Int']['input']>;
  securityDeposit?: InputMaybe<Scalars['Int']['input']>;
  setupFee?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  validFrom?: InputMaybe<Scalars['String']['input']>;
  validTo?: InputMaybe<Scalars['String']['input']>;
  vatRate?: InputMaybe<Scalars['Float']['input']>;
  wearTolerancePercent?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOfferOptionalEquipmentInput = {
  additionalPrice?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  isDefaultSelected?: InputMaybe<Scalars['Boolean']['input']>;
  pricePeriod?: InputMaybe<PricePeriod>;
};

export type UpdateOfferQuoteInput = {
  adminFee?: InputMaybe<Scalars['Float']['input']>;
  downPayment?: InputMaybe<Scalars['Float']['input']>;
  includesAssistance?: InputMaybe<Scalars['Boolean']['input']>;
  includesGap?: InputMaybe<Scalars['Boolean']['input']>;
  includesService?: InputMaybe<Scalars['Boolean']['input']>;
  includesWinterTires?: InputMaybe<Scalars['Boolean']['input']>;
  interestRate?: InputMaybe<Scalars['Float']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  monthlyPayment?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  termsAndConditions?: InputMaybe<Scalars['String']['input']>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
  validUntil?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UploadDocumentInput = {
  documentTemplateId: Scalars['String']['input'];
  fileId: Scalars['String']['input'];
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

export type ValidateDocumentInput = {
  note?: InputMaybe<Scalars['String']['input']>;
  status: DocumentValidationStatus;
};

export type VehicleFunnelStats = {
  __typename?: 'VehicleFunnelStats';
  created: Scalars['Int']['output'];
  hasOffers: Scalars['Int']['output'];
  leasingCompanySelected: Scalars['Int']['output'];
  onboardingComplete: Scalars['Int']['output'];
  ordered: Scalars['Int']['output'];
};

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

export type GetAllBrandEquipmentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  brandId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllBrandEquipmentsQuery = { __typename?: 'Query', allBrandEquipments: Array<{ __typename?: 'CatalogBrandEquipment', id: string, name: string, description?: string | null, brandId: string, createdAt: any, updatedAt?: any | null, brand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string }, assignedItems?: Array<{ __typename?: 'CatalogBrandEquipmentItem', id: string, name: string, legacySystemId?: string | null }> | null }> };

export type GetBrandEquipmentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetBrandEquipmentQuery = { __typename?: 'Query', brandEquipment: { __typename?: 'CatalogBrandEquipment', id: string, name: string, description?: string | null, brandId: string, createdAt: any, updatedAt?: any | null, brand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string }, assignedItems?: Array<{ __typename?: 'CatalogBrandEquipmentItem', id: string, name: string, legacySystemId?: string | null }> | null } };

export type SearchBrandEquipmentsQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SearchBrandEquipmentsQuery = { __typename?: 'Query', searchBrandEquipments: Array<{ __typename?: 'CatalogBrandEquipment', id: string, name: string, description?: string | null, brandId: string, brand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } }> };

export type GetBrandEquipmentsCountQueryVariables = Exact<{
  brandId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBrandEquipmentsCountQuery = { __typename?: 'Query', brandEquipmentsCount: number };

export type CreateBrandEquipmentMutationVariables = Exact<{
  input: CreateCatalogBrandEquipmentInput;
}>;


export type CreateBrandEquipmentMutation = { __typename?: 'Mutation', createBrandEquipment: { __typename?: 'CatalogBrandEquipment', id: string, name: string, description?: string | null, brandId: string, createdAt: any, updatedAt?: any | null, brand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string }, assignedItems?: Array<{ __typename?: 'CatalogBrandEquipmentItem', id: string, name: string, legacySystemId?: string | null }> | null } };

export type UpdateBrandEquipmentMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogBrandEquipmentInput;
}>;


export type UpdateBrandEquipmentMutation = { __typename?: 'Mutation', updateBrandEquipment: { __typename?: 'CatalogBrandEquipment', id: string, name: string, description?: string | null, brandId: string, createdAt: any, updatedAt?: any | null, brand: { __typename?: 'CatalogBrand', id: string, name: string, slug: string }, assignedItems?: Array<{ __typename?: 'CatalogBrandEquipmentItem', id: string, name: string, legacySystemId?: string | null }> | null } };

export type DeleteBrandEquipmentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteBrandEquipmentMutation = { __typename?: 'Mutation', deleteBrandEquipment: boolean };

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

export type GetLeasingCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLeasingCompaniesQuery = { __typename?: 'Query', leasingCompanies: Array<{ __typename?: 'LeasingCompany', id: string, name: string }> };

export type CalculationItemFragment = { __typename?: 'CarRequestCalculationItem', id: string, itemType: CarRequestCalculationItemType, name: string, description?: string | null, priceImpact?: number | null, isRequired: boolean, isIncluded: boolean, displayOrder: number, createdAt: any, catalogColor?: { __typename?: 'CatalogColor', id: string, name: string, color?: string | null } | null };

export type CalculationOfferFragment = { __typename?: 'CarRequestCalculationOffer', id: string, status: CarRequestCalculationOfferStatus, monthlyPayment?: number | null, downPayment?: number | null, totalPrice?: number | null, interestRate?: number | null, adminFee?: number | null, includesService?: boolean | null, includesWinterTires?: boolean | null, includesGap?: boolean | null, includesAssistance?: boolean | null, termsAndConditions?: string | null, validUntil?: any | null, notes?: string | null, quotedAt?: any | null, createdAt: any, updatedAt: any, leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, logo?: { __typename?: 'File', id: string, url: string } | null }, quotedBy?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null };

export type CalculationFragment = { __typename?: 'CarRequestCalculation', id: string, version: number, status: CarRequestCalculationStatus, durationMonths: number, annualMileageKm: number, deliveryExpectedAt?: any | null, notes?: string | null, internalNotes?: string | null, createdAt: any, updatedAt: any, submittedAt?: any | null, completedAt?: any | null, requestedBy: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, assignedTo?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null };

export type GetCalculationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCalculationQuery = { __typename?: 'Query', calculation?: { __typename?: 'CarRequestCalculation', id: string, version: number, status: CarRequestCalculationStatus, durationMonths: number, annualMileageKm: number, deliveryExpectedAt?: any | null, notes?: string | null, internalNotes?: string | null, createdAt: any, updatedAt: any, submittedAt?: any | null, completedAt?: any | null, carRequest: { __typename?: 'CarRequest', id: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string } | null, model?: { __typename?: 'CatalogModel', id: string, name: string } | null }, offers: Array<{ __typename?: 'CarRequestCalculationOffer', id: string, status: CarRequestCalculationOfferStatus, monthlyPayment?: number | null, downPayment?: number | null, totalPrice?: number | null, interestRate?: number | null, adminFee?: number | null, includesService?: boolean | null, includesWinterTires?: boolean | null, includesGap?: boolean | null, includesAssistance?: boolean | null, termsAndConditions?: string | null, validUntil?: any | null, notes?: string | null, quotedAt?: any | null, createdAt: any, updatedAt: any, leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, logo?: { __typename?: 'File', id: string, url: string } | null }, quotedBy?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }>, items: Array<{ __typename?: 'CarRequestCalculationItem', id: string, itemType: CarRequestCalculationItemType, name: string, description?: string | null, priceImpact?: number | null, isRequired: boolean, isIncluded: boolean, displayOrder: number, createdAt: any, catalogColor?: { __typename?: 'CatalogColor', id: string, name: string, color?: string | null } | null }>, requestedBy: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, assignedTo?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null } | null };

export type GetCalculationsByCarRequestQueryVariables = Exact<{
  carRequestId: Scalars['ID']['input'];
}>;


export type GetCalculationsByCarRequestQuery = { __typename?: 'Query', calculationsByCarRequest: Array<{ __typename?: 'CarRequestCalculation', id: string, version: number, status: CarRequestCalculationStatus, durationMonths: number, annualMileageKm: number, deliveryExpectedAt?: any | null, notes?: string | null, internalNotes?: string | null, createdAt: any, updatedAt: any, submittedAt?: any | null, completedAt?: any | null, offers: Array<{ __typename?: 'CarRequestCalculationOffer', id: string, status: CarRequestCalculationOfferStatus, leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string } }>, items: Array<{ __typename?: 'CarRequestCalculationItem', id: string, itemType: CarRequestCalculationItemType, name: string }>, requestedBy: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, assignedTo?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }> };

export type GetPendingCalculationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPendingCalculationsQuery = { __typename?: 'Query', pendingCalculations: Array<{ __typename?: 'CarRequestCalculation', id: string, version: number, status: CarRequestCalculationStatus, durationMonths: number, annualMileageKm: number, deliveryExpectedAt?: any | null, notes?: string | null, internalNotes?: string | null, createdAt: any, updatedAt: any, submittedAt?: any | null, completedAt?: any | null, carRequest: { __typename?: 'CarRequest', id: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string } | null, model?: { __typename?: 'CatalogModel', id: string, name: string } | null, customer?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }, offers: Array<{ __typename?: 'CarRequestCalculationOffer', id: string, status: CarRequestCalculationOfferStatus, leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string } }>, requestedBy: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, assignedTo?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }> };

export type CreateCalculationMutationVariables = Exact<{
  input: CreateCalculationInput;
}>;


export type CreateCalculationMutation = { __typename?: 'Mutation', createCalculation: { __typename?: 'CarRequestCalculation', id: string, version: number, status: CarRequestCalculationStatus, durationMonths: number, annualMileageKm: number, deliveryExpectedAt?: any | null, notes?: string | null, internalNotes?: string | null, createdAt: any, updatedAt: any, submittedAt?: any | null, completedAt?: any | null, requestedBy: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, assignedTo?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null } };

export type UpdateCalculationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateCalculationInput;
}>;


export type UpdateCalculationMutation = { __typename?: 'Mutation', updateCalculation: { __typename?: 'CarRequestCalculation', id: string, version: number, status: CarRequestCalculationStatus, durationMonths: number, annualMileageKm: number, deliveryExpectedAt?: any | null, notes?: string | null, internalNotes?: string | null, createdAt: any, updatedAt: any, submittedAt?: any | null, completedAt?: any | null, requestedBy: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, assignedTo?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null } };

export type SubmitCalculationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SubmitCalculationMutation = { __typename?: 'Mutation', submitCalculation: { __typename?: 'CarRequestCalculation', id: string, version: number, status: CarRequestCalculationStatus, durationMonths: number, annualMileageKm: number, deliveryExpectedAt?: any | null, notes?: string | null, internalNotes?: string | null, createdAt: any, updatedAt: any, submittedAt?: any | null, completedAt?: any | null, requestedBy: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, assignedTo?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null } };

export type StartProcessingCalculationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StartProcessingCalculationMutation = { __typename?: 'Mutation', startProcessingCalculation: { __typename?: 'CarRequestCalculation', id: string, version: number, status: CarRequestCalculationStatus, durationMonths: number, annualMileageKm: number, deliveryExpectedAt?: any | null, notes?: string | null, internalNotes?: string | null, createdAt: any, updatedAt: any, submittedAt?: any | null, completedAt?: any | null, requestedBy: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, assignedTo?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null } };

export type CompleteCalculationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompleteCalculationMutation = { __typename?: 'Mutation', completeCalculation: { __typename?: 'CarRequestCalculation', id: string, version: number, status: CarRequestCalculationStatus, durationMonths: number, annualMileageKm: number, deliveryExpectedAt?: any | null, notes?: string | null, internalNotes?: string | null, createdAt: any, updatedAt: any, submittedAt?: any | null, completedAt?: any | null, requestedBy: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, assignedTo?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null } };

export type AddOfferQuoteMutationVariables = Exact<{
  input: AddOfferQuoteInput;
}>;


export type AddOfferQuoteMutation = { __typename?: 'Mutation', addOfferQuote: { __typename?: 'CarRequestCalculationOffer', id: string, status: CarRequestCalculationOfferStatus, monthlyPayment?: number | null, downPayment?: number | null, totalPrice?: number | null, interestRate?: number | null, adminFee?: number | null, includesService?: boolean | null, includesWinterTires?: boolean | null, includesGap?: boolean | null, includesAssistance?: boolean | null, termsAndConditions?: string | null, validUntil?: any | null, notes?: string | null, quotedAt?: any | null, createdAt: any, updatedAt: any, leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, logo?: { __typename?: 'File', id: string, url: string } | null }, quotedBy?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null } };

export type UpdateOfferQuoteMutationVariables = Exact<{
  offerId: Scalars['ID']['input'];
  input: UpdateOfferQuoteInput;
}>;


export type UpdateOfferQuoteMutation = { __typename?: 'Mutation', updateOfferQuote: { __typename?: 'CarRequestCalculationOffer', id: string, status: CarRequestCalculationOfferStatus, monthlyPayment?: number | null, downPayment?: number | null, totalPrice?: number | null, interestRate?: number | null, adminFee?: number | null, includesService?: boolean | null, includesWinterTires?: boolean | null, includesGap?: boolean | null, includesAssistance?: boolean | null, termsAndConditions?: string | null, validUntil?: any | null, notes?: string | null, quotedAt?: any | null, createdAt: any, updatedAt: any, leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, logo?: { __typename?: 'File', id: string, url: string } | null }, quotedBy?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null } };

export type DeleteCalculationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCalculationMutation = { __typename?: 'Mutation', deleteCalculation: boolean };

export type CarRequestsDashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type CarRequestsDashboardStatsQuery = { __typename?: 'Query', carRequestsDashboardStats: { __typename?: 'DashboardStats', overview: { __typename?: 'DashboardOverviewStats', activeCarRequests: number, totalVehicles: number, awaitingAction: number, completedOnboardingsThisMonth: number, activeCarRequestsChange: number, totalVehiclesChange: number }, topBrands: Array<{ __typename?: 'BrandStats', brandId: string, brandName: string, calculationsCount: number, percentage: number }>, agentPerformance: Array<{ __typename?: 'AgentPerformance', agentId: string, agentName: string, carRequestsCount: number, vehiclesCount: number, conversionRate?: number | null, averageProcessingDays?: number | null }>, leasingCompanies: Array<{ __typename?: 'LeasingCompanyStats', leasingCompanyId: string, leasingCompanyName: string, calculationsCount: number, completedOnboardingsCount: number, conversionRate?: number | null }>, timeline: Array<{ __typename?: 'TimelineDataPoint', date: string, newCarRequests: number, completedOnboardings: number }>, funnel: { __typename?: 'VehicleFunnelStats', created: number, hasOffers: number, leasingCompanySelected: number, onboardingComplete: number, ordered: number } } };

export type GetAllCarRequestsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllCarRequestsQuery = { __typename?: 'Query', allCarRequests: Array<{ __typename?: 'CarRequest', id: string, isFromLegacySystem: boolean, legacySystemId?: string | null, createdAt: any, modifiedAt: any, notes?: string | null, financingType: FinancingType, requestEmail?: string | null, requestPhone?: string | null, requestFirstName?: string | null, requestLastName?: string | null, requestNewsletter?: boolean | null, requestPostalCode?: string | null, customerId?: string | null, assignedAgentId?: string | null, brandId?: string | null, modelId?: string | null, leasingCompanyId?: string | null, order?: number | null, gclid?: string | null, noteInternal?: string | null, completedAt?: any | null, nextCallAt?: any | null, confirmedAt?: any | null, relayedAt?: any | null, feedbackAt?: any | null, closedAt?: any | null, waitingForOffer?: boolean | null, offersSentAt?: any | null, deliveryExpectedAt?: any | null, carDelivered?: boolean | null, displayOrder: number, cancellationReason?: CancellationReason | null, cancellationNote?: string | null, statusId?: string | null, stateId?: string | null, customer?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, assignedAgent?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null, model?: { __typename?: 'CatalogModel', id: string, name: string, slug: string } | null, leasingCompany?: { __typename?: 'LeasingCompany', id: string, name: string } | null, status?: { __typename?: 'CarRequestStatus', id: string, name: string, code: string, colorHex?: string | null, isFinal: boolean } | null, state?: { __typename?: 'CarRequestState', id: string, name: string, code: string, colorHex?: string | null } | null }> };

export type GetCarRequestQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCarRequestQuery = { __typename?: 'Query', carRequest: { __typename?: 'CarRequest', id: string, isFromLegacySystem: boolean, legacySystemId?: string | null, createdAt: any, modifiedAt: any, notes?: string | null, financingType: FinancingType, requestEmail?: string | null, requestPhone?: string | null, requestFirstName?: string | null, requestLastName?: string | null, requestNewsletter?: boolean | null, requestPostalCode?: string | null, customerId?: string | null, assignedAgentId?: string | null, brandId?: string | null, modelId?: string | null, leasingCompanyId?: string | null, order?: number | null, gclid?: string | null, noteInternal?: string | null, completedAt?: any | null, nextCallAt?: any | null, confirmedAt?: any | null, relayedAt?: any | null, feedbackAt?: any | null, closedAt?: any | null, waitingForOffer?: boolean | null, offersSentAt?: any | null, deliveryExpectedAt?: any | null, carDelivered?: boolean | null, displayOrder: number, cancellationReason?: CancellationReason | null, cancellationNote?: string | null, statusId?: string | null, stateId?: string | null, customer?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, assignedAgent?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null, model?: { __typename?: 'CatalogModel', id: string, name: string, slug: string } | null, leasingCompany?: { __typename?: 'LeasingCompany', id: string, name: string } | null, status?: { __typename?: 'CarRequestStatus', id: string, name: string, code: string, colorHex?: string | null, isFinal: boolean } | null, state?: { __typename?: 'CarRequestState', id: string, name: string, code: string, colorHex?: string | null } | null, logs?: Array<{ __typename?: 'CarRequestLog', id: string, createdAt: any, message: string, actionType: CarRequestLogAction, metadata?: any | null, carRequestId: string, authorId?: string | null, legacySystemId?: string | null, author?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }> | null } };

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

export type GetAllCarRequestStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCarRequestStatesQuery = { __typename?: 'Query', allCarRequestStates: Array<{ __typename?: 'CarRequestState', id: string, name: string, code: string, colorHex?: string | null, createdAt: any, updatedAt: any }> };

export type GetAllCarRequestStatusesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCarRequestStatusesQuery = { __typename?: 'Query', allCarRequestStatuses: Array<{ __typename?: 'CarRequestStatus', id: string, name: string, code: string, colorHex?: string | null, isFinal: boolean, displayOrder: number, columnDisplayOrder: number, createdAt: any, updatedAt: any }> };

export type GetCarRequestLogsQueryVariables = Exact<{
  filter: CarRequestLogFilterInput;
}>;


export type GetCarRequestLogsQuery = { __typename?: 'Query', carRequestLogs: Array<{ __typename?: 'CarRequestLog', id: string, createdAt: any, message: string, actionType: CarRequestLogAction, metadata?: any | null, carRequestId: string, authorId?: string | null, legacySystemId?: string | null, author?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }> };

export type CreateCarRequestLogMutationVariables = Exact<{
  input: CreateCarRequestLogInput;
}>;


export type CreateCarRequestLogMutation = { __typename?: 'Mutation', createCarRequestLog: { __typename?: 'CarRequestLog', id: string, createdAt: any, message: string, actionType: CarRequestLogAction, metadata?: any | null, carRequestId: string, authorId?: string | null, legacySystemId?: string | null, author?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null } };

export type GetAllOffersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOffersQuery = { __typename?: 'Query', allOffers: Array<{ __typename?: 'Offer', id: string, type: OfferType, isPublic: boolean, isActive: boolean, totalPrice: number, description?: string | null, slug?: string | null, leasingDurationMonths?: number | null, monthlyPayment?: number | null, annualMileageLimit?: number | null, downPaymentLeasing?: number | null, hasServiceIncluded?: boolean | null, hasWinterTyresIncluded?: boolean | null, hasAssistanceServiceIncluded?: boolean | null, hasGapIncluded?: boolean | null, discountAmount?: number | null, discountPercentage?: number | null, includesWarranty?: boolean | null, warrantyYears?: number | null, financingAvailable?: boolean | null, createdAt: any, updatedAt: any, modelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string }, brand?: { __typename?: 'CatalogBrand', id: string, name: string } | null, model?: { __typename?: 'CatalogModel', id: string, name: string } | null }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, roles: Array<UserRole> }> };

export type GetAllCatalogColorsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<CatalogColorType>;
}>;


export type GetAllCatalogColorsQuery = { __typename?: 'Query', catalogColors: Array<{ __typename?: 'CatalogColor', id: string, name: string, slug: string, color?: string | null, type: CatalogColorType, legacySystemId?: string | null, createdAt: any }> };

export type GetCatalogColorQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCatalogColorQuery = { __typename?: 'Query', catalogColor: { __typename?: 'CatalogColor', id: string, name: string, slug: string, color?: string | null, type: CatalogColorType, legacySystemId?: string | null, createdAt: any } };

export type CreateCatalogColorMutationVariables = Exact<{
  input: CreateCatalogColorInput;
}>;


export type CreateCatalogColorMutation = { __typename?: 'Mutation', createCatalogColor: { __typename?: 'CatalogColor', id: string, name: string, slug: string, color?: string | null, type: CatalogColorType, legacySystemId?: string | null, createdAt: any } };

export type UpdateCatalogColorMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogColorInput;
}>;


export type UpdateCatalogColorMutation = { __typename?: 'Mutation', updateCatalogColor: { __typename?: 'CatalogColor', id: string, name: string, slug: string, color?: string | null, type: CatalogColorType, legacySystemId?: string | null, createdAt: any } };

export type DeleteCatalogColorMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCatalogColorMutation = { __typename?: 'Mutation', deleteCatalogColor: boolean };

export type GetCustomerDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCustomerDetailQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, phone?: string | null, bio?: string | null, roles: Array<UserRole>, isActive: boolean, createdAt: any, updatedAt: any, avatar?: { __typename?: 'File', id: string, url: string } | null } };

export type GetOnboardingsWithDocumentsQueryVariables = Exact<{
  status?: InputMaybe<OnboardingStatus>;
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOnboardingsWithDocumentsQuery = { __typename?: 'Query', allOnboardings: Array<{ __typename?: 'Onboarding', id: string, token: string, status: OnboardingStatus, expiresAt: any, completedAt?: any | null, createdAt: any, updatedAt: any, carRequest: { __typename?: 'CarRequest', id: string, requestFirstName?: string | null, requestLastName?: string | null, requestEmail?: string | null, customer?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }, leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, logo?: { __typename?: 'File', id: string, url: string } | null }, documents?: Array<{ __typename?: 'OnboardingDocument', id: string, uploadedAt: any, updatedAt: any, validationStatus: DocumentValidationStatus, validationNote?: string | null, validatedAt?: any | null, file: { __typename?: 'File', id: string, name: string, url: string, size: number, mimeType: string }, documentTemplate: { __typename?: 'DocumentTemplate', id: string, name: string, fieldName: string }, validatedBy?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null }> | null }> };

export type GetUserActivityQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetUserActivityQuery = { __typename?: 'Query', userActivity: Array<{ __typename?: 'AuditLog', id: string, action: AuditAction, entityName: string, entityId: string, changes?: any | null, userId?: string | null, userEmail?: string | null, ipAddress?: string | null, userAgent?: string | null, createdAt: any }> };

export type GetCarRequestsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarRequestsCountQuery = { __typename?: 'Query', carRequestsCount: number };

export type GetAllCustomersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllCustomersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, phone?: string | null, roles: Array<UserRole>, isActive: boolean, createdAt: any, updatedAt: any, avatar?: { __typename?: 'File', id: string, url: string } | null }> };

export type GetCustomerQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCustomerQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, phone?: string | null, bio?: string | null, roles: Array<UserRole>, isActive: boolean, createdAt: any, updatedAt: any, avatar?: { __typename?: 'File', id: string, url: string } | null } };

export type SearchCustomersQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SearchCustomersQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, phone?: string | null, roles: Array<UserRole>, isActive: boolean, createdAt: any, updatedAt: any, avatar?: { __typename?: 'File', id: string, url: string } | null }> };

export type GetAllDocumentTemplatesQueryVariables = Exact<{
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllDocumentTemplatesQuery = { __typename?: 'Query', allDocumentTemplates: Array<{ __typename?: 'DocumentTemplate', id: string, name: string, fieldName: string, description?: string | null, helpText?: string | null, isRequired: boolean, acceptedFormats: Array<string>, maxSizeBytes: number, displayOrder: number, isGlobal: boolean, createdAt: any, updatedAt: any, leasingCompany?: { __typename?: 'LeasingCompany', id: string, name: string } | null }> };

export type GetDocumentTemplatesByLeasingCompanyQueryVariables = Exact<{
  leasingCompanyId: Scalars['String']['input'];
}>;


export type GetDocumentTemplatesByLeasingCompanyQuery = { __typename?: 'Query', documentTemplatesByLeasingCompany: Array<{ __typename?: 'DocumentTemplate', id: string, name: string, fieldName: string, description?: string | null, helpText?: string | null, isRequired: boolean, acceptedFormats: Array<string>, maxSizeBytes: number, displayOrder: number, createdAt: any, updatedAt: any }> };

export type GetDocumentTemplateQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetDocumentTemplateQuery = { __typename?: 'Query', documentTemplate: { __typename?: 'DocumentTemplate', id: string, name: string, fieldName: string, description?: string | null, helpText?: string | null, isRequired: boolean, acceptedFormats: Array<string>, maxSizeBytes: number, displayOrder: number, isGlobal: boolean, createdAt: any, updatedAt: any, leasingCompany?: { __typename?: 'LeasingCompany', id: string, name: string } | null } };

export type CreateDocumentTemplateMutationVariables = Exact<{
  input: CreateDocumentTemplateInput;
}>;


export type CreateDocumentTemplateMutation = { __typename?: 'Mutation', createDocumentTemplate: { __typename?: 'DocumentTemplate', id: string, name: string, fieldName: string, description?: string | null, helpText?: string | null, isRequired: boolean, acceptedFormats: Array<string>, maxSizeBytes: number, displayOrder: number, createdAt: any } };

export type UpdateDocumentTemplateMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateDocumentTemplateInput;
}>;


export type UpdateDocumentTemplateMutation = { __typename?: 'Mutation', updateDocumentTemplate: { __typename?: 'DocumentTemplate', id: string, name: string, fieldName: string, description?: string | null, helpText?: string | null, isRequired: boolean, acceptedFormats: Array<string>, maxSizeBytes: number, displayOrder: number, updatedAt: any } };

export type DeleteDocumentTemplateMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteDocumentTemplateMutation = { __typename?: 'Mutation', deleteDocumentTemplate: boolean };

export type ReorderDocumentTemplatesMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type ReorderDocumentTemplatesMutation = { __typename?: 'Mutation', reorderDocumentTemplates: boolean };

export type GetAllEnginesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  generationId?: InputMaybe<Scalars['String']['input']>;
  fuelType?: InputMaybe<CatalogEngineFuelType>;
  transmissionType?: InputMaybe<CatalogEngineTransmissionType>;
  driveType?: InputMaybe<CatalogEngineDriveType>;
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  recommendedOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAllEnginesQuery = { __typename?: 'Query', allEngines: Array<{ __typename?: 'CatalogEngine', id: string, name: string, generationId: string, fuelType?: CatalogEngineFuelType | null, transmissionType?: CatalogEngineTransmissionType | null, driveType?: CatalogEngineDriveType | null, consumptionCombined?: number | null, consumptionCity?: number | null, consumptionOutOfCity?: number | null, performance?: number | null, torque?: number | null, volume?: number | null, emission?: number | null, rangeKm?: number | null, acceleration?: number | null, fuelTankVolume?: number | null, cylinderCount?: number | null, maxSpeed?: number | null, weight?: number | null, gearsCount?: number | null, productionStart?: any | null, productionStop?: any | null, active: boolean, recommended: boolean, generation: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } } }> };

export type GetEngineQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetEngineQuery = { __typename?: 'Query', engine: { __typename?: 'CatalogEngine', id: string, name: string, generationId: string, fuelType?: CatalogEngineFuelType | null, transmissionType?: CatalogEngineTransmissionType | null, driveType?: CatalogEngineDriveType | null, consumptionCombined?: number | null, consumptionCity?: number | null, consumptionOutOfCity?: number | null, performance?: number | null, torque?: number | null, volume?: number | null, emission?: number | null, rangeKm?: number | null, acceleration?: number | null, fuelTankVolume?: number | null, cylinderCount?: number | null, maxSpeed?: number | null, weight?: number | null, gearsCount?: number | null, productionStart?: any | null, productionStop?: any | null, active: boolean, recommended: boolean, generation: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null, model: { __typename?: 'CatalogModel', id: string, name: string, slug: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string, slug: string } | null } } } };

export type GetEnginesByGenerationQueryVariables = Exact<{
  generationId: Scalars['String']['input'];
}>;


export type GetEnginesByGenerationQuery = { __typename?: 'Query', allEngines: Array<{ __typename?: 'CatalogEngine', id: string, name: string, fuelType?: CatalogEngineFuelType | null, transmissionType?: CatalogEngineTransmissionType | null, driveType?: CatalogEngineDriveType | null, performance?: number | null, torque?: number | null, acceleration?: number | null, active: boolean, recommended: boolean }> };

export type GetEnginesCountQueryVariables = Exact<{
  generationId?: InputMaybe<Scalars['String']['input']>;
  fuelType?: InputMaybe<CatalogEngineFuelType>;
}>;


export type GetEnginesCountQuery = { __typename?: 'Query', enginesCount: number };

export type SearchEnginesQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SearchEnginesQuery = { __typename?: 'Query', searchEngines: Array<{ __typename?: 'CatalogEngine', id: string, name: string, fuelType?: CatalogEngineFuelType | null, transmissionType?: CatalogEngineTransmissionType | null, driveType?: CatalogEngineDriveType | null, generation: { __typename?: 'CatalogModelGeneration', id: string, name: string, model: { __typename?: 'CatalogModel', id: string, name: string, brand?: { __typename?: 'CatalogBrand', id: string, name: string } | null } } }> };

export type CreateEngineMutationVariables = Exact<{
  input: CreateCatalogEngineInput;
}>;


export type CreateEngineMutation = { __typename?: 'Mutation', createEngine: { __typename?: 'CatalogEngine', id: string, name: string, generationId: string, fuelType?: CatalogEngineFuelType | null, transmissionType?: CatalogEngineTransmissionType | null, driveType?: CatalogEngineDriveType | null, consumptionCombined?: number | null, consumptionCity?: number | null, consumptionOutOfCity?: number | null, performance?: number | null, torque?: number | null, volume?: number | null, emission?: number | null, rangeKm?: number | null, acceleration?: number | null, fuelTankVolume?: number | null, cylinderCount?: number | null, maxSpeed?: number | null, weight?: number | null, gearsCount?: number | null, productionStart?: any | null, productionStop?: any | null, active: boolean, recommended: boolean, generation: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null } } };

export type UpdateEngineMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogEngineInput;
}>;


export type UpdateEngineMutation = { __typename?: 'Mutation', updateEngine: { __typename?: 'CatalogEngine', id: string, name: string, generationId: string, fuelType?: CatalogEngineFuelType | null, transmissionType?: CatalogEngineTransmissionType | null, driveType?: CatalogEngineDriveType | null, consumptionCombined?: number | null, consumptionCity?: number | null, consumptionOutOfCity?: number | null, performance?: number | null, torque?: number | null, volume?: number | null, emission?: number | null, rangeKm?: number | null, acceleration?: number | null, fuelTankVolume?: number | null, cylinderCount?: number | null, maxSpeed?: number | null, weight?: number | null, gearsCount?: number | null, productionStart?: any | null, productionStop?: any | null, active: boolean, recommended: boolean, generation: { __typename?: 'CatalogModelGeneration', id: string, name: string, slug?: string | null } } };

export type DeleteEngineMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteEngineMutation = { __typename?: 'Mutation', deleteEngine: boolean };

export type GetAllEquipmentItemsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllEquipmentItemsQuery = { __typename?: 'Query', allEquipmentItems: Array<{ __typename?: 'CatalogBrandEquipmentItem', id: string, name: string, legacySystemId?: string | null, createdAt: any, updatedAt?: any | null }> };

export type GetEquipmentItemQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetEquipmentItemQuery = { __typename?: 'Query', equipmentItem: { __typename?: 'CatalogBrandEquipmentItem', id: string, name: string, legacySystemId?: string | null, createdAt: any, updatedAt?: any | null } };

export type SearchEquipmentItemsQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SearchEquipmentItemsQuery = { __typename?: 'Query', searchEquipmentItems: Array<{ __typename?: 'CatalogBrandEquipmentItem', id: string, name: string, legacySystemId?: string | null }> };

export type GetEquipmentItemsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEquipmentItemsCountQuery = { __typename?: 'Query', equipmentItemsCount: number };

export type CreateEquipmentItemMutationVariables = Exact<{
  input: CreateCatalogBrandEquipmentItemInput;
}>;


export type CreateEquipmentItemMutation = { __typename?: 'Mutation', createEquipmentItem: { __typename?: 'CatalogBrandEquipmentItem', id: string, name: string, legacySystemId?: string | null, createdAt: any, updatedAt?: any | null } };

export type UpdateEquipmentItemMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogBrandEquipmentItemInput;
}>;


export type UpdateEquipmentItemMutation = { __typename?: 'Mutation', updateEquipmentItem: { __typename?: 'CatalogBrandEquipmentItem', id: string, name: string, legacySystemId?: string | null, createdAt: any, updatedAt?: any | null } };

export type DeleteEquipmentItemMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteEquipmentItemMutation = { __typename?: 'Mutation', deleteEquipmentItem: boolean };

export type GetCatalogEquipmentByGenerationQueryVariables = Exact<{
  modelGenerationId: Scalars['String']['input'];
}>;


export type GetCatalogEquipmentByGenerationQuery = { __typename?: 'Query', catalogEquipmentByModelGenerationId: Array<{ __typename?: 'CatalogEquipment', id: string, name: string, active?: boolean | null, standard: boolean, customText?: string | null, createdAt: any, modelGenerationId?: string | null, categoryId?: string | null, category?: { __typename?: 'CatalogEquipmentItemCategory', id: string, name: string } | null, items?: Array<{ __typename?: 'CatalogEquipmentItem', id: string, name: string }> | null }> };

export type GetAllCatalogEquipmentQueryVariables = Exact<{
  limit: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
  modelGenerationId?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  standard?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAllCatalogEquipmentQuery = { __typename?: 'Query', catalogEquipment: Array<{ __typename?: 'CatalogEquipment', id: string, name: string, active?: boolean | null, standard: boolean, customText?: string | null, createdAt: any, modelGenerationId?: string | null, categoryId?: string | null, category?: { __typename?: 'CatalogEquipmentItemCategory', id: string, name: string } | null, items?: Array<{ __typename?: 'CatalogEquipmentItem', id: string, name: string }> | null }> };

export type GetCatalogEquipmentByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCatalogEquipmentByIdQuery = { __typename?: 'Query', catalogEquipmentById: { __typename?: 'CatalogEquipment', id: string, name: string, active?: boolean | null, standard: boolean, customText?: string | null, createdAt: any, modelGenerationId?: string | null, categoryId?: string | null, category?: { __typename?: 'CatalogEquipmentItemCategory', id: string, name: string } | null, items?: Array<{ __typename?: 'CatalogEquipmentItem', id: string, name: string }> | null } };

export type SearchCatalogEquipmentQueryVariables = Exact<{
  query: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SearchCatalogEquipmentQuery = { __typename?: 'Query', searchCatalogEquipment: Array<{ __typename?: 'CatalogEquipment', id: string, name: string, active?: boolean | null, standard: boolean, customText?: string | null, createdAt: any, modelGenerationId?: string | null, categoryId?: string | null, category?: { __typename?: 'CatalogEquipmentItemCategory', id: string, name: string } | null }> };

export type CreateCatalogEquipmentMutationVariables = Exact<{
  input: CreateCatalogEquipmentInput;
}>;


export type CreateCatalogEquipmentMutation = { __typename?: 'Mutation', createCatalogEquipment: { __typename?: 'CatalogEquipment', id: string, name: string, active?: boolean | null, standard: boolean, customText?: string | null, createdAt: any, modelGenerationId?: string | null, categoryId?: string | null, category?: { __typename?: 'CatalogEquipmentItemCategory', id: string, name: string } | null, items?: Array<{ __typename?: 'CatalogEquipmentItem', id: string, name: string }> | null } };

export type UpdateCatalogEquipmentMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCatalogEquipmentInput;
}>;


export type UpdateCatalogEquipmentMutation = { __typename?: 'Mutation', updateCatalogEquipment: { __typename?: 'CatalogEquipment', id: string, name: string, active?: boolean | null, standard: boolean, customText?: string | null, createdAt: any, modelGenerationId?: string | null, categoryId?: string | null, category?: { __typename?: 'CatalogEquipmentItemCategory', id: string, name: string } | null, items?: Array<{ __typename?: 'CatalogEquipmentItem', id: string, name: string }> | null } };

export type DeleteCatalogEquipmentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCatalogEquipmentMutation = { __typename?: 'Mutation', deleteCatalogEquipment: boolean };

export type GetEquipmentItemCategoriesQueryVariables = Exact<{
  limit: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
}>;


export type GetEquipmentItemCategoriesQuery = { __typename?: 'Query', catalogEquipmentItemCategories: Array<{ __typename?: 'CatalogEquipmentItemCategory', id: string, name: string }> };

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

export type GetAllVehicleOffersQueryVariables = Exact<{
  filters?: InputMaybe<OfferFiltersInput>;
}>;


export type GetAllVehicleOffersQuery = { __typename?: 'Query', allOffers: Array<{ __typename: 'Offer', id: string, type: OfferType, isPublic: boolean, isActive: boolean, totalPrice: number, description?: string | null, slug?: string | null, modelGenerationId: string, brandId?: string | null, modelId?: string | null, createdAt: any, updatedAt: any, leasingDurationMonths?: number | null, monthlyPayment?: number | null, annualMileageLimit?: number | null, downPaymentLeasing?: number | null, hasServiceIncluded?: boolean | null, hasWinterTyresIncluded?: boolean | null, hasAssistanceServiceIncluded?: boolean | null, hasGapIncluded?: boolean | null, discountAmount?: number | null, discountPercentage?: number | null, includesWarranty?: boolean | null, warrantyYears?: number | null, financingAvailable?: boolean | null, customerId?: string | null, status?: IndividualOfferStatus | null, customRequirements?: string | null, internalNotes?: string | null, assignedToId?: string | null, responseDeadline?: any | null, modelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string } }> };

export type GetOfferQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOfferQuery = { __typename?: 'Query', offer: { __typename: 'Offer', id: string, type: OfferType, isPublic: boolean, isActive: boolean, totalPrice: number, description?: string | null, slug?: string | null, modelGenerationId: string, brandId?: string | null, modelId?: string | null, createdAt: any, updatedAt: any, leasingDurationMonths?: number | null, monthlyPayment?: number | null, annualMileageLimit?: number | null, downPaymentLeasing?: number | null, hasServiceIncluded?: boolean | null, hasWinterTyresIncluded?: boolean | null, hasAssistanceServiceIncluded?: boolean | null, hasGapIncluded?: boolean | null, discountAmount?: number | null, discountPercentage?: number | null, includesWarranty?: boolean | null, warrantyYears?: number | null, financingAvailable?: boolean | null, customerId?: string | null, status?: IndividualOfferStatus | null, customRequirements?: string | null, internalNotes?: string | null, assignedToId?: string | null, responseDeadline?: any | null, modelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string } } };

export type GetIndividualOffersQueryVariables = Exact<{
  filters?: InputMaybe<OfferFiltersInput>;
}>;


export type GetIndividualOffersQuery = { __typename?: 'Query', individualOffers: Array<{ __typename: 'IndividualOffer', id: string, type: OfferType, isPublic: boolean, isActive: boolean, totalPrice: number, description?: string | null, slug?: string | null, modelGenerationId: string, brandId?: string | null, modelId?: string | null, createdAt: any, updatedAt: any, customerId?: string | null, status?: IndividualOfferStatus | null, customRequirements?: string | null, internalNotes?: string | null, assignedToId?: string | null, responseDeadline?: any | null, modelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string } }> };

export type CreateOperationalLeasingOfferMutationVariables = Exact<{
  input: CreateOperationalLeasingOfferInput;
}>;


export type CreateOperationalLeasingOfferMutation = { __typename?: 'Mutation', createOperationalLeasingOffer: { __typename: 'OperationalLeasingOffer', id: string, type: OfferType, isPublic: boolean, isActive: boolean, totalPrice: number, description?: string | null, slug?: string | null, modelGenerationId: string, brandId?: string | null, modelId?: string | null, createdAt: any, updatedAt: any, leasingDurationMonths?: number | null, monthlyPayment?: number | null, annualMileageLimit?: number | null, downPaymentLeasing?: number | null, hasServiceIncluded?: boolean | null, hasWinterTyresIncluded?: boolean | null, hasAssistanceServiceIncluded?: boolean | null, hasGapIncluded?: boolean | null, modelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string } } };

export type CreateDirectPurchaseOfferMutationVariables = Exact<{
  input: CreateDirectPurchaseOfferInput;
}>;


export type CreateDirectPurchaseOfferMutation = { __typename?: 'Mutation', createDirectPurchaseOffer: { __typename: 'DirectPurchaseOffer', id: string, type: OfferType, isPublic: boolean, isActive: boolean, totalPrice: number, description?: string | null, slug?: string | null, modelGenerationId: string, brandId?: string | null, modelId?: string | null, createdAt: any, updatedAt: any, discountAmount?: number | null, discountPercentage?: number | null, includesWarranty?: boolean | null, warrantyYears?: number | null, financingAvailable?: boolean | null, modelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string } } };

export type CreateIndividualOfferMutationVariables = Exact<{
  input: CreateIndividualOfferInput;
}>;


export type CreateIndividualOfferMutation = { __typename?: 'Mutation', createIndividualOffer: { __typename: 'IndividualOffer', id: string, type: OfferType, isPublic: boolean, isActive: boolean, totalPrice: number, description?: string | null, slug?: string | null, modelGenerationId: string, brandId?: string | null, modelId?: string | null, createdAt: any, updatedAt: any, customerId?: string | null, status?: IndividualOfferStatus | null, customRequirements?: string | null, internalNotes?: string | null, assignedToId?: string | null, responseDeadline?: any | null, modelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string } } };

export type UpdateOfferMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateOfferInput;
}>;


export type UpdateOfferMutation = { __typename?: 'Mutation', updateOffer: { __typename: 'Offer', id: string, type: OfferType, isPublic: boolean, isActive: boolean, totalPrice: number, description?: string | null, slug?: string | null, modelGenerationId: string, brandId?: string | null, modelId?: string | null, createdAt: any, updatedAt: any, leasingDurationMonths?: number | null, monthlyPayment?: number | null, annualMileageLimit?: number | null, downPaymentLeasing?: number | null, hasServiceIncluded?: boolean | null, hasWinterTyresIncluded?: boolean | null, hasAssistanceServiceIncluded?: boolean | null, hasGapIncluded?: boolean | null, discountAmount?: number | null, discountPercentage?: number | null, includesWarranty?: boolean | null, warrantyYears?: number | null, financingAvailable?: boolean | null, customerId?: string | null, status?: IndividualOfferStatus | null, customRequirements?: string | null, internalNotes?: string | null, assignedToId?: string | null, responseDeadline?: any | null, modelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string } } };

export type UpdateIndividualOfferStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
  status: IndividualOfferStatus;
}>;


export type UpdateIndividualOfferStatusMutation = { __typename?: 'Mutation', updateIndividualOfferStatus: { __typename: 'IndividualOffer', id: string, type: OfferType, isPublic: boolean, isActive: boolean, totalPrice: number, description?: string | null, slug?: string | null, modelGenerationId: string, brandId?: string | null, modelId?: string | null, createdAt: any, updatedAt: any, customerId?: string | null, status?: IndividualOfferStatus | null, customRequirements?: string | null, internalNotes?: string | null, assignedToId?: string | null, responseDeadline?: any | null, modelGeneration: { __typename?: 'CatalogModelGeneration', id: string, name: string } } };

export type DeleteOfferMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteOfferMutation = { __typename?: 'Mutation', deleteOffer: boolean };

export type GetAllOnboardingsQueryVariables = Exact<{
  status?: InputMaybe<OnboardingStatus>;
  leasingCompanyId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllOnboardingsQuery = { __typename?: 'Query', allOnboardings: Array<{ __typename?: 'Onboarding', id: string, token: string, status: OnboardingStatus, expiresAt: any, completedAt?: any | null, createdAt: any, updatedAt: any, carRequest: { __typename?: 'CarRequest', id: string, requestFirstName?: string | null, requestLastName?: string | null, requestEmail?: string | null, customer?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }, leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, logo?: { __typename?: 'File', id: string, url: string } | null }, documents?: Array<{ __typename?: 'OnboardingDocument', id: string, validationStatus: DocumentValidationStatus }> | null }> };

export type GetOnboardingQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOnboardingQuery = { __typename?: 'Query', onboarding: { __typename?: 'Onboarding', id: string, token: string, status: OnboardingStatus, expiresAt: any, completedAt?: any | null, lastReminderSentAt?: any | null, createdAt: any, updatedAt: any, carRequest: { __typename?: 'CarRequest', id: string, requestFirstName?: string | null, requestLastName?: string | null, requestEmail?: string | null, requestPhone?: string | null, financingType: FinancingType, customer?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, phone?: string | null } | null, brand?: { __typename?: 'CatalogBrand', id: string, name: string } | null, model?: { __typename?: 'CatalogModel', id: string, name: string } | null }, leasingCompany: { __typename?: 'LeasingCompany', id: string, name: string, link?: string | null, logo?: { __typename?: 'File', id: string, url: string } | null }, documents?: Array<{ __typename?: 'OnboardingDocument', id: string, uploadedAt: any, updatedAt: any, validationStatus: DocumentValidationStatus, validationNote?: string | null, validatedAt?: any | null, file: { __typename?: 'File', id: string, name: string, url: string, relativePath: string, size: number, sizeFormatted: string, mimeType: string, extension: string }, documentTemplate: { __typename?: 'DocumentTemplate', id: string, name: string, fieldName: string, description?: string | null, helpText?: string | null, isRequired: boolean, acceptedFormats: Array<string>, maxSizeBytes: number }, validatedBy?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }> | null } };

export type GetRequiredDocumentsForOnboardingQueryVariables = Exact<{
  onboardingId: Scalars['String']['input'];
}>;


export type GetRequiredDocumentsForOnboardingQuery = { __typename?: 'Query', requiredDocumentsForOnboarding: Array<{ __typename?: 'DocumentTemplate', id: string, name: string, fieldName: string, description?: string | null, helpText?: string | null, isRequired: boolean, acceptedFormats: Array<string>, maxSizeBytes: number, displayOrder: number }> };

export type CreateOnboardingMutationVariables = Exact<{
  carRequestId: Scalars['String']['input'];
  expirationDays?: InputMaybe<Scalars['Float']['input']>;
}>;


export type CreateOnboardingMutation = { __typename?: 'Mutation', createOnboarding: { __typename?: 'Onboarding', id: string, token: string, status: OnboardingStatus, expiresAt: any, createdAt: any } };

export type ValidateDocumentMutationVariables = Exact<{
  documentId: Scalars['String']['input'];
  input: ValidateDocumentInput;
}>;


export type ValidateDocumentMutation = { __typename?: 'Mutation', validateDocument: { __typename?: 'OnboardingDocument', id: string, validationStatus: DocumentValidationStatus, validationNote?: string | null, validatedAt?: any | null, validatedBy?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null } };

export type SendOnboardingReminderMutationVariables = Exact<{
  onboardingId: Scalars['String']['input'];
}>;


export type SendOnboardingReminderMutation = { __typename?: 'Mutation', sendOnboardingReminder: boolean };

export type UpdateOnboardingStatusMutationVariables = Exact<{
  onboardingId: Scalars['String']['input'];
  status: OnboardingStatus;
}>;


export type UpdateOnboardingStatusMutation = { __typename?: 'Mutation', updateOnboardingStatus: boolean };

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

export type GetUserAuditLogsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetUserAuditLogsQuery = { __typename?: 'Query', userActivity: Array<{ __typename?: 'AuditLog', id: string, entityName: string, entityId: string, action: AuditAction, oldValue?: any | null, newValue?: any | null, changes?: any | null, userId?: string | null, userEmail?: string | null, ipAddress?: string | null, userAgent?: string | null, metadata?: any | null, createdAt: any }> };

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

export const CalculationItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CalculationItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculationItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceImpact"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"isIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"catalogColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<CalculationItemFragment, unknown>;
export const CalculationOfferFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CalculationOffer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculationOffer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"downPayment"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"interestRate"}},{"kind":"Field","name":{"kind":"Name","value":"adminFee"}},{"kind":"Field","name":{"kind":"Name","value":"includesService"}},{"kind":"Field","name":{"kind":"Name","value":"includesWinterTires"}},{"kind":"Field","name":{"kind":"Name","value":"includesGap"}},{"kind":"Field","name":{"kind":"Name","value":"includesAssistance"}},{"kind":"Field","name":{"kind":"Name","value":"termsAndConditions"}},{"kind":"Field","name":{"kind":"Name","value":"validUntil"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quotedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quotedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CalculationOfferFragment, unknown>;
export const CalculationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Calculation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"durationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageKm"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"requestedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]} as unknown as DocumentNode<CalculationFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ImpersonateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImpersonateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImpersonateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impersonateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"impersonatedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<ImpersonateUserMutation, ImpersonateUserMutationVariables>;
export const StopImpersonationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StopImpersonation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopImpersonation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<StopImpersonationMutation, StopImpersonationMutationVariables>;
export const GetAllBrandEquipmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllBrandEquipments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allBrandEquipments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"brandId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllBrandEquipmentsQuery, GetAllBrandEquipmentsQueryVariables>;
export const GetBrandEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBrandEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brandEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetBrandEquipmentQuery, GetBrandEquipmentQueryVariables>;
export const SearchBrandEquipmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchBrandEquipments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchBrandEquipments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<SearchBrandEquipmentsQuery, SearchBrandEquipmentsQueryVariables>;
export const GetBrandEquipmentsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBrandEquipmentsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brandEquipmentsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"brandId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}}}]}]}}]} as unknown as DocumentNode<GetBrandEquipmentsCountQuery, GetBrandEquipmentsCountQueryVariables>;
export const CreateBrandEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBrandEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogBrandEquipmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBrandEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateBrandEquipmentMutation, CreateBrandEquipmentMutationVariables>;
export const UpdateBrandEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBrandEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogBrandEquipmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBrandEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateBrandEquipmentMutation, UpdateBrandEquipmentMutationVariables>;
export const DeleteBrandEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBrandEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBrandEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteBrandEquipmentMutation, DeleteBrandEquipmentMutationVariables>;
export const GetAllCatalogBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCatalogBrands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCatalogBrands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCatalogBrandsQuery, GetAllCatalogBrandsQueryVariables>;
export const GetCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogBrandQuery, GetCatalogBrandQueryVariables>;
export const CreateCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogBrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCatalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySlug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCatalogBrandMutation, CreateCatalogBrandMutationVariables>;
export const UpdateCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogBrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCatalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isHighlighted"}},{"kind":"Field","name":{"kind":"Name","value":"isRecommended"}},{"kind":"Field","name":{"kind":"Name","value":"logoId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCatalogBrandMutation, UpdateCatalogBrandMutationVariables>;
export const DeleteCatalogBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCatalogBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCatalogBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCatalogBrandMutation, DeleteCatalogBrandMutationVariables>;
export const CheckBrandSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckBrandSlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkBrandSlugAvailability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CheckBrandSlugQuery, CheckBrandSlugQueryVariables>;
export const GetLeasingCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeasingCompanies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leasingCompanies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetLeasingCompaniesQuery, GetLeasingCompaniesQueryVariables>;
export const GetCalculationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCalculation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Calculation"}},{"kind":"Field","name":{"kind":"Name","value":"carRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"offers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CalculationOffer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CalculationItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Calculation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"durationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageKm"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"requestedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CalculationOffer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculationOffer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"downPayment"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"interestRate"}},{"kind":"Field","name":{"kind":"Name","value":"adminFee"}},{"kind":"Field","name":{"kind":"Name","value":"includesService"}},{"kind":"Field","name":{"kind":"Name","value":"includesWinterTires"}},{"kind":"Field","name":{"kind":"Name","value":"includesGap"}},{"kind":"Field","name":{"kind":"Name","value":"includesAssistance"}},{"kind":"Field","name":{"kind":"Name","value":"termsAndConditions"}},{"kind":"Field","name":{"kind":"Name","value":"validUntil"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quotedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quotedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CalculationItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculationItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceImpact"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"isIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"catalogColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<GetCalculationQuery, GetCalculationQueryVariables>;
export const GetCalculationsByCarRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCalculationsByCarRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"carRequestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculationsByCarRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"carRequestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"carRequestId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Calculation"}},{"kind":"Field","name":{"kind":"Name","value":"offers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Calculation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"durationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageKm"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"requestedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]} as unknown as DocumentNode<GetCalculationsByCarRequestQuery, GetCalculationsByCarRequestQueryVariables>;
export const GetPendingCalculationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPendingCalculations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingCalculations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Calculation"}},{"kind":"Field","name":{"kind":"Name","value":"carRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"offers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Calculation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"durationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageKm"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"requestedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]} as unknown as DocumentNode<GetPendingCalculationsQuery, GetPendingCalculationsQueryVariables>;
export const CreateCalculationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCalculation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCalculationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCalculation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Calculation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Calculation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"durationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageKm"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"requestedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]} as unknown as DocumentNode<CreateCalculationMutation, CreateCalculationMutationVariables>;
export const UpdateCalculationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCalculation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCalculationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCalculation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Calculation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Calculation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"durationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageKm"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"requestedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]} as unknown as DocumentNode<UpdateCalculationMutation, UpdateCalculationMutationVariables>;
export const SubmitCalculationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitCalculation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitCalculation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Calculation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Calculation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"durationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageKm"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"requestedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]} as unknown as DocumentNode<SubmitCalculationMutation, SubmitCalculationMutationVariables>;
export const StartProcessingCalculationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartProcessingCalculation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startProcessingCalculation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Calculation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Calculation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"durationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageKm"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"requestedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]} as unknown as DocumentNode<StartProcessingCalculationMutation, StartProcessingCalculationMutationVariables>;
export const CompleteCalculationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteCalculation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeCalculation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Calculation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Calculation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"durationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageKm"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"requestedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]} as unknown as DocumentNode<CompleteCalculationMutation, CompleteCalculationMutationVariables>;
export const AddOfferQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddOfferQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddOfferQuoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOfferQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CalculationOffer"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CalculationOffer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculationOffer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"downPayment"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"interestRate"}},{"kind":"Field","name":{"kind":"Name","value":"adminFee"}},{"kind":"Field","name":{"kind":"Name","value":"includesService"}},{"kind":"Field","name":{"kind":"Name","value":"includesWinterTires"}},{"kind":"Field","name":{"kind":"Name","value":"includesGap"}},{"kind":"Field","name":{"kind":"Name","value":"includesAssistance"}},{"kind":"Field","name":{"kind":"Name","value":"termsAndConditions"}},{"kind":"Field","name":{"kind":"Name","value":"validUntil"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quotedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quotedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AddOfferQuoteMutation, AddOfferQuoteMutationVariables>;
export const UpdateOfferQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOfferQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOfferQuoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOfferQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CalculationOffer"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CalculationOffer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestCalculationOffer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"downPayment"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"interestRate"}},{"kind":"Field","name":{"kind":"Name","value":"adminFee"}},{"kind":"Field","name":{"kind":"Name","value":"includesService"}},{"kind":"Field","name":{"kind":"Name","value":"includesWinterTires"}},{"kind":"Field","name":{"kind":"Name","value":"includesGap"}},{"kind":"Field","name":{"kind":"Name","value":"includesAssistance"}},{"kind":"Field","name":{"kind":"Name","value":"termsAndConditions"}},{"kind":"Field","name":{"kind":"Name","value":"validUntil"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quotedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quotedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateOfferQuoteMutation, UpdateOfferQuoteMutationVariables>;
export const DeleteCalculationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCalculation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCalculation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCalculationMutation, DeleteCalculationMutationVariables>;
export const CarRequestsDashboardStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CarRequestsDashboardStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carRequestsDashboardStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"overview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeCarRequests"}},{"kind":"Field","name":{"kind":"Name","value":"totalVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"awaitingAction"}},{"kind":"Field","name":{"kind":"Name","value":"completedOnboardingsThisMonth"}},{"kind":"Field","name":{"kind":"Name","value":"activeCarRequestsChange"}},{"kind":"Field","name":{"kind":"Name","value":"totalVehiclesChange"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topBrands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"brandName"}},{"kind":"Field","name":{"kind":"Name","value":"calculationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"agentPerformance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agentId"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"carRequestsCount"}},{"kind":"Field","name":{"kind":"Name","value":"vehiclesCount"}},{"kind":"Field","name":{"kind":"Name","value":"conversionRate"}},{"kind":"Field","name":{"kind":"Name","value":"averageProcessingDays"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompanies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leasingCompanyId"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompanyName"}},{"kind":"Field","name":{"kind":"Name","value":"calculationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedOnboardingsCount"}},{"kind":"Field","name":{"kind":"Name","value":"conversionRate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeline"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"newCarRequests"}},{"kind":"Field","name":{"kind":"Name","value":"completedOnboardings"}}]}},{"kind":"Field","name":{"kind":"Name","value":"funnel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"hasOffers"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompanySelected"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingComplete"}},{"kind":"Field","name":{"kind":"Name","value":"ordered"}}]}}]}}]}}]} as unknown as DocumentNode<CarRequestsDashboardStatsQuery, CarRequestsDashboardStatsQueryVariables>;
export const GetAllCarRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCarRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCarRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFromLegacySystem"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"financingType"}},{"kind":"Field","name":{"kind":"Name","value":"requestEmail"}},{"kind":"Field","name":{"kind":"Name","value":"requestPhone"}},{"kind":"Field","name":{"kind":"Name","value":"requestFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"requestLastName"}},{"kind":"Field","name":{"kind":"Name","value":"requestNewsletter"}},{"kind":"Field","name":{"kind":"Name","value":"requestPostalCode"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAgent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompanyId"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"gclid"}},{"kind":"Field","name":{"kind":"Name","value":"noteInternal"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextCallAt"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}},{"kind":"Field","name":{"kind":"Name","value":"relayedAt"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"waitingForOffer"}},{"kind":"Field","name":{"kind":"Name","value":"offersSentAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"carDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationReason"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationNote"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"isFinal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stateId"}}]}}]}}]} as unknown as DocumentNode<GetAllCarRequestsQuery, GetAllCarRequestsQueryVariables>;
export const GetCarRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCarRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFromLegacySystem"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"financingType"}},{"kind":"Field","name":{"kind":"Name","value":"requestEmail"}},{"kind":"Field","name":{"kind":"Name","value":"requestPhone"}},{"kind":"Field","name":{"kind":"Name","value":"requestFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"requestLastName"}},{"kind":"Field","name":{"kind":"Name","value":"requestNewsletter"}},{"kind":"Field","name":{"kind":"Name","value":"requestPostalCode"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAgent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompanyId"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"gclid"}},{"kind":"Field","name":{"kind":"Name","value":"noteInternal"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nextCallAt"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}},{"kind":"Field","name":{"kind":"Name","value":"relayedAt"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"waitingForOffer"}},{"kind":"Field","name":{"kind":"Name","value":"offersSentAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryExpectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"carDelivered"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationReason"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationNote"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"isFinal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusId"}},{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stateId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"carRequestId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}}]}}]}}]}}]} as unknown as DocumentNode<GetCarRequestQuery, GetCarRequestQueryVariables>;
export const CreateCarRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCarRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCarRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCarRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCarRequestMutation, CreateCarRequestMutationVariables>;
export const UpdateCarRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCarRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCarRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCarRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCarRequestMutation, UpdateCarRequestMutationVariables>;
export const DeleteCarRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCarRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCarRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCarRequestMutation, DeleteCarRequestMutationVariables>;
export const GetAllCarRequestStatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCarRequestStates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCarRequestStates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCarRequestStatesQuery, GetAllCarRequestStatesQueryVariables>;
export const GetAllCarRequestStatusesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCarRequestStatuses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCarRequestStatuses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"isFinal"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columnDisplayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCarRequestStatusesQuery, GetAllCarRequestStatusesQueryVariables>;
export const GetCarRequestLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCarRequestLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CarRequestLogFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carRequestLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"carRequestId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}}]}}]}}]} as unknown as DocumentNode<GetCarRequestLogsQuery, GetCarRequestLogsQueryVariables>;
export const CreateCarRequestLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCarRequestLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCarRequestLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCarRequestLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"carRequestId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}}]}}]}}]} as unknown as DocumentNode<CreateCarRequestLogMutation, CreateCarRequestLogMutationVariables>;
export const GetAllOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllOffers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allOffers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"modelGeneration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingDurationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"downPaymentLeasing"}},{"kind":"Field","name":{"kind":"Name","value":"hasServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasWinterTyresIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasAssistanceServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasGapIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"includesWarranty"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyYears"}},{"kind":"Field","name":{"kind":"Name","value":"financingAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllOffersQuery, GetAllOffersQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetAllCatalogColorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCatalogColors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CatalogColorType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogColors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCatalogColorsQuery, GetAllCatalogColorsQueryVariables>;
export const GetCatalogColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetCatalogColorQuery, GetCatalogColorQueryVariables>;
export const CreateCatalogColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCatalogColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogColorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCatalogColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateCatalogColorMutation, CreateCatalogColorMutationVariables>;
export const UpdateCatalogColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCatalogColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogColorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCatalogColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCatalogColorMutation, UpdateCatalogColorMutationVariables>;
export const DeleteCatalogColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCatalogColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCatalogColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCatalogColorMutation, DeleteCatalogColorMutationVariables>;
export const GetCustomerDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomerDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCustomerDetailQuery, GetCustomerDetailQueryVariables>;
export const GetOnboardingsWithDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOnboardingsWithDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leasingCompanyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allOnboardings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"leasingCompanyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leasingCompanyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"carRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requestFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"requestLastName"}},{"kind":"Field","name":{"kind":"Name","value":"requestEmail"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"validationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"validationNote"}},{"kind":"Field","name":{"kind":"Name","value":"validatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"documentTemplate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fieldName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"validatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOnboardingsWithDocumentsQuery, GetOnboardingsWithDocumentsQueryVariables>;
export const GetUserActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userActivity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"entityName"}},{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"changes"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"ipAddress"}},{"kind":"Field","name":{"kind":"Name","value":"userAgent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUserActivityQuery, GetUserActivityQueryVariables>;
export const GetCarRequestsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCarRequestsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carRequestsCount"}}]}}]} as unknown as DocumentNode<GetCarRequestsCountQuery, GetCarRequestsCountQueryVariables>;
export const GetAllCustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCustomers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllCustomersQuery, GetAllCustomersQueryVariables>;
export const GetCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCustomerQuery, GetCustomerQueryVariables>;
export const SearchCustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchCustomers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<SearchCustomersQuery, SearchCustomersQueryVariables>;
export const GetAllDocumentTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllDocumentTemplates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leasingCompanyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allDocumentTemplates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leasingCompanyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leasingCompanyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fieldName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedFormats"}},{"kind":"Field","name":{"kind":"Name","value":"maxSizeBytes"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isGlobal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllDocumentTemplatesQuery, GetAllDocumentTemplatesQueryVariables>;
export const GetDocumentTemplatesByLeasingCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumentTemplatesByLeasingCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leasingCompanyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentTemplatesByLeasingCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leasingCompanyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leasingCompanyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fieldName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedFormats"}},{"kind":"Field","name":{"kind":"Name","value":"maxSizeBytes"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetDocumentTemplatesByLeasingCompanyQuery, GetDocumentTemplatesByLeasingCompanyQueryVariables>;
export const GetDocumentTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocumentTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fieldName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedFormats"}},{"kind":"Field","name":{"kind":"Name","value":"maxSizeBytes"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isGlobal"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetDocumentTemplateQuery, GetDocumentTemplateQueryVariables>;
export const CreateDocumentTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDocumentTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDocumentTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDocumentTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fieldName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedFormats"}},{"kind":"Field","name":{"kind":"Name","value":"maxSizeBytes"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateDocumentTemplateMutation, CreateDocumentTemplateMutationVariables>;
export const UpdateDocumentTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDocumentTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDocumentTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocumentTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fieldName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedFormats"}},{"kind":"Field","name":{"kind":"Name","value":"maxSizeBytes"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentTemplateMutation, UpdateDocumentTemplateMutationVariables>;
export const DeleteDocumentTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDocumentTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDocumentTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteDocumentTemplateMutation, DeleteDocumentTemplateMutationVariables>;
export const ReorderDocumentTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReorderDocumentTemplates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reorderDocumentTemplates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<ReorderDocumentTemplatesMutation, ReorderDocumentTemplatesMutationVariables>;
export const GetAllEnginesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllEngines"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fuelType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CatalogEngineFuelType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transmissionType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CatalogEngineTransmissionType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driveType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CatalogEngineDriveType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activeOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recommendedOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allEngines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"generationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fuelType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fuelType"}}},{"kind":"Argument","name":{"kind":"Name","value":"transmissionType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transmissionType"}}},{"kind":"Argument","name":{"kind":"Name","value":"driveType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driveType"}}},{"kind":"Argument","name":{"kind":"Name","value":"activeOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activeOnly"}}},{"kind":"Argument","name":{"kind":"Name","value":"recommendedOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recommendedOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"generationId"}},{"kind":"Field","name":{"kind":"Name","value":"generation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fuelType"}},{"kind":"Field","name":{"kind":"Name","value":"transmissionType"}},{"kind":"Field","name":{"kind":"Name","value":"driveType"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionCombined"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionCity"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionOutOfCity"}},{"kind":"Field","name":{"kind":"Name","value":"performance"}},{"kind":"Field","name":{"kind":"Name","value":"torque"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"emission"}},{"kind":"Field","name":{"kind":"Name","value":"rangeKm"}},{"kind":"Field","name":{"kind":"Name","value":"acceleration"}},{"kind":"Field","name":{"kind":"Name","value":"fuelTankVolume"}},{"kind":"Field","name":{"kind":"Name","value":"cylinderCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"gearsCount"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"recommended"}}]}}]}}]} as unknown as DocumentNode<GetAllEnginesQuery, GetAllEnginesQueryVariables>;
export const GetEngineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEngine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"engine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"generationId"}},{"kind":"Field","name":{"kind":"Name","value":"generation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fuelType"}},{"kind":"Field","name":{"kind":"Name","value":"transmissionType"}},{"kind":"Field","name":{"kind":"Name","value":"driveType"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionCombined"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionCity"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionOutOfCity"}},{"kind":"Field","name":{"kind":"Name","value":"performance"}},{"kind":"Field","name":{"kind":"Name","value":"torque"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"emission"}},{"kind":"Field","name":{"kind":"Name","value":"rangeKm"}},{"kind":"Field","name":{"kind":"Name","value":"acceleration"}},{"kind":"Field","name":{"kind":"Name","value":"fuelTankVolume"}},{"kind":"Field","name":{"kind":"Name","value":"cylinderCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"gearsCount"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"recommended"}}]}}]}}]} as unknown as DocumentNode<GetEngineQuery, GetEngineQueryVariables>;
export const GetEnginesByGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEnginesByGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allEngines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fuelType"}},{"kind":"Field","name":{"kind":"Name","value":"transmissionType"}},{"kind":"Field","name":{"kind":"Name","value":"driveType"}},{"kind":"Field","name":{"kind":"Name","value":"performance"}},{"kind":"Field","name":{"kind":"Name","value":"torque"}},{"kind":"Field","name":{"kind":"Name","value":"acceleration"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"recommended"}}]}}]}}]} as unknown as DocumentNode<GetEnginesByGenerationQuery, GetEnginesByGenerationQueryVariables>;
export const GetEnginesCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEnginesCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fuelType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CatalogEngineFuelType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enginesCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fuelType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fuelType"}}}]}]}}]} as unknown as DocumentNode<GetEnginesCountQuery, GetEnginesCountQueryVariables>;
export const SearchEnginesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchEngines"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchEngines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"generation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fuelType"}},{"kind":"Field","name":{"kind":"Name","value":"transmissionType"}},{"kind":"Field","name":{"kind":"Name","value":"driveType"}}]}}]}}]} as unknown as DocumentNode<SearchEnginesQuery, SearchEnginesQueryVariables>;
export const CreateEngineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEngine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogEngineInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEngine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"generationId"}},{"kind":"Field","name":{"kind":"Name","value":"generation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fuelType"}},{"kind":"Field","name":{"kind":"Name","value":"transmissionType"}},{"kind":"Field","name":{"kind":"Name","value":"driveType"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionCombined"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionCity"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionOutOfCity"}},{"kind":"Field","name":{"kind":"Name","value":"performance"}},{"kind":"Field","name":{"kind":"Name","value":"torque"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"emission"}},{"kind":"Field","name":{"kind":"Name","value":"rangeKm"}},{"kind":"Field","name":{"kind":"Name","value":"acceleration"}},{"kind":"Field","name":{"kind":"Name","value":"fuelTankVolume"}},{"kind":"Field","name":{"kind":"Name","value":"cylinderCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"gearsCount"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"recommended"}}]}}]}}]} as unknown as DocumentNode<CreateEngineMutation, CreateEngineMutationVariables>;
export const UpdateEngineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEngine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogEngineInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEngine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"generationId"}},{"kind":"Field","name":{"kind":"Name","value":"generation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fuelType"}},{"kind":"Field","name":{"kind":"Name","value":"transmissionType"}},{"kind":"Field","name":{"kind":"Name","value":"driveType"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionCombined"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionCity"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionOutOfCity"}},{"kind":"Field","name":{"kind":"Name","value":"performance"}},{"kind":"Field","name":{"kind":"Name","value":"torque"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"emission"}},{"kind":"Field","name":{"kind":"Name","value":"rangeKm"}},{"kind":"Field","name":{"kind":"Name","value":"acceleration"}},{"kind":"Field","name":{"kind":"Name","value":"fuelTankVolume"}},{"kind":"Field","name":{"kind":"Name","value":"cylinderCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"gearsCount"}},{"kind":"Field","name":{"kind":"Name","value":"productionStart"}},{"kind":"Field","name":{"kind":"Name","value":"productionStop"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"recommended"}}]}}]}}]} as unknown as DocumentNode<UpdateEngineMutation, UpdateEngineMutationVariables>;
export const DeleteEngineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEngine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEngine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteEngineMutation, DeleteEngineMutationVariables>;
export const GetAllEquipmentItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllEquipmentItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allEquipmentItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllEquipmentItemsQuery, GetAllEquipmentItemsQueryVariables>;
export const GetEquipmentItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEquipmentItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"equipmentItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetEquipmentItemQuery, GetEquipmentItemQueryVariables>;
export const SearchEquipmentItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchEquipmentItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchEquipmentItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}}]}}]}}]} as unknown as DocumentNode<SearchEquipmentItemsQuery, SearchEquipmentItemsQueryVariables>;
export const GetEquipmentItemsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEquipmentItemsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"equipmentItemsCount"}}]}}]} as unknown as DocumentNode<GetEquipmentItemsCountQuery, GetEquipmentItemsCountQueryVariables>;
export const CreateEquipmentItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEquipmentItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogBrandEquipmentItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEquipmentItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateEquipmentItemMutation, CreateEquipmentItemMutationVariables>;
export const UpdateEquipmentItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEquipmentItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogBrandEquipmentItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEquipmentItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"legacySystemId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateEquipmentItemMutation, UpdateEquipmentItemMutationVariables>;
export const DeleteEquipmentItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEquipmentItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEquipmentItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteEquipmentItemMutation, DeleteEquipmentItemMutationVariables>;
export const GetCatalogEquipmentByGenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogEquipmentByGeneration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modelGenerationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogEquipmentByModelGenerationId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"modelGenerationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modelGenerationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"customText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetCatalogEquipmentByGenerationQuery, GetCatalogEquipmentByGenerationQueryVariables>;
export const GetAllCatalogEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCatalogEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modelGenerationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"active"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"standard"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"modelGenerationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modelGenerationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"active"},"value":{"kind":"Variable","name":{"kind":"Name","value":"active"}}},{"kind":"Argument","name":{"kind":"Name","value":"standard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"standard"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"customText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllCatalogEquipmentQuery, GetAllCatalogEquipmentQueryVariables>;
export const GetCatalogEquipmentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCatalogEquipmentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogEquipmentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"customText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetCatalogEquipmentByIdQuery, GetCatalogEquipmentByIdQueryVariables>;
export const SearchCatalogEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchCatalogEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchCatalogEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"customText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SearchCatalogEquipmentQuery, SearchCatalogEquipmentQueryVariables>;
export const CreateCatalogEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCatalogEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCatalogEquipmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCatalogEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"customText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCatalogEquipmentMutation, CreateCatalogEquipmentMutationVariables>;
export const UpdateCatalogEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCatalogEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCatalogEquipmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCatalogEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"customText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCatalogEquipmentMutation, UpdateCatalogEquipmentMutationVariables>;
export const DeleteCatalogEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCatalogEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCatalogEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCatalogEquipmentMutation, DeleteCatalogEquipmentMutationVariables>;
export const GetEquipmentItemCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEquipmentItemCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"catalogEquipmentItemCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetEquipmentItemCategoriesQuery, GetEquipmentItemCategoriesQueryVariables>;
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
export const GetAllVehicleOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllVehicleOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferFiltersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGeneration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingDurationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"downPaymentLeasing"}},{"kind":"Field","name":{"kind":"Name","value":"hasServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasWinterTyresIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasAssistanceServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasGapIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"includesWarranty"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyYears"}},{"kind":"Field","name":{"kind":"Name","value":"financingAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customRequirements"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"responseDeadline"}}]}}]}}]} as unknown as DocumentNode<GetAllVehicleOffersQuery, GetAllVehicleOffersQueryVariables>;
export const GetOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGeneration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingDurationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"downPaymentLeasing"}},{"kind":"Field","name":{"kind":"Name","value":"hasServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasWinterTyresIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasAssistanceServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasGapIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"includesWarranty"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyYears"}},{"kind":"Field","name":{"kind":"Name","value":"financingAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customRequirements"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"responseDeadline"}}]}}]}}]} as unknown as DocumentNode<GetOfferQuery, GetOfferQueryVariables>;
export const GetIndividualOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIndividualOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferFiltersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"individualOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGeneration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customRequirements"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"responseDeadline"}}]}}]}}]} as unknown as DocumentNode<GetIndividualOffersQuery, GetIndividualOffersQueryVariables>;
export const CreateOperationalLeasingOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOperationalLeasingOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOperationalLeasingOfferInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOperationalLeasingOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGeneration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingDurationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"downPaymentLeasing"}},{"kind":"Field","name":{"kind":"Name","value":"hasServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasWinterTyresIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasAssistanceServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasGapIncluded"}}]}}]}}]} as unknown as DocumentNode<CreateOperationalLeasingOfferMutation, CreateOperationalLeasingOfferMutationVariables>;
export const CreateDirectPurchaseOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDirectPurchaseOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDirectPurchaseOfferInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDirectPurchaseOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGeneration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"includesWarranty"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyYears"}},{"kind":"Field","name":{"kind":"Name","value":"financingAvailable"}}]}}]}}]} as unknown as DocumentNode<CreateDirectPurchaseOfferMutation, CreateDirectPurchaseOfferMutationVariables>;
export const CreateIndividualOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateIndividualOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateIndividualOfferInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createIndividualOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGeneration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customRequirements"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"responseDeadline"}}]}}]}}]} as unknown as DocumentNode<CreateIndividualOfferMutation, CreateIndividualOfferMutationVariables>;
export const UpdateOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOfferInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGeneration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingDurationMonths"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"annualMileageLimit"}},{"kind":"Field","name":{"kind":"Name","value":"downPaymentLeasing"}},{"kind":"Field","name":{"kind":"Name","value":"hasServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasWinterTyresIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasAssistanceServiceIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"hasGapIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"includesWarranty"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyYears"}},{"kind":"Field","name":{"kind":"Name","value":"financingAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customRequirements"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"responseDeadline"}}]}}]}}]} as unknown as DocumentNode<UpdateOfferMutation, UpdateOfferMutationVariables>;
export const UpdateIndividualOfferStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateIndividualOfferStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IndividualOfferStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIndividualOfferStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"modelGenerationId"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"modelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"modelGeneration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customRequirements"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"responseDeadline"}}]}}]}}]} as unknown as DocumentNode<UpdateIndividualOfferStatusMutation, UpdateIndividualOfferStatusMutationVariables>;
export const DeleteOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteOfferMutation, DeleteOfferMutationVariables>;
export const GetAllOnboardingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllOnboardings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leasingCompanyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allOnboardings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"leasingCompanyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leasingCompanyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"carRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requestFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"requestLastName"}},{"kind":"Field","name":{"kind":"Name","value":"requestEmail"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"validationStatus"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllOnboardingsQuery, GetAllOnboardingsQueryVariables>;
export const GetOnboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOnboarding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onboarding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastReminderSentAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"carRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requestFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"requestLastName"}},{"kind":"Field","name":{"kind":"Name","value":"requestEmail"}},{"kind":"Field","name":{"kind":"Name","value":"requestPhone"}},{"kind":"Field","name":{"kind":"Name","value":"financingType"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leasingCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"validationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"validationNote"}},{"kind":"Field","name":{"kind":"Name","value":"validatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"relativePath"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"sizeFormatted"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}}]}},{"kind":"Field","name":{"kind":"Name","value":"documentTemplate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fieldName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedFormats"}},{"kind":"Field","name":{"kind":"Name","value":"maxSizeBytes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"validatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOnboardingQuery, GetOnboardingQueryVariables>;
export const GetRequiredDocumentsForOnboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRequiredDocumentsForOnboarding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onboardingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requiredDocumentsForOnboarding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"onboardingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onboardingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fieldName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedFormats"}},{"kind":"Field","name":{"kind":"Name","value":"maxSizeBytes"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}}]}}]}}]} as unknown as DocumentNode<GetRequiredDocumentsForOnboardingQuery, GetRequiredDocumentsForOnboardingQueryVariables>;
export const CreateOnboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOnboarding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"carRequestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expirationDays"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOnboarding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"carRequestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"carRequestId"}}},{"kind":"Argument","name":{"kind":"Name","value":"expirationDays"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expirationDays"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateOnboardingMutation, CreateOnboardingMutationVariables>;
export const ValidateDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidateDocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"validationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"validationNote"}},{"kind":"Field","name":{"kind":"Name","value":"validatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"validatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateDocumentMutation, ValidateDocumentMutationVariables>;
export const SendOnboardingReminderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendOnboardingReminder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onboardingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOnboardingReminder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"onboardingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onboardingId"}}}]}]}}]} as unknown as DocumentNode<SendOnboardingReminderMutation, SendOnboardingReminderMutationVariables>;
export const UpdateOnboardingStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onboardingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"onboardingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onboardingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingStatusMutation, UpdateOnboardingStatusMutationVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const SoftDeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SoftDeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"softDeleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetUserAuditLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAuditLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userActivity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entityName"}},{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"oldValue"}},{"kind":"Field","name":{"kind":"Name","value":"newValue"}},{"kind":"Field","name":{"kind":"Name","value":"changes"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"ipAddress"}},{"kind":"Field","name":{"kind":"Name","value":"userAgent"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUserAuditLogsQuery, GetUserAuditLogsQueryVariables>;
export const RefreshTokenInternalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokenInternal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenInternalMutation, RefreshTokenInternalMutationVariables>;
export const GenerateUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateUploadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filename"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filename"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filename"}}},{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}]}]}}]} as unknown as DocumentNode<GenerateUploadUrlMutation, GenerateUploadUrlMutationVariables>;
export const CreateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"relativePath"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"checksum"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailPath"}},{"kind":"Field","name":{"kind":"Name","value":"isImage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateFileMutation, CreateFileMutationVariables>;
export const DeleteFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFileMutation, DeleteFileMutationVariables>;
export const DeleteFileCompletelyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFileCompletely"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFileCompletely"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFileCompletelyMutation, DeleteFileCompletelyMutationVariables>;
export const GetFileByChecksumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFileByChecksum"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checksum"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileByChecksum"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"checksum"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checksum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"relativePath"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"checksum"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"isImage"}}]}}]}}]} as unknown as DocumentNode<GetFileByChecksumQuery, GetFileByChecksumQueryVariables>;