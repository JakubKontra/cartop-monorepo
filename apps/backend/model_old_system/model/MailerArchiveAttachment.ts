import { c } from "@contember/schema-definition";
import { MailerArchive } from "./MailerArchive";
import { File } from "./File";

export class MailerArchiveAttachment {
  createdAt = c.dateTimeColumn().notNull().default("now");
  mailerArchive = c.manyHasOne(MailerArchive, "attachments").cascadeOnDelete();
  file = c.manyHasOne(File, "mailerArchiveAttachments");
}
