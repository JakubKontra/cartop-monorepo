import { c } from "@contember/schema-definition";
import { MailerArchiveAttachment } from "./MailerArchiveAttachment";
import { MailerQueueAttachment } from "./MailerQueueAttachment";
import { LeasingOffer } from "./Offer/LeasingOffer";
import { Offer } from "./Offer/Offer";
import { publicRole, salesRepresentativeRole } from "./acl";

@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(publicRole, {
  read: ["url", "id", "meta"],
})
export class File {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  url = c.stringColumn();
  meta = c.oneHasOne(FileMetadata, "file");
  offerFile = c.oneHasMany(Offer, "file");
  leasingOfferFile = c.oneHasMany(LeasingOffer, "file");
  mailerArchiveAttachments = c.oneHasMany(MailerArchiveAttachment, "file");
  mailerQueueAttachments = c.oneHasMany(MailerQueueAttachment, "file");
}

@c.Allow(salesRepresentativeRole, {
  read: true,
})
export class FileMetadata {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  file = c.oneHasOneInverse(File, "meta");
  fileName = c.stringColumn();
  fileSize = c.intColumn();
  fileType = c.stringColumn();
  lastModified = c.dateTimeColumn();
}
