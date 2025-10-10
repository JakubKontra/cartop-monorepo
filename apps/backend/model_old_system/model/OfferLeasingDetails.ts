import { c } from "@contember/schema-definition";
import { CarRequestLog } from "./CarRequestLog";
import { LeasingCompany } from "./LeasingCompany";
import { Offer } from "./Offer/Offer";
import { publicRole, salesRepresentativeRole } from "./acl";

@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(publicRole, {
  read: true,
})
export class OfferLeasingDetails {
  legacySystemId = c.stringColumn().nullable().unique();
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
  carRequestLogs = c.manyHasManyInverse(CarRequestLog, "leasingDetails");
  leasingCompany = c.manyHasOne(LeasingCompany, "leasingDetails");
}
