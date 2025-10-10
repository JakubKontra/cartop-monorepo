import { c } from "@contember/schema-definition";
import { CarOutbuyRequest } from "./CarOutbuyRequest";
import { CarRequest } from "./CarRequest";
import { CatalogModel } from "./Catalog";
import { CatalogBodyType } from "./CatalogBodyType";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogEngine } from "./CatalogEngine";
import { CatalogEquipment } from "./CatalogEquipment";
import { CatalogEquipmentBrakeType } from "./CatalogEquipmentBrakeType";
import { CatalogModelGenerationColor } from "./CatalogModelGenerationColor";
import { CatalogModelGenerationConfiguration } from "./CatalogModelGenerationConfiguration";
import { Gallery } from "./Image";
import { IndividualOffer } from "./IndividualOffer";
import { LeasingOffer } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { catalogManagerRole, publicRole, salesRepresentativeRole } from "./acl";

// @c.Unique("name")
// @c.Unique("slug")
@c.Allow(publicRole, {
  read: true,
})
@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(catalogManagerRole, {
  read: true,
  create: true,
  update: true,
})
export class CatalogModelGeneration {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  name = c.stringColumn().notNull();
  slug = c.stringColumn().nullable();
  legacySlug = c.stringColumn().unique();

  model = c.manyHasOne(CatalogModel, "generations").notNull();
  description = c.stringColumn();
  productionStart = c.dateTimeColumn();
  productionStop = c.dateTimeColumn();
  wheelbase = c.intColumn();
  frontTrack = c.intColumn();
  rearTrack = c.intColumn();
  length = c.intColumn();
  width = c.intColumn();
  height = c.intColumn();
  trunkSpaceMin = c.intColumn();
  trunkSpaceMax = c.intColumn();
  brand = c
    .manyHasOne(CatalogBrand, "catalogModelGenerations")
    .cascadeOnDelete();
  bodyType = c
    .manyHasOne(CatalogBodyType, "catalogModelGenerations")
    .cascadeOnDelete();
  isActive = c.boolColumn().default(false);
  frontBrakesType = c
    .manyHasOne(CatalogEquipmentBrakeType, "catalogModelGenerationsFrontBrakes")
    .cascadeOnDelete();
  rearBrakesType = c
    .manyHasOne(CatalogEquipmentBrakeType, "catalogModelGenerationsRearBrakes")
    .cascadeOnDelete();
  configurations = c.oneHasMany(
    CatalogModelGenerationConfiguration,
    "generation"
  );
  engines = c.oneHasMany(CatalogEngine, "modelGeneration");
  offers = c.oneHasMany(Offer, "modelGeneration");
  leasingOffers = c.oneHasMany(LeasingOffer, "modelGeneration");
  gallery = c.oneHasMany(Gallery, "catalogModelGeneration");
  colors = c.oneHasMany(CatalogModelGenerationColor, "modelGeneration");
  equipments = c.oneHasMany(CatalogEquipment, "modelGeneration");
  carRequests = c.oneHasMany(CarRequest, "modelGeneration");
  carOutbuyRequests = c.oneHasMany(CarOutbuyRequest, "modelGeneration");
  individualOffers = c.oneHasMany(IndividualOffer, "modelGeneration");
}
