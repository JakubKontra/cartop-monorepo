import { registerEnumType } from '@nestjs/graphql';

/**
 * Catalog Engine Drive Type Enum
 * Represents different types of drive systems used by vehicles
 */
export enum CatalogEngineDriveType {
  FWD = 'fwd', // 1 - Přední pohon (Front-Wheel Drive)
  RWD = 'rwd', // 2 - Zadní pohon (Rear-Wheel Drive)
  AWD = 'awd', // 3 - Pohon všech kol (All-Wheel Drive)
  FOUR_WD = 'four_wd', // 4 - Pohon 4x4 (Four-Wheel Drive)
}

/**
 * Maps drive type enum values to their numeric identifiers
 */
export const CATALOG_ENGINE_DRIVE_TYPE_NUMBER: Record<CatalogEngineDriveType, number> = {
  [CatalogEngineDriveType.FWD]: 1,
  [CatalogEngineDriveType.RWD]: 2,
  [CatalogEngineDriveType.AWD]: 3,
  [CatalogEngineDriveType.FOUR_WD]: 4,
};

/**
 * Maps numeric identifiers to drive type enum values
 */
export const CATALOG_ENGINE_DRIVE_TYPE_FROM_NUMBER: Record<number, CatalogEngineDriveType> = {
  1: CatalogEngineDriveType.FWD,
  2: CatalogEngineDriveType.RWD,
  3: CatalogEngineDriveType.AWD,
  4: CatalogEngineDriveType.FOUR_WD,
};

/**
 * Maps drive type enum values to their Czech display names
 */
export const CATALOG_ENGINE_DRIVE_TYPE_LABELS_CS: Record<CatalogEngineDriveType, string> = {
  [CatalogEngineDriveType.FWD]: 'Přední pohon',
  [CatalogEngineDriveType.RWD]: 'Zadní pohon',
  [CatalogEngineDriveType.AWD]: 'Pohon všech kol',
  [CatalogEngineDriveType.FOUR_WD]: 'Pohon 4x4',
};

/**
 * Maps drive type enum values to their English display names
 */
export const CATALOG_ENGINE_DRIVE_TYPE_LABELS_EN: Record<CatalogEngineDriveType, string> = {
  [CatalogEngineDriveType.FWD]: 'Front-Wheel Drive',
  [CatalogEngineDriveType.RWD]: 'Rear-Wheel Drive',
  [CatalogEngineDriveType.AWD]: 'All-Wheel Drive',
  [CatalogEngineDriveType.FOUR_WD]: 'Four-Wheel Drive (4x4)',
};

// Register enum for GraphQL
registerEnumType(CatalogEngineDriveType, {
  name: 'CatalogEngineDriveType',
  description: 'Type of drive system used by vehicle',
});
