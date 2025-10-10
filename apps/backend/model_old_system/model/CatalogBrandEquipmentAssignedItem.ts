import { c } from "@contember/schema-definition";
import { CatalogBrandEquipment } from "./CatalogBrandEquipment";
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
export class CatalogBrandEquipmentAssignedItem {
  catalogBrandEquipment = c.manyHasOne(CatalogBrandEquipment, "assignedItems");
  catalogBrandEquipmentItem = c.manyHasOne(
    CatalogBrandEquipmentItem,
    "assignedItems"
  );
  createdAt = c.dateTimeColumn().notNull().default("now");
}
