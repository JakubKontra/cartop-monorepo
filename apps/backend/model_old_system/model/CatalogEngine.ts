import { c } from "@contember/schema-definition";
import { CarOutbuyRequest } from "./CarOutbuyRequest";
import { CarRequest } from "./CarRequest";
import { CatalogEngineDriveType } from "./CatalogEngineDriveType";
import { CatalogEngineFuelType } from "./CatalogEngineFuelType";
import { CatalogEngineTransmissionType } from "./CatalogEngineTransmissionType";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { CatalogModelGenerationConfiguration } from "./CatalogModelGenerationConfiguration";
import { IndividualOffer } from "./IndividualOffer";
import { LeasingOffer } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { catalogManagerRole, publicRole, salesRepresentativeRole } from "./acl";

// @c.Unique("name")
// @c.Unique("slug")
@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(catalogManagerRole, {
  read: true,
  create: true,
  update: true,
})
@c.Allow(publicRole, {
  read: true,
})
export class CatalogEngine {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().notNull();
  legacySlug = c.stringColumn().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");

  modelGeneration = c.manyHasOne(CatalogModelGeneration, "engines");
  configurations = c.oneHasMany(CatalogModelGenerationConfiguration, "engine");
  offers = c.oneHasMany(Offer, "engine");
  individualOffers = c.oneHasMany(IndividualOffer, "engine");
  carRequests = c.oneHasMany(CarRequest, "engine");
  leasingOffers = c.oneHasMany(LeasingOffer, "engine");
  power = c.intColumn();
  volume = c.doubleColumn();
  catalogEngineTransmissionType = c.manyHasOne(
    CatalogEngineTransmissionType,
    "engines"
  );
  fuelType = c.manyHasOne(CatalogEngineFuelType, "engines");
  isRecommended = c.boolColumn().default(false);
  isActive = c.boolColumn().default(false);
  productionStop = c.dateTimeColumn();
  productionStart = c.dateTimeColumn();
  gearsCount = c.intColumn();
  weight = c.doubleColumn();
  maxSpeed = c.doubleColumn();
  cylinderCount = c.intColumn();
  fuelTankVolume = c.doubleColumn();
  acceleration = c.doubleColumn();
  rangeKm = c.doubleColumn();
  emission = c.doubleColumn();
  torque = c.doubleColumn();
  performance = c.doubleColumn();
  consumptionOutOfCity = c.doubleColumn();
  consumptionCity = c.doubleColumn();
  consumptionCombined = c.doubleColumn();
  extId = c.stringColumn();
  driveType = c.manyHasOne(CatalogEngineDriveType, "engines");
  rangeKmElectric = c.doubleColumn();
  carOutbuyRequests = c.oneHasMany(CarOutbuyRequest, "engine");
}
