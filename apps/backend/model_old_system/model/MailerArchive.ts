import { c } from "@contember/schema-definition";
import { MailerArchiveAttachment } from "./MailerArchiveAttachment";

export class MailerArchive {
  createdAt = c.dateTimeColumn().notNull().default("now");
  sender = c.stringColumn().notNull();
  senderName = c.stringColumn();
  recipient = c.stringColumn().notNull();
  recipientName = c.stringColumn();
  recipientDomain = c.stringColumn();
  isHtml = c.boolColumn().default(false);
  priority = c.intColumn();
  viewHash = c.stringColumn();
  body = c.stringColumn().notNull();
  subject = c.stringColumn().notNull();
  content = c.stringColumn().notNull();
  sentAt = c.dateTimeColumn().notNull();
  recipientEmail = c.stringColumn().notNull();
  attachments = c.oneHasMany(MailerArchiveAttachment, "mailerArchive");
}
