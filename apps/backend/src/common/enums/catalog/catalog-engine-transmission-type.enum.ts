import { registerEnumType } from '@nestjs/graphql';

/**
 * Catalog Engine Transmission Type Enum
 * Represents different types of transmissions used by vehicle engines
 */
export enum CatalogEngineTransmissionType {
  MANUAL = 'manual', // 1 - Manuální
  AUTOMATIC = 'automatic', // 2 - Automatická
  SEMI_AUTOMATIC = 'semi_automatic', // 3 - Poloautomatická
  CVT = 'cvt', // 4 - CVT (plynule měnitelná)
}

/**
 * Maps transmission type enum values to their numeric identifiers
 */
export const CATALOG_ENGINE_TRANSMISSION_TYPE_NUMBER: Record<
  CatalogEngineTransmissionType,
  number
> = {
  [CatalogEngineTransmissionType.MANUAL]: 1,
  [CatalogEngineTransmissionType.AUTOMATIC]: 2,
  [CatalogEngineTransmissionType.SEMI_AUTOMATIC]: 3,
  [CatalogEngineTransmissionType.CVT]: 4,
};

/**
 * Maps numeric identifiers to transmission type enum values
 */
export const CATALOG_ENGINE_TRANSMISSION_TYPE_FROM_NUMBER: Record<
  number,
  CatalogEngineTransmissionType
> = {
  1: CatalogEngineTransmissionType.MANUAL,
  2: CatalogEngineTransmissionType.AUTOMATIC,
  3: CatalogEngineTransmissionType.SEMI_AUTOMATIC,
  4: CatalogEngineTransmissionType.CVT,
};

/**
 * Maps transmission type enum values to their Czech display names
 */
export const CATALOG_ENGINE_TRANSMISSION_TYPE_LABELS_CS: Record<
  CatalogEngineTransmissionType,
  string
> = {
  [CatalogEngineTransmissionType.MANUAL]: 'Manuální',
  [CatalogEngineTransmissionType.AUTOMATIC]: 'Automatická',
  [CatalogEngineTransmissionType.SEMI_AUTOMATIC]: 'Poloautomatická',
  [CatalogEngineTransmissionType.CVT]: 'CVT (plynule měnitelná)',
};

/**
 * Maps transmission type enum values to their English display names
 */
export const CATALOG_ENGINE_TRANSMISSION_TYPE_LABELS_EN: Record<
  CatalogEngineTransmissionType,
  string
> = {
  [CatalogEngineTransmissionType.MANUAL]: 'Manual',
  [CatalogEngineTransmissionType.AUTOMATIC]: 'Automatic',
  [CatalogEngineTransmissionType.SEMI_AUTOMATIC]: 'Semi-Automatic',
  [CatalogEngineTransmissionType.CVT]: 'CVT (Continuously Variable Transmission)',
};

// Register enum for GraphQL
registerEnumType(CatalogEngineTransmissionType, {
  name: 'CatalogEngineTransmissionType',
  description: 'Type of transmission used by vehicle engine',
});
