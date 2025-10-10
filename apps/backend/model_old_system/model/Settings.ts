import { c } from "@contember/schema-definition";

export class Settings {
  createdAt = c.dateTimeColumn().notNull().default("now");
  workerAPiKey = c.stringColumn();

  unique = c.enumColumn(c.createEnum("ONE")).unique();
}
