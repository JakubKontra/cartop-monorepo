import { c } from "@contember/schema-definition";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { CatalogModelGenerationColor } from "./CatalogModelGenerationColor";
import { HomepagePromo } from "./HomepagePromo";
import { LeasingCompany } from "./LeasingCompany";
import { LeasingOffer, LeasingOfferColorVariant } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { OfferSelection } from "./OfferSelection";
import { Person } from "./Person";
import { catalogManagerRole, publicRole, salesRepresentativeRole } from "./acl";

const galleryType = c.createEnum("view360", "exterior", "interior", "common");
@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(catalogManagerRole, {
  read: true,
  create: true,
  update: true,
})
@c.Allow(publicRole, {
  read: true,
})
export class Gallery {
  createdAt = c.dateTimeColumn().notNull().default("now");
  items = c.oneHasMany(GalleryImage, "gallery");
  catalogModelGeneration = c
    .manyHasOne(CatalogModelGeneration, "gallery")
    .setNullOnDelete();

  leasingOfferColorVariants = c.oneHasMany(LeasingOfferColorVariant, "gallery");

  type = c.enumColumn(galleryType).nullable();
  offers = c.oneHasMany(Offer, "gallery");
}

@c.Allow(publicRole, {
  read: true,
})
@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(catalogManagerRole, {
  read: true,
  create: true,
  update: true,
})
export class GalleryImage {
  order = c.intColumn().notNull();
  gallery = c.manyHasOne(Gallery, "items").notNull().cascadeOnDelete();
  image = c.manyHasOne(Image, "galleries").notNull().cascadeOnDelete();
}

@c.Allow(publicRole, {
  read: true,
})
export class Image {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  url = c.stringColumn().notNull();
  width = c.intColumn();
  height = c.intColumn();
  alt = c.stringColumn();
  meta = c.oneHasOne(ImageMetadata, "image");
  galleries = c.oneHasMany(GalleryImage, "image");
  catalogBrandImage = c.oneHasMany(CatalogBrand, "image");
  leasingCompanyImage = c.oneHasMany(LeasingCompany, "image");
  offerSelectionImage = c.oneHasMany(OfferSelection, "image");
  homepagePromoImage = c.oneHasMany(HomepagePromo, "image");
  homepagePromoMobileImage = c.oneHasMany(HomepagePromo, "mobileImage");
  profilePicture = c.oneHasMany(ProfilePicture, "image");
}

export class ProfilePicture {
  createdAt = c.dateTimeColumn().notNull().default("now");
  image = c.manyHasOne(Image, "profilePicture");
  person = c.oneHasMany(Person, "profilePicture");
}
@c.Allow(publicRole, {
  read: true,
})
@c.Allow(salesRepresentativeRole, {
  read: true,
})
export class ImageMetadata {
  createdAt = c.dateTimeColumn().notNull().default("now");
  image = c.oneHasOneInverse(Image, "meta");
  fileName = c.stringColumn();
  lastModified = c.dateTimeColumn();
  fileSize = c.intColumn();
  fileType = c.stringColumn();
}
