import { c } from "@contember/schema-definition";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogBrandEquipment } from "./CatalogBrandEquipment";
import { CatalogBrandEquipmentAssignedItem } from "./CatalogBrandEquipmentAssignedItem";
import { catalogManagerRole, salesRepresentativeRole } from "./acl";

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
export class CatalogBrandEquipmentItem {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");

  description = c.stringColumn().nullable().default(null);
  catalogBrandEquipment = c.manyHasOne(CatalogBrandEquipment, "items");
  assignedItems = c.oneHasMany(
    CatalogBrandEquipmentAssignedItem,
    "catalogBrandEquipmentItem"
  );
}
