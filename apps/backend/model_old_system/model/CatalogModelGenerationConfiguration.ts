import { c } from "@contember/schema-definition";
import { CatalogModel } from "./Catalog";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogEngine } from "./CatalogEngine";
import { CatalogEquipment } from "./CatalogEquipment";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { Offer } from "./Offer/Offer";
import { catalogManagerRole, salesRepresentativeRole } from "./acl";

@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(catalogManagerRole, {
  read: true,
  create: true,
  update: true,
})
export class CatalogModelGenerationConfiguration {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  priceFrom = c.intColumn();
  isActive = c.boolColumn().default(false);
  generation = c.manyHasOne(CatalogModelGeneration, "configurations").notNull();
  engine = c.manyHasOne(CatalogEngine, "configurations").notNull();
  equipment = c.manyHasOne(CatalogEquipment, "configurations");
}
