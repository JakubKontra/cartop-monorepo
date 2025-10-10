import { c } from "@contember/schema-definition";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogBrandEquipmentAssignedItem } from "./CatalogBrandEquipmentAssignedItem";
import { CatalogBrandEquipmentItem } from "./CatalogBrandEquipmentItem";
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
export class CatalogBrandEquipment {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");

  description = c.stringColumn().nullable().default(null);
  catalogBrand = c.manyHasOne(CatalogBrand, "equipments");
  items = c.oneHasMany(CatalogBrandEquipmentItem, "catalogBrandEquipment");
  assignedItems = c.oneHasMany(
    CatalogBrandEquipmentAssignedItem,
    "catalogBrandEquipment"
  );
}
