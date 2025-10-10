import { c } from "@contember/schema-definition";
import { CatalogModel } from "./Catalog";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogEngine } from "./CatalogEngine";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { CatalogModelGenerationColor } from "./CatalogModelGenerationColor";
import { Customer } from "./Customer";
import { salesRepresentativeRole } from "./acl";

@c.Allow(salesRepresentativeRole, {
  read: true,
})
export class IndividualOffer {
  isUrgent = c.boolColumn().default(false);
  customer = c.manyHasOne(Customer, "individualOffers");

  brand = c.manyHasOne(CatalogBrand, "individualOffers").notNull();
  model = c.manyHasOne(CatalogModel, "individualOffers").notNull();
  engine = c.manyHasOne(CatalogEngine, "individualOffers").notNull();
  modelGeneration = c
    .manyHasOne(CatalogModelGeneration, "individualOffers")
    .notNull();

  budgetTo = c.doubleColumn();
  budgetFrom = c.doubleColumn();
  leaseDuration = c.intColumn();
  leaseDurationTo = c.intColumn();
  leaseDurationFrom = c.intColumn();
  leaseStart = c.dateTimeColumn();
  leaseStartTo = c.dateTimeColumn();
  leaseStartFrom = c.dateTimeColumn();

  status = c.enumColumn(c.createEnum("NEW", "IN_PROGRESS", "COMPLETED"));

  createdAt = c.dateTimeColumn();
  updatedAt = c.dateTimeColumn().notNull().default("now");
  calculations = c.oneHasMany(OfferCalculation, "offer");
}

export class OfferCalculation {
  offer = c.manyHasOne(IndividualOffer, "calculations");

  availability = c
    .enumColumn(c.createEnum("IN_STOCK", "NOT_AVAILABLE"))
    .notNull()
    .default("IN_STOCK");

  interiorColor = c.manyHasOne(
    CatalogModelGenerationColor,
    "individualOfferCalculationInteriorColor"
  );
  exteriorColor = c.manyHasOne(
    CatalogModelGenerationColor,
    "individualOfferCalculationExteriorColor"
  );

  features = c.oneHasMany(CalculationFeature, "calculation");
  createdAt = c.dateTimeColumn();
}

export class CalculationFeature {
  calculation = c.manyHasOne(OfferCalculation, "features");
  featureName = c.stringColumn();
}

/*

Koupeno -> 


Poptávka -> Purcase

approvedBy: 

-> createdAt
-> finalniCena,
-> VIN => ??? (mozna nekdy nebo nikdy)

-> buyer telefone / email … balba

financovani
-> typ - cash / leasing - z puvodniho formulare ( moznost zmenit ).. 
downPayment

brand
modelGeneration
Motorizace / /// barva

monthly payment (16 300)
leaseDuration -> 32m
leaseStart: date

-> 3-4-5 … mesicu predem bude spamovats nabidkama , nebo ho nekoho priradi aby ho resil

vztahy -> obchodnik … blablabla




Poptavky -> Reqeuest
purchaseStatus ( in progress, complete, cancelled) 


	


honza > spanek -> driveto fotky



Individual nabidku
Obchodnik komunikuje se zakaznikem - nezavisle topeni tazne zarizeni 3 

Operativní Leasing SUV
Vyplňte své požadavky a my vám připravíme nabídku na míru





*/
