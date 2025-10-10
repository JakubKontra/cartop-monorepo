import { c } from "@contember/schema-definition";
import { CatalogBrand } from "./CatalogBrand";
import { Image } from "./Image";
import { publicRole, salesRepresentativeRole } from "./acl";
@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(publicRole, {
  read: true,
})
@c.Watch({
  name: "cache_homepage_promo_watch",
  watch: [
    "title",
    "subtitle",
    "url",
    "active",
    "activeFrom",
    "activeTo",
    "priority",
  ],
  webhook:
    "https://42mrgkhg5nay73kzzb2heo5rau0pgdqs.lambda-url.eu-central-1.on.aws/cache/invalidate",
  selection: ["id"],
})
export class HomepagePromo {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  brand = c.manyHasOne(CatalogBrand, "homepagePromos").setNullOnDelete();
  title = c.stringColumn();
  subtitle = c.stringColumn();
  url = c.stringColumn();
  active = c.boolColumn().default(false);
  activeFrom = c.dateTimeColumn();
  activeTo = c.dateTimeColumn();
  priority = c.intColumn();
  image = c.manyHasOne(Image, "homepagePromoImage");
  mobileImage = c.manyHasOne(Image, "homepagePromoMobileImage");
}
