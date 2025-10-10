import { c } from "@contember/schema-definition";
import { CatalogEngine } from "./CatalogEngine";
import { catalogManagerRole, publicRole, salesRepresentativeRole } from "./acl";

@c.Unique("name")
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
export class CatalogEngineDriveType {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().notNull();

  createdAt = c.dateTimeColumn().notNull().default("now");
  engines = c.oneHasMany(CatalogEngine, "driveType");
}
