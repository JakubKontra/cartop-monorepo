import { c } from "@contember/schema-definition";
import { Image } from "./Image";
import { Offer } from "./Offer/Offer";
import { publicRole } from "./acl";
@c.Allow(publicRole, {
  read: true,
})
export class OfferSelection {
  createdAt = c.dateTimeColumn().notNull().default("now");
  title = c.stringColumn().notNull();
  subTitle = c.stringColumn().notNull();
  description = c.stringColumn().notNull();
  validFrom = c.dateTimeColumn().notNull();
  validTo = c.dateTimeColumn().notNull();
  isActive = c.boolColumn().notNull().default(false);
  priority = c.intColumn().notNull();
  image = c.manyHasOne(Image, "offerSelectionImage");
  items = c.oneHasMany(OfferSelectionItem, "selection");
}

@c.Allow(publicRole, {
  read: true,
})
export class OfferSelectionItem {
  selection = c.manyHasOne(OfferSelection, "items");
  offer = c.manyHasOne(Offer, "selectionItems");
  priority = c.intColumn().notNull();
}
