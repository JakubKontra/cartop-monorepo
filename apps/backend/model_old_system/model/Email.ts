import { c } from "@contember/schema-definition";
import { CarRequestLog } from "./CarRequestLog";
import { Customer } from "./Customer";
import { File } from "./File";

@c.Watch({
  name: "send_email_watch",
  watch: ["isDraft"],
  webhook: {
    url: "https://42mrgkhg5nay73kzzb2heo5rau0pgdqs.lambda-url.eu-central-1.on.aws/service/email/send",
  },
  selection: ["id", "isDraft", "isSent"],
})
export class Email {
  senderService = c.stringColumn().nullable();
  senderMessageIdentifier = c.stringColumn().nullable();

  senderName = c.stringColumn();
  senderEmail = c.stringColumn();
  bccEmail = c.stringColumn();
  recipient = c.manyHasOne(Customer, "emails");
  recipientEmail = c.stringColumn();
  createdAt = c.dateTimeColumn().default("now");

  attachments = c.oneHasMany(EmailAttachment, "email");

  subject = c.stringColumn().notNull();
  content = c.stringColumn();
  priority = c.intColumn();
  viewHash = c.stringColumn();
  isHtml = c.boolColumn().default(false);
  body = c.stringColumn();

  isDraft = c.boolColumn().default(true);
  isSent = c.boolColumn().default(false);
  sentAt = c.dateTimeColumn();

  carRequestLog = c.oneHasMany(CarRequestLog, "email");
}

export class EmailAttachment {
  file = c.manyHasOne(File);
  email = c.manyHasOne(Email, "attachments");
  createdAt = c.dateTimeColumn().default("now");
}
