import { c } from "@contember/schema-definition";
import { CatalogEquipment, CatalogEquipmentItem } from "./CatalogEquipment";
import { catalogManagerRole, salesRepresentativeRole } from "./acl";

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
export class CatalogEquipmentCategory {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().notNull();

  createdAt = c.dateTimeColumn().notNull().default("now");
  catalogEquipmentItems = c.oneHasMany(
    CatalogEquipmentItem,
    "catalogEquipmentCategory"
  );
}
