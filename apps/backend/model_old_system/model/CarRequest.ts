import { c } from "@contember/schema-definition";
import { CarRequestLog } from "./CarRequestLog";
import { CarRequestPurchase } from "./CarRequestPurchase";
import { CatalogModel } from "./Catalog";
import { CatalogBrand } from "./CatalogBrand";
import { CatalogEngine } from "./CatalogEngine";
import { CatalogModelGeneration } from "./CatalogModelGeneration";
import { Customer } from "./Customer";
import { LeasingCompany } from "./LeasingCompany";
import { Person } from "./Person";
import { CarRequestSource } from "./Source";
import {
  customerServiceRole,
  publicRole,
  salesRepresentativeRole,
} from "./acl";

@c.Allow(publicRole, {
  create: [
    "legacySystemId",
    "financingType",
    "createdAt",
    "status",
    "notes",
    "customer",
    "brand",
    "gclid",
    "source",
    "model",
    "modelGeneration",
    "engine",
    "requestEmail",
    "requestPhone",
    "requestFirstName",
    "requestLastName",
    "requestNewsletter",
  ],
})
@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(salesRepresentativeRole, {
  when: { status: { isFinal: { eq: false } } },
  update: true,
})
@c.Allow(salesRepresentativeRole, {
  create: true,
})
@c.Allow(customerServiceRole, {
  read: true,
  update: true,
  create: true,
})
@c.Watch({
  name: "send_status_watch",
  watch: `
    id
    state {
      id
      name
    }
  `,
  webhook:
    "https://42mrgkhg5nay73kzzb2heo5rau0pgdqs.lambda-url.eu-central-1.on.aws/car-request/status-update",
  selection: `
    id
    state {
      id
      name
    }
  `,
})
export class CarRequest {
  isFromLegacySystem = c.boolColumn().default(false);
  legacySystemId = c.stringColumn().nullable().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");
  notes = c.stringColumn();
  financingType = c
    .enumColumn(c.createEnum("cash", "leasing"))
    .notNull()
    .default("cash");

  requestEmail = c.stringColumn().nullable();
  requestPhone = c.stringColumn().nullable();
  requestFirstName = c.stringColumn().nullable();
  requestLastName = c.stringColumn().nullable();
  requestNewsletter = c.boolColumn().nullable();
  requestPostalCode = c.stringColumn().nullable();

  customer = c.manyHasOne(Customer, "carRequests");
  brand = c.manyHasOne(CatalogBrand, "carRequests").setNullOnDelete();
  model = c.manyHasOne(CatalogModel, "carRequests").setNullOnDelete();
  leasingCompany = c.manyHasOne(LeasingCompany, "carRequests");
  engine = c.manyHasOne(CatalogEngine, "carRequests").setNullOnDelete();
  modelGeneration = c
    .manyHasOne(CatalogModelGeneration, "carRequests")
    .setNullOnDelete();

  order = c.intColumn();
  gclid = c.stringColumn();
  noteInternal = c.stringColumn();
  completedAt = c.dateTimeColumn();
  nextCallAt = c.dateTimeColumn();
  confirmedAt = c.dateTimeColumn();
  relayedAt = c.dateTimeColumn();
  feedbackAt = c.dateTimeColumn();
  closedAt = c.dateTimeColumn();
  waitingForOffer = c.boolColumn();
  displayOrder = c.intColumn().default(0);
  cancellationReason = c.enumColumn(
    c.createEnum(
      "other", // jiný důvod (upřesněn v cancellationNote)
      "no_interest", // ztratil zájem
      "no_time", // nemá čas to řešit
      "no_money", // nedostatek financí
      "no_need", // už auto nepotřebuje
      "no_opportunity", // nevhodné načasování
      "no_other", // jiný nevymezený důvod

      // Specifické důvody pro odmítnutí leasingu/koupě
      "rejected_by_finance", // neschváleno financováním (např. leasing)
      "bad_credit_score", // špatná bonita / scoring
      "ineligible_customer", // zákazník nesplňuje podmínky
      "price_too_high", // nabídka byla příliš drahá
      "car_unavailable", // vozidlo již není dostupné
      "wait_time_too_long", // dlouhá dodací lhůta
      "competitor_offer", // vybral konkurenci
      "changed_mind", // změna rozhodnutí

      // Interní / systémové důvody
      "invalid_contact", // neplatný kontakt / zákazník nedostupný
      "duplicate_request", // duplicitní poptávka
      "internal_error" // interní chyba / chyba v procesu
    )
  );

  cancellationNote = c.stringColumn();
  logs = c.oneHasMany(CarRequestLog, "carRequest");
  salesRepresentative = c.oneHasOne(Person, "carRequestSalesRepresentative");
  modifiedAt = c.dateTimeColumn().notNull().default("now");
  source = c.manyHasOne(CarRequestSource, "deals");
  status = c.manyHasOne(CarRequestStatus);
  state = c.manyHasOne(CarRequestState);
  stateLogs = c.oneHasMany(CarRequestStateLog, "carRequest");
  purchases = c.oneHasMany(CarRequestPurchase, "carRequest");
}

export class CarRequestStatus {
  name = c.stringColumn().notNull();
  code = c.stringColumn().notNull().unique();
  columnDisplayOrder = c.intColumn().default(0);
  displayOrder = c.intColumn().default(0);
  isFinal = c.boolColumn().default(false).notNull();
  colorHex = c.stringColumn();
}

export class CarRequestState {
  name = c.stringColumn().notNull();
  colorHex = c.stringColumn();
  code = c.stringColumn().notNull().unique();
}

export class CarRequestStateLog {
  carRequest = c.manyHasOne(CarRequest, "stateLogs").notNull();
  state = c.manyHasOne(CarRequestState).notNull();

  changedAt = c.dateTimeColumn().notNull().default("now");
  changedBy = c.manyHasOne(Person, "carRequestStateLogs");

  note = c.stringColumn().nullable();
}
