import { c } from "@contember/schema-definition";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogBrandEquipment } from "./CatalogBrandEquipment";
import { Offer } from "./Offer/Offer";
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
export class OfferLabel {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  color = c.stringColumn().nullable();
  backgroundColor = c.stringColumn().nullable();
}
