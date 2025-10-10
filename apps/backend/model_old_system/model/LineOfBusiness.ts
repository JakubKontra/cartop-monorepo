import { c } from "@contember/schema-definition";
import { Customer } from "./Customer";
import { publicRole } from "./acl";

@c.Allow(publicRole, {
  read: true,
})
export class UserLineOfBusiness {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  customers = c.oneHasMany(Customer, "lineOfBusiness");
}
