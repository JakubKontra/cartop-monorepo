import { c } from "@contember/schema-definition";
import { CatalogEquipmentCategory } from "./CatalogEquipmentCategory";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { CatalogModelGenerationConfiguration } from "./CatalogModelGenerationConfiguration";
import { LeasingOffer } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { catalogManagerRole, publicRole, salesRepresentativeRole } from "./acl";

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
export class CatalogEquipment {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().notNull();

  createdAt = c.dateTimeColumn().notNull().default("now");

  isActive = c.boolColumn().default(false);
  isStandard = c.boolColumn().default(false);
  custom = c.stringColumn();
  modelGeneration = c.manyHasOne(CatalogModelGeneration, "equipments");
  configurations = c.oneHasMany(
    CatalogModelGenerationConfiguration,
    "equipment"
  );
  leasingOffers = c.oneHasMany(LeasingOffer, "equipment");
  offers = c.oneHasMany(Offer, "equipment");
}

@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(catalogManagerRole, {
  read: true,
  create: true,
  update: true,
})
export class CatalogEquipmentItem {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  name = c.stringColumn().notNull();
  catalogEquipmentCategory = c.manyHasOne(
    CatalogEquipmentCategory,
    "catalogEquipmentItems"
  );
}
