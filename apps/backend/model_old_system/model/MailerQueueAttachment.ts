import { c } from "@contember/schema-definition";
import { MailerQueue } from "./MailerQueue";
import { File } from "./File";

export class MailerQueueAttachment {
  createdAt = c.dateTimeColumn().notNull().default("now");
  mailerQueue = c.manyHasOne(MailerQueue, "attachments").cascadeOnDelete();
  file = c.manyHasOne(File, "mailerQueueAttachments");
}
