/**
 * Seeding Configuration
 * Centralized configuration for data seeding amounts
 */

export interface SeedConfig {
  files: number;
  brands: number;
  modelsPerBrand: number;
  generationsPerModel: number;
  colorsExterior: number;
  colorsInterior: number;
  leasingCompanies: number;
  operationalLeasingOffers: number;
  directPurchaseOffers: number;
  individualOffers: number;
  variantsPerOffer: number;
  colorVariantsPerOffer: number;
  equipmentItemsPerOffer: number;
  calculationsPerIndividualOffer: number;
}

export const DEFAULT_SEED_CONFIG: SeedConfig = {
  files: 50,
  brands: 15,
  modelsPerBrand: 3,
  generationsPerModel: 2,
  colorsExterior: 30,
  colorsInterior: 20,
  leasingCompanies: 10,
  operationalLeasingOffers: 30,
  directPurchaseOffers: 20,
  individualOffers: 15,
  variantsPerOffer: 4,
  colorVariantsPerOffer: 3,
  equipmentItemsPerOffer: 5,
  calculationsPerIndividualOffer: 2,
};

/**
 * Get seed configuration from environment or use defaults
 */
export function getSeedConfig(): SeedConfig {
  return {
    files: parseInt(process.env.SEED_FILES || String(DEFAULT_SEED_CONFIG.files)),
    brands: parseInt(process.env.SEED_BRANDS || String(DEFAULT_SEED_CONFIG.brands)),
    modelsPerBrand: parseInt(process.env.SEED_MODELS_PER_BRAND || String(DEFAULT_SEED_CONFIG.modelsPerBrand)),
    generationsPerModel: parseInt(process.env.SEED_GENERATIONS_PER_MODEL || String(DEFAULT_SEED_CONFIG.generationsPerModel)),
    colorsExterior: parseInt(process.env.SEED_COLORS_EXTERIOR || String(DEFAULT_SEED_CONFIG.colorsExterior)),
    colorsInterior: parseInt(process.env.SEED_COLORS_INTERIOR || String(DEFAULT_SEED_CONFIG.colorsInterior)),
    leasingCompanies: parseInt(process.env.SEED_LEASING_COMPANIES || String(DEFAULT_SEED_CONFIG.leasingCompanies)),
    operationalLeasingOffers: parseInt(process.env.SEED_OPERATIONAL_LEASING_OFFERS || String(DEFAULT_SEED_CONFIG.operationalLeasingOffers)),
    directPurchaseOffers: parseInt(process.env.SEED_DIRECT_PURCHASE_OFFERS || String(DEFAULT_SEED_CONFIG.directPurchaseOffers)),
    individualOffers: parseInt(process.env.SEED_INDIVIDUAL_OFFERS || String(DEFAULT_SEED_CONFIG.individualOffers)),
    variantsPerOffer: parseInt(process.env.SEED_VARIANTS_PER_OFFER || String(DEFAULT_SEED_CONFIG.variantsPerOffer)),
    colorVariantsPerOffer: parseInt(process.env.SEED_COLOR_VARIANTS_PER_OFFER || String(DEFAULT_SEED_CONFIG.colorVariantsPerOffer)),
    equipmentItemsPerOffer: parseInt(process.env.SEED_EQUIPMENT_PER_OFFER || String(DEFAULT_SEED_CONFIG.equipmentItemsPerOffer)),
    calculationsPerIndividualOffer: parseInt(process.env.SEED_CALCULATIONS_PER_OFFER || String(DEFAULT_SEED_CONFIG.calculationsPerIndividualOffer)),
  };
}
