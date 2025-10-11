/**
 * Catalog Engine Fuel Type Enum
 * Represents different types of fuel used by vehicle engines
 */
export enum CatalogEngineFuelType {
  DIESEL = 'diesel', // 1 - Diesel
  GASOLINE = 'gasoline', // 2 - Benzín
  HYBRID = 'hybrid', // 3 - Hybrid
  ELECTRIC = 'electric', // 4 - Elektřina
  HYDROGEN = 'hydrogen', // 5 - Vodík
  TWO_STROKE = 'two_stroke', // 6 - Dvoutaktní motorizace
  ETHANOL_E85 = 'ethanol_e85', // 7 - Ethanol - E85
}

/**
 * Maps fuel type enum values to their numeric identifiers
 */
export const CATALOG_ENGINE_FUEL_TYPE_NUMBER: Record<CatalogEngineFuelType, number> = {
  [CatalogEngineFuelType.DIESEL]: 1,
  [CatalogEngineFuelType.GASOLINE]: 2,
  [CatalogEngineFuelType.HYBRID]: 3,
  [CatalogEngineFuelType.ELECTRIC]: 4,
  [CatalogEngineFuelType.HYDROGEN]: 5,
  [CatalogEngineFuelType.TWO_STROKE]: 6,
  [CatalogEngineFuelType.ETHANOL_E85]: 7,
};

/**
 * Maps numeric identifiers to fuel type enum values
 */
export const CATALOG_ENGINE_FUEL_TYPE_FROM_NUMBER: Record<number, CatalogEngineFuelType> = {
  1: CatalogEngineFuelType.DIESEL,
  2: CatalogEngineFuelType.GASOLINE,
  3: CatalogEngineFuelType.HYBRID,
  4: CatalogEngineFuelType.ELECTRIC,
  5: CatalogEngineFuelType.HYDROGEN,
  6: CatalogEngineFuelType.TWO_STROKE,
  7: CatalogEngineFuelType.ETHANOL_E85,
};

/**
 * Maps fuel type enum values to their Czech display names
 */
export const CATALOG_ENGINE_FUEL_TYPE_LABELS_CS: Record<CatalogEngineFuelType, string> = {
  [CatalogEngineFuelType.DIESEL]: 'Diesel',
  [CatalogEngineFuelType.GASOLINE]: 'Benzín',
  [CatalogEngineFuelType.HYBRID]: 'Hybrid',
  [CatalogEngineFuelType.ELECTRIC]: 'Elektřina',
  [CatalogEngineFuelType.HYDROGEN]: 'Vodík',
  [CatalogEngineFuelType.TWO_STROKE]: 'Dvoutaktní motorizace',
  [CatalogEngineFuelType.ETHANOL_E85]: 'Ethanol - E85',
};

/**
 * Maps fuel type enum values to their English display names
 */
export const CATALOG_ENGINE_FUEL_TYPE_LABELS_EN: Record<CatalogEngineFuelType, string> = {
  [CatalogEngineFuelType.DIESEL]: 'Diesel',
  [CatalogEngineFuelType.GASOLINE]: 'Gasoline',
  [CatalogEngineFuelType.HYBRID]: 'Hybrid',
  [CatalogEngineFuelType.ELECTRIC]: 'Electric',
  [CatalogEngineFuelType.HYDROGEN]: 'Hydrogen',
  [CatalogEngineFuelType.TWO_STROKE]: 'Two-Stroke Engine',
  [CatalogEngineFuelType.ETHANOL_E85]: 'Ethanol - E85',
};
