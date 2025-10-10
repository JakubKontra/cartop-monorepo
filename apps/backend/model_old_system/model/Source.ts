import { c } from "@contember/schema-definition";
import { CarRequest } from "./CarRequest";
import { publicRole } from "./acl";

@c.Allow(publicRole, {
  read: ["id"],
})
export class CarRequestSource {
  name = c.stringColumn().notNull();
  code = c.stringColumn().unique();

  deals = c.oneHasMany(CarRequest, "source");

  legacySystemId = c.stringColumn().nullable().unique();
}
