import { c } from "@contember/schema-definition";
import { Offer } from "./Offer/Offer";
import { publicRole } from "./acl";

@c.Allow(publicRole, {
  read: true,
})
export class CarType {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");

  offers = c.oneHasMany(Offer, "carType");
}
