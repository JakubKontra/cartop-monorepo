import { c } from "@contember/schema-definition";

export const customerServiceRole = c.createRole("customerService", {
  stages: "*",
});
export const publicRole = c.createRole("public", { stages: "*" });
export const marketingRole = c.createRole("marketing", { stages: "*" });
export const salesRepresentativeRole = c.createRole("salesRepresentative", {
  stages: "*",
});
export const juniorSalesRepresentativeRole = c.createRole(
  "juniorSalesRepresentative",
  { stages: "*" }
);
export const catalogManagerRole = c.createRole("catalogManager", {
  stages: "*",
});
