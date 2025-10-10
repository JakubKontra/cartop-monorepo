import { c } from "@contember/schema-definition";
import { MailerQueueAttachment } from "./MailerQueueAttachment";
import { CarRequestLog } from "./CarRequestLog";

export class MailerQueue {
  createdAt = c.dateTimeColumn().notNull().default("now");
  subject = c.stringColumn().notNull();
  sender = c.stringColumn().notNull();
  senderName = c.stringColumn();
  recipient = c.stringColumn().notNull();
  recipientName = c.stringColumn();
  recipientDomain = c.stringColumn();
  isHtml = c.boolColumn().default(false);
  priority = c.intColumn();
  viewHash = c.stringColumn();
  body = c.stringColumn().notNull();
  failedAt = c.dateTimeColumn();
  attachments = c.oneHasMany(MailerQueueAttachment, "mailerQueue");
}
