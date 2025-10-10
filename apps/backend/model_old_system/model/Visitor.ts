import { c } from "@contember/schema-definition";
import { LeasingOffer, LeasingOfferVariant } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { publicRole } from "./acl";

@c.Allow(publicRole, { read: true, update: true, create: true })
export class Visitor {
  userId = c.intColumn();
  cuid = c.stringColumn().notNull().unique();
  ip = c.stringColumn();
  userAgent = c.stringColumn();
  mobile = c.boolColumn().notNull();
  createdAt = c.dateTimeColumn().notNull();
  referrer = c.stringColumn();
  events = c.oneHasMany(VisitorEvent, "visitor");
  legacySystemId = c.stringColumn().nullable().unique();
}

@c.Allow(publicRole, { read: true, update: true, create: true })
export class VisitorEvent {
  visitor = c.manyHasOne(Visitor, "events");
  offer = c.manyHasOne(Offer, "events");
  leasingOffer = c.manyHasOne(LeasingOffer, "events");
  leasingOfferVariant = c.manyHasOne(LeasingOfferVariant, "events");
  type = c.stringColumn().notNull();
  url = c.stringColumn();
  ip = c.stringColumn();
  createdAt = c.dateTimeColumn().notNull();
  referrer = c.stringColumn();
}
