import { c } from "@contember/schema-definition";
import { salesRepresentativeRole } from "./acl";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { CatalogEngine } from "./CatalogEngine";

@c.Allow(salesRepresentativeRole, {
  read: true,
})
export class CarOutbuyRequest {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  name = c.stringColumn().notNull();
  email = c.stringColumn().notNull();
  phone = c.stringColumn().notNull();
  note = c.stringColumn();
  brand = c.manyHasOne(CatalogBrand, "carOutbuyRequests").setNullOnDelete();
  modelGeneration = c
    .manyHasOne(CatalogModelGeneration, "carOutbuyRequests")
    .setNullOnDelete();
  engine = c.manyHasOne(CatalogEngine, "carOutbuyRequests").setNullOnDelete();
  manufacturerYear = c.intColumn();
  vin = c.stringColumn().nullable();
  annualMileage = c.intColumn();
  state = c.stringColumn();
  priority = c.intColumn();
}
