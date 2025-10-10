import { c } from "@contember/schema-definition";
import { CarAvailability } from "../CarAvailability";
import { CarRequestLog } from "../CarRequestLog";
import { CarType } from "../CarType";
import { CatalogModel } from "../Catalog";
import { CatalogBodyType } from "../CatalogBodyType";
import { CatalogBrand } from "../CatalogBrand";
import { CatalogEngine } from "../CatalogEngine";
import { CatalogEquipment } from "../CatalogEquipment";
import { CatalogModelGeneration } from "../CatalogModelGeneration";
import { CatalogModelGenerationColor } from "../CatalogModelGenerationColor";
import { File } from "../File";
import { Gallery } from "../Image";
import { OfferLeasingDetails } from "../OfferLeasingDetails";
import { OfferSelectionItem } from "../OfferSelection";
import { VisitorEvent } from "../Visitor";
import { publicRole, salesRepresentativeRole } from "../acl";
export const financingTypeEnum = c.createEnum("cash", "leasing");

@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(publicRole, {
  when: { isPrivate: { eq: false } },
  read: true,
})
@c.Watch({
  name: "cache_offer_watch",
  watch: [
    "price",
    "slug",
    "isPrivate",
    "priority",
    "updatedAt",
    "year",
    "mileage",
  ],
  webhook:
    "https://42mrgkhg5nay73kzzb2heo5rau0pgdqs.lambda-url.eu-central-1.on.aws/cache/invalidate",
  selection: ["id", "publicId"],
})
export class Offer {
  isPrivate = c.boolColumn().default(false);
  publicId = c.stringColumn().nullable().unique();

  legacySystemId = c.stringColumn().nullable().unique();
  createdAt = c.dateTimeColumn().notNull().default("now");

  slug = c.stringColumn().notNull();

  price = c.intColumn().notNull();

  brand = c.manyHasOne(CatalogBrand, "offers").notNull();
  model = c.manyHasOne(CatalogModel, "offers").notNull();
  engine = c.manyHasOne(CatalogEngine, "offers").notNull();
  modelGeneration = c.manyHasOne(CatalogModelGeneration, "offers").notNull();

  // configuration

  equipment = c.manyHasOne(CatalogEquipment, "offers");

  gallery = c.manyHasOne(Gallery, "offers").setNullOnDelete();
  disableCustomGallery = c.boolColumn().default(false).nullable();

  updatedAt = c.dateTimeColumn().notNull();

  year = c.intColumn().nullable(); // REMOVE
  mileage = c.intColumn().nullable(); // REMOVE
  noteAdvertiser = c.stringColumn().nullable(); // REMOVE
  vin = c.stringColumn().nullable(); // REMOVE
  licensePlate = c.stringColumn().nullable(); // REMOVE
  vatDeduction = c.boolColumn().default(false); // REMOVE

  note = c.stringColumn().nullable();

  priority = c.boolColumn().default(false);

  insuranceParticipationPercent = c.intColumn();

  isActive = c.boolColumn().default(false);
  isRecommendedForBrand = c.boolColumn().default(false);
  isRecommendedForActionPage = c.boolColumn().default(false);
  isRecommendedForModel = c.boolColumn().default(false);

  isPromoted = c.boolColumn().default(false);

  isPreliminary = c.boolColumn().default(false);

  financingType = c.enumColumn(financingTypeEnum).notNull().default("cash");

  leasingDetails = c
    .oneHasMany(OfferLeasingDetails, "offer")
    .orderBy("isDefault", "desc");

  // je to leasingovka k leasingovce
  hasServiceIncluded = c.boolColumn().default(false);
  hasTyresIncluded = c.boolColumn().default(false);
  hasHighwayIncluded = c.boolColumn().default(false);
  hasAssistanceServiceIncluded = c.boolColumn().default(false);
  hasGapIncluded = c.boolColumn().default(false);
  // pojisteni skel
  // tolerance opotrebeni
  // volna hranice km
  // kdo je poskytovatel -> vzdycky stejne

  // additional
  hasTowbar = c.boolColumn().default(false);
  // wheelSize = c.intColumn();

  exteriorColor = c.manyHasOne(CatalogModelGenerationColor, "offersExterior");
  interiorColor = c.manyHasOne(CatalogModelGenerationColor, "offersInterior");

  availability = c.manyHasOne(CarAvailability, "offers");
  bodyType = c.manyHasOne(CatalogBodyType, "offers").setNullOnDelete();
  carType = c.manyHasOne(CarType, "offers");

  file = c.manyHasOne(File, "offerFile");

  selectionItems = c.oneHasMany(OfferSelectionItem, "offer");
  source = c.manyHasOne(OfferSource, "offers");

  deliveryWeeks = c.intColumn().nullable();

  viewCount = c.intColumn().nullable();
  requestCount = c.intColumn().default(0).nullable();
  activeStateChangeReason = c.stringColumn().nullable();

  priceWithoutVat = c.intColumn().notNull();
  priceWithVat = c.intColumn().notNull();
  originalPriceWithoutVat = c.intColumn().nullable();
  originalPriceWithVat = c.intColumn().nullable();
  originalPriceCalculated = c.intColumn().nullable();

  claim = c.stringColumn().nullable();
  emailInfo = c.stringColumn().nullable();

  events = c.oneHasMany(VisitorEvent, "offer");
  carRequestLogs = c.manyHasManyInverse(CarRequestLog, "offers");
}

export class OfferSource {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  offers = c.oneHasMany(Offer, "source");
}
