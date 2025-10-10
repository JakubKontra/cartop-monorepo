import { c } from "@contember/schema-definition";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { Offer } from "./Offer/Offer";
import {
  catalogManagerRole,
  customerServiceRole,
  publicRole,
  salesRepresentativeRole,
} from "./acl";

@c.Unique("name")
@c.Allow(customerServiceRole, {
  read: true,
  create: true,
})
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
export class CatalogBodyType {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().notNull().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  catalogModelGenerations = c.oneHasMany(CatalogModelGeneration, "bodyType");
  offers = c.oneHasMany(Offer, "bodyType");
}
