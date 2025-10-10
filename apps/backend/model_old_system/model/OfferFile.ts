import { c } from "@contember/schema-definition";
import { Offer } from "./Offer/Offer";
import { salesRepresentativeRole } from "./acl";

@c.Allow(salesRepresentativeRole, {
  read: true,
})
export class OfferLeasingDetails {
  createdAt = c.dateTimeColumn().notNull().default("now");
  offer = c.manyHasOne(Offer, "leasingDetails");
  annualMileage = c.intColumn();
  leaseDuration = c.intColumn();
  priceWithVat = c.intColumn();
  priceWithoutVat = c.intColumn();
  isDefault = c.boolColumn().default(false);
  hasTyresIncluded = c.boolColumn().default(false);
  hasHighwayIncluded = c.boolColumn().default(false);
  hasAssistanceServiceIncluded = c.boolColumn().default(false);
  hasServiceIncluded = c.boolColumn().default(false);
  hasGapIncluded = c.boolColumn().default(false);
  slug = c.stringColumn().notNull();
}
