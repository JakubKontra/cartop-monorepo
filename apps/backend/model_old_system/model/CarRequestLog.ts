import { c } from "@contember/schema-definition";
import { CarRequest } from "./CarRequest";
import { Email } from "./Email";

import { LeasingOfferVariant } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { OfferLeasingDetails } from "./OfferLeasingDetails";
import { Person } from "./Person";
import { salesRepresentativeRole } from "./acl";

@c.Allow(salesRepresentativeRole, {
  read: true,
})
export class CarRequestLog {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  message = c.stringColumn().notNull();
  carRequest = c.manyHasOne(CarRequest, "logs").cascadeOnDelete();
  offers = c.manyHasMany(Offer, "carRequestLogs"); // fix offer onlyone
  leasingDetails = c.manyHasMany(OfferLeasingDetails, "carRequestLogs");
  leasingOfferVariants = c.manyHasMany(LeasingOfferVariant, "carRequestLogs");
  salesRepresentative = c.manyHasOne(
    Person,
    "carRequestLogSalesRepresentative"
  ); // author_id

  hasEmail = c.boolColumn().nullable().default(false);
  email = c.manyHasOne(Email, "carRequestLog").setNullOnDelete();
}
