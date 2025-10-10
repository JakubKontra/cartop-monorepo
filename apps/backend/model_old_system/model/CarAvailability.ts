import { c } from "@contember/schema-definition";
import { Offer } from "./Offer/Offer";
import { publicRole } from "./acl";

@c.Allow(publicRole, {
  read: true,
})
export class CarAvailability {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().notNull().unique();
  createdAt = c.dateTimeColumn().notNull().default("now");

  offers = c.oneHasMany(Offer, "availability");
}
