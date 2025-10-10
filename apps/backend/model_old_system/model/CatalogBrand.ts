import { c } from "@contember/schema-definition";
import { CarOutbuyRequest } from "./CarOutbuyRequest";
import { CarRequest } from "./CarRequest";
import { CatalogModel } from "./Catalog";
import { CatalogBrandEquipment } from "./CatalogBrandEquipment";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { HomepagePromo } from "./HomepagePromo";
import { Image } from "./Image";
import { IndividualOffer } from "./IndividualOffer";
import { LeasingOffer } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { catalogManagerRole, publicRole, salesRepresentativeRole } from "./acl";

@c.Allow(publicRole, { read: true })
@c.Allow(salesRepresentativeRole, { read: true })
@c.Allow(catalogManagerRole, { read: true, create: true, update: true })
@c.Watch({
  name: "cache_catalog_brand_watch",
  watch: [
    "name",
    "slug",
    "isActive",
    "isHighlighted",
    "isRecommended",
    "description",
  ],
  webhook:
    "https://42mrgkhg5nay73kzzb2heo5rau0pgdqs.lambda-url.eu-central-1.on.aws/cache/invalidate",
  selection: ["id"],
})
export class CatalogBrand {
  legacySystemId = c.stringColumn().nullable().unique();

  updatedAt = c.dateTimeColumn().nullable();
  createdAt = c.dateTimeColumn().notNull().default("now");
  slug = c.stringColumn().unique();
  legacySlug = c.stringColumn().unique();

  description = c.stringColumn();
  isActive = c.boolColumn().default(false);
  isHighlighted = c.boolColumn().default(false);
  isRecommended = c.boolColumn().default(false);
  isVisibleOnKanban = c.boolColumn().default(false);
  name = c.stringColumn().notNull();

  models = c.oneHasMany(CatalogModel, "brand");
  catalogModelGenerations = c.oneHasMany(CatalogModelGeneration, "brand");
  equipments = c.oneHasMany(CatalogBrandEquipment, "catalogBrand");
  offers = c.oneHasMany(Offer, "brand");
  leasingOffers = c.oneHasMany(LeasingOffer, "brand");
  individualOffers = c.oneHasMany(IndividualOffer, "brand");
  carRequests = c.oneHasMany(CarRequest, "brand");
  carOutbuyRequests = c.oneHasMany(CarOutbuyRequest, "brand");
  homepagePromos = c.oneHasMany(HomepagePromo, "brand");
  image = c.manyHasOne(Image, "catalogBrandImage");
}
