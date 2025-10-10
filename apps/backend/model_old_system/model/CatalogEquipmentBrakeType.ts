import { c } from "@contember/schema-definition";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { catalogManagerRole, publicRole, salesRepresentativeRole } from "./acl";

@c.Unique("name")
@c.Unique("slug")
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
export class CatalogEquipmentBrakeType {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().notNull();

  createdAt = c.dateTimeColumn().notNull().default("now");

  catalogModelGenerationsFrontBrakes = c.oneHasMany(
    CatalogModelGeneration,
    "frontBrakesType"
  );
  catalogModelGenerationsRearBrakes = c.oneHasMany(
    CatalogModelGeneration,
    "rearBrakesType"
  );
}
