import { c } from "@contember/schema-definition";
import { CarRequestLog } from "../CarRequestLog";
import { CatalogModel } from "../Catalog";
import { CatalogBrand } from "../CatalogBrand";
import { CatalogEngine } from "../CatalogEngine";
import { CatalogEquipment } from "../CatalogEquipment";
import { CatalogModelGeneration } from "../CatalogModelGeneration";
import { CatalogModelGenerationColor } from "../CatalogModelGenerationColor";
import { File } from "../File";
import { Gallery } from "../Image";
import { LeasingCompany } from "../LeasingCompany";
import { VisitorEvent } from "../Visitor";

export class LeasingOfferAdditionalEquipmentItem {
  name = c.stringColumn().notNull(); // tazné zarízeni ; nezavisle topeni

  optionalEquipment = c.oneHasMany(
    LeasingOfferOptionalEquipment,
    "optionalEquipment"
  );
}

export class LeasingOfferOptionalEquipment {
  leasingOffer = c.manyHasOne(LeasingOffer, "additionalEquipment");
  optionalEquipment = c.manyHasOne(
    LeasingOfferAdditionalEquipmentItem,
    "optionalEquipment"
  );

  additionalPrice = c.intColumn();
  createdAt = c.dateTimeColumn().notNull().default("now");
}

export class LeasingOfferColorVariant {
  leasingOffer = c.manyHasOne(LeasingOffer, "colorVariants").notNull();

  exteriorColor = c
    .manyHasOne(
      CatalogModelGenerationColor,
      "leasingOfferColorVariantsExterior"
    )
    .notNull();
  interiorColor = c
    .manyHasOne(
      CatalogModelGenerationColor,
      "leasingOfferColorVariantsInterior"
    )
    .notNull();

  gallery = c
    .manyHasOne(Gallery, "leasingOfferColorVariants")
    .setNullOnDelete();

  // Custom name for the color combination (e.g., "Metallic Blue + Black Leather")
  colorName = c.stringColumn();
  isDefault = c.boolColumn().default(false);

  createdAt = c.dateTimeColumn().notNull().default("now");
  updatedAt = c.dateTimeColumn().notNull().default("now");
}

export class LeasingOffer {
  legacySystemId = c.stringColumn().nullable().unique();
  publicId = c.stringColumn().nullable().unique();
  isPrivate = c.boolColumn().default(false);

  slug = c.stringColumn().notNull();

  brand = c.manyHasOne(CatalogBrand, "leasingOffers").notNull();
  model = c.manyHasOne(CatalogModel, "leasingOffers").notNull();
  engine = c.manyHasOne(CatalogEngine, "leasingOffers").notNull();
  modelGeneration = c
    .manyHasOne(CatalogModelGeneration, "leasingOffers")
    .notNull();
  equipment = c.manyHasOne(CatalogEquipment, "leasingOffers");

  file = c.manyHasOne(File, "leasingOfferFile");
  createdAt = c.dateTimeColumn().notNull().default("now");

  additionalEquipment = c.oneHasMany(
    LeasingOfferOptionalEquipment,
    "leasingOffer"
  );

  isActive = c.boolColumn().default(false);
  isRecommendedForBrand = c.boolColumn().default(false);
  isRecommendedForActionPage = c.boolColumn().default(false);
  isRecommendedForModel = c.boolColumn().default(false);
  isPromoted = c.boolColumn().default(false);

  disableCustomGallery = c.boolColumn().default(false).nullable();
  note = c.stringColumn().nullable();

  colorVariants = c.oneHasMany(LeasingOfferColorVariant, "leasingOffer");

  variants = c.oneHasMany(LeasingOfferVariant, "leasingOffer");
  events = c.oneHasMany(VisitorEvent, "leasingOffer");
}

export class LeasingOfferVariant {
  leasingOffer = c.manyHasOne(LeasingOffer, "variants");

  createdAt = c.dateTimeColumn().notNull().default("now");

  leasingCompany = c.manyHasOne(LeasingCompany, "leasingOfferVariants");

  annualMileage = c.intColumn().notNull().default(10000);
  leaseDuration = c.intColumn().notNull().default(24);

  priceWithVat = c.intColumn().notNull();
  priceWithoutVat = c.intColumn().notNull();
  originalPriceWithoutVat = c.intColumn().nullable();
  originalPriceWithVat = c.intColumn().nullable();

  isDefault = c.boolColumn().default(false);

  // top nabidka
  isBestOffer = c.boolColumn().default(false);

  slug = c.stringColumn().notNull();
  carRequestLogs = c.manyHasManyInverse(CarRequestLog, "leasingOfferVariants");

  // servis
  hasServiceIncluded = c.boolColumn().default(true);

  // asistencni sluzba
  hasAssistanceServiceIncluded = c.boolColumn().default(true);

  // Pojištění skel
  hasGlassInsuranceIncluded = c.boolColumn().default(true);

  // gap
  hasGapIncluded = c.boolColumn().default(false);

  // zimni pneu
  hasWinterTyresIncluded = c.boolColumn().default(false);

  // dalnicni znamka
  hasHighwayIncluded = c.boolColumn().default(false);

  // Tolerance opotřebení (např. procenta nebo stupně)
  wearTolerance = c.boolColumn().default(false);

  // Volná hranice km (rozdíl oproti sjednanému nájezdu, např. +2000 km)
  freeMileageLimit = c.intColumn().default(0).nullable();

  events = c.oneHasMany(VisitorEvent, "leasingOfferVariant");
}
