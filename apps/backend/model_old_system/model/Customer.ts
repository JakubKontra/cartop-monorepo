import { c } from "@contember/schema-definition";
import { CarRequest } from "./CarRequest";
import { Email } from "./Email";
import { IndividualOffer } from "./IndividualOffer";
import { UserLineOfBusiness } from "./LineOfBusiness";
import { Person } from "./Person";
import { publicRole, salesRepresentativeRole } from "./acl";

@c.Allow(salesRepresentativeRole, {
  read: [
    "phone",
    "address",
    "city",
    "country",
    "postalCode",
    "personalBusinessId",
    "personalBusinessVatId",
    "carRequests",
    "person",
  ],
})
@c.Allow(publicRole, {
  create: true,
})
export class Customer {
  legacySystemId = c.stringColumn().nullable();
  createdAt = c.dateTimeColumn().notNull().default("now");
  email = c.stringColumn().nullable();

  phonePrefix = c.stringColumn().notNull().default("+420");
  phone = c.stringColumn();
  address = c.stringColumn();
  city = c.stringColumn();
  country = c.stringColumn();
  postalCode = c.stringColumn();

  isVip = c.boolColumn().nullable().default(false);

  personalBusinessVatId = c.stringColumn().nullable();
  personalBusinessId = c.stringColumn().nullable();

  dateOfBirth = c.dateColumn().nullable();
  legacyLogin = c.stringColumn().nullable();
  legacyIsComplete = c.boolColumn().nullable().default(false);
  legacyIsNewsletterSubscriber = c.boolColumn().nullable().default(false);
  legacyIsDeleted = c.boolColumn().nullable().default(false);
  lineOfBusiness = c.manyHasOne(UserLineOfBusiness, "customers");

  // Recommendation relationship
  recommendedBy = c.manyHasOne(Customer, "recommendedCustomers");
  recommendedCustomers = c.oneHasMany(Customer, "recommendedBy");

  // TODO COMPANY RELATIONSHIP IN FUTURE

  carRequests = c.oneHasMany(CarRequest, "customer");
  individualOffers = c.oneHasMany(IndividualOffer, "customer");
  person = c.oneHasOne(Person, "customerPerson");
  emails = c.oneHasMany(Email, "recipient");
}
