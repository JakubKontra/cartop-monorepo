import { c } from "@contember/schema-definition";

export const personRole = c.createEnum(
  "admin",
  "customerService",
  "marketing",
  "salesRepresentative",
  "juniorSalesRepresentative",
  "catalogManager",
  "customer"
);
