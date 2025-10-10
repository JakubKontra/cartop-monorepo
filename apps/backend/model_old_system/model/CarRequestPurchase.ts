import { c } from "@contember/schema-definition";
import { CarRequest } from "./CarRequest";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogEngine } from "./CatalogEngine";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { CatalogModelGenerationColor } from "./CatalogModelGenerationColor";
import { LeasingCompany } from "./LeasingCompany";
import { Person } from "./Person";
import { salesRepresentativeRole } from "./acl";

@c.Allow(salesRepresentativeRole, {
  read: true,
  create: true,
  update: true,
})
export class CarRequestPurchase {
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  updatedAt = c.dateTimeColumn().notNull().default("now");

  carRequest = c.manyHasOne(CarRequest, "purchases").notNull();

  finalPrice = c.doubleColumn().notNull();
  vin = c.stringColumn().nullable();

  buyerFirstName = c.stringColumn().notNull();
  buyerLastName = c.stringColumn().notNull();
  buyerEmail = c.stringColumn().notNull();
  buyerPhone = c.stringColumn().notNull();

  financingType = c.enumColumn(c.createEnum("cash", "leasing")).notNull();
  downPayment = c.doubleColumn().nullable();

  brand = c.manyHasOne(CatalogBrand).notNull();
  modelGeneration = c.manyHasOne(CatalogModelGeneration).notNull();
  engine = c.manyHasOne(CatalogEngine).notNull();
  color = c.manyHasOne(CatalogModelGenerationColor);
  leasingCompany = c
    .manyHasOne(LeasingCompany, "carRequestPurchases")
    .notNull();

  monthlyPayment = c.doubleColumn().nullable();
  leaseDuration = c.intColumn().nullable();
  leaseStart = c.dateColumn().nullable();

  notes = c.stringColumn().nullable();
  isActive = c.boolColumn().default(true).notNull();
  approvedBy = c.manyHasOne(Person, "approvedPurchases").notNull();
  reactivatedBy = c.manyHasOne(Person, "reactivatedPurchases");
  reactivatedAt = c.dateTimeColumn().nullable();
}
