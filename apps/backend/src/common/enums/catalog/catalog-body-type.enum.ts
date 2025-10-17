import { registerEnumType } from '@nestjs/graphql';

/**
 * Catalog Body Type Enum
 * Represents different types of vehicle body styles
 */
export enum CatalogBodyType {
  SUV = 'suv', // 36 - SUV
  SEDAN_LIFTBACK = 'sedan_liftback', // 37 - Limuzína / Liftback
  WAGON_MPV = 'wagon_mpv', // 38 - Kombi / MPV
  SMALL_CAR_HATCHBACK = 'small_car_hatchback', // 39 - Malý vůz / Hatchback
  SPORTS_CAR_COUPE = 'sports_car_coupe', // 40 - Sportovní vůz / kupé
  CONVERTIBLE = 'convertible', // 41 - Kabriolet
  VAN = 'van', // 42 - Dodávka
  OFF_ROAD_CONVERTIBLE = 'off_road_convertible', // 43 - Off-road vehicle, Cabriolet
  WAGON_CROSSOVER = 'wagon_crossover', // 44 - Station wagon (estate), Crossover
  SAV = 'sav', // 45 - SAV
  SAC = 'sac', // 46 - SAC
  CUV = 'cuv', // 47 - CUV
  CROSSOVER_LIFTBACK = 'crossover_liftback', // 48 - Crossover, Liftback
  OFF_ROAD_COUPE = 'off_road_coupe', // 49 - Off-road vehicle, Coupe
  CROSSOVER_FASTBACK = 'crossover_fastback', // 50 - Crossover, Fastback
  COUPE_CROSSOVER = 'coupe_crossover', // 51 - Coupe, Crossover
  COUPE_SUV_CROSSOVER = 'coupe_suv_crossover', // 52 - Coupe, SUV, Crossover
  COMMERCIAL_VAN = 'commercial_van', // 53 - Van
  MOTORHOME = 'motorhome', // 54 - Obytný vůz
}

/**
 * Maps body type enum values to their numeric identifiers from the old system
 */
export const CATALOG_BODY_TYPE_NUMBER: Record<CatalogBodyType, number> = {
  [CatalogBodyType.SUV]: 36,
  [CatalogBodyType.SEDAN_LIFTBACK]: 37,
  [CatalogBodyType.WAGON_MPV]: 38,
  [CatalogBodyType.SMALL_CAR_HATCHBACK]: 39,
  [CatalogBodyType.SPORTS_CAR_COUPE]: 40,
  [CatalogBodyType.CONVERTIBLE]: 41,
  [CatalogBodyType.VAN]: 42,
  [CatalogBodyType.OFF_ROAD_CONVERTIBLE]: 43,
  [CatalogBodyType.WAGON_CROSSOVER]: 44,
  [CatalogBodyType.SAV]: 45,
  [CatalogBodyType.SAC]: 46,
  [CatalogBodyType.CUV]: 47,
  [CatalogBodyType.CROSSOVER_LIFTBACK]: 48,
  [CatalogBodyType.OFF_ROAD_COUPE]: 49,
  [CatalogBodyType.CROSSOVER_FASTBACK]: 50,
  [CatalogBodyType.COUPE_CROSSOVER]: 51,
  [CatalogBodyType.COUPE_SUV_CROSSOVER]: 52,
  [CatalogBodyType.COMMERCIAL_VAN]: 53,
  [CatalogBodyType.MOTORHOME]: 54,
};

/**
 * Maps numeric identifiers from the old system to body type enum values
 */
export const CATALOG_BODY_TYPE_FROM_NUMBER: Record<number, CatalogBodyType> = {
  36: CatalogBodyType.SUV,
  37: CatalogBodyType.SEDAN_LIFTBACK,
  38: CatalogBodyType.WAGON_MPV,
  39: CatalogBodyType.SMALL_CAR_HATCHBACK,
  40: CatalogBodyType.SPORTS_CAR_COUPE,
  41: CatalogBodyType.CONVERTIBLE,
  42: CatalogBodyType.VAN,
  43: CatalogBodyType.OFF_ROAD_CONVERTIBLE,
  44: CatalogBodyType.WAGON_CROSSOVER,
  45: CatalogBodyType.SAV,
  46: CatalogBodyType.SAC,
  47: CatalogBodyType.CUV,
  48: CatalogBodyType.CROSSOVER_LIFTBACK,
  49: CatalogBodyType.OFF_ROAD_COUPE,
  50: CatalogBodyType.CROSSOVER_FASTBACK,
  51: CatalogBodyType.COUPE_CROSSOVER,
  52: CatalogBodyType.COUPE_SUV_CROSSOVER,
  53: CatalogBodyType.COMMERCIAL_VAN,
  54: CatalogBodyType.MOTORHOME,
};

/**
 * Map MySQL body_type_id to CatalogBodyType enum
 * Used for MySQL to PostgreSQL migration
 *
 * @param mysqlId Legacy MySQL body type ID
 * @returns CatalogBodyType enum value or null if not found or invalid
 */
export function mapMySQLBodyType(mysqlId?: number | null): CatalogBodyType | null {
  if (!mysqlId) return null;
  return CATALOG_BODY_TYPE_FROM_NUMBER[mysqlId] || null;
}

// Register enum for GraphQL
registerEnumType(CatalogBodyType, {
  name: 'CatalogBodyType',
  description: 'Type of vehicle body style',
});
