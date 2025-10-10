import { c } from "@contember/schema-definition";
import { CatalogColor } from "./CatalogColor";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { IndividualOffer, OfferCalculation } from "./IndividualOffer";
import { LeasingOffer, LeasingOfferColorVariant } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { catalogManagerRole, salesRepresentativeRole } from "./acl";

@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(catalogManagerRole, {
  read: true,
  create: true,
  update: true,
})
export class CatalogModelGenerationColor {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");

  offersExterior = c.oneHasMany(Offer, "exteriorColor");
  offersInterior = c.oneHasMany(Offer, "interiorColor");
  price = c.intColumn();

  leasingOfferColorVariantsExterior = c.oneHasMany(
    LeasingOfferColorVariant,
    "exteriorColor"
  );
  leasingOfferColorVariantsInterior = c.oneHasMany(
    LeasingOfferColorVariant,
    "interiorColor"
  );

  modelGeneration = c.manyHasOne(CatalogModelGeneration, "colors");
  catalogColor = c.manyHasOne(CatalogColor, "modelGenerationColors");
  individualOfferCalculationExteriorColor = c.oneHasMany(
    OfferCalculation,
    "exteriorColor"
  );
  individualOfferCalculationInteriorColor = c.oneHasMany(
    OfferCalculation,
    "interiorColor"
  );
}
