import { c } from "@contember/schema-definition";
import { CarRequest } from "./CarRequest";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { IndividualOffer } from "./IndividualOffer";
import { LeasingOffer } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { catalogManagerRole, publicRole, salesRepresentativeRole } from "./acl";

// @c.Unique("name") temorary disabled
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
export class CatalogModel {
  legacySystemId = c.stringColumn().nullable().unique();
  legacySlug = c.stringColumn().unique();
  slug = c.stringColumn().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  name = c.stringColumn().notNull();
  description = c.stringColumn();
  isActive = c.boolColumn().default(false);
  isHighlighted = c.boolColumn().default(false);
  isRecommended = c.boolColumn().default(false);
  brand = c.manyHasOne(CatalogBrand, "models").notNull().cascadeOnDelete();
  generations = c.oneHasMany(CatalogModelGeneration, "model");
  offers = c.oneHasMany(Offer, "model");
  individualOffers = c.oneHasMany(IndividualOffer, "model");
  leasingOffers = c.oneHasMany(LeasingOffer, "model");
  carRequests = c.oneHasMany(CarRequest, "model");
}
