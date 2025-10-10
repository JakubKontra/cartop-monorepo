import { c } from "@contember/schema-definition";
import { CarRequest, CarRequestStateLog } from "./CarRequest";
import { CarRequestLog } from "./CarRequestLog";
import { CarRequestPurchase } from "./CarRequestPurchase";
import { Customer } from "./Customer";
import { ProfilePicture } from "./Image";
import {
  catalogManagerRole,
  customerServiceRole,
  juniorSalesRepresentativeRole,
  salesRepresentativeRole,
} from "./acl";
import { personRole } from "./enum";

@c.Allow(customerServiceRole, {
  read: true,
})
@c.Allow(catalogManagerRole, {
  read: true,
})
@c.Allow(juniorSalesRepresentativeRole, {
  read: true,
})
@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Unique("email")
export class Person {
  legacySystemId = c.stringColumn();
  legacyAdminSystemId = c.stringColumn();
  createdAt = c.dateTimeColumn().notNull().default("now");
  updatedAt = c.dateTimeColumn().notNull().default("now");
  firstName = c.stringColumn();
  lastName = c.stringColumn();
  email = c.stringColumn();
  phone = c.stringColumn();
  subordinates = c.oneHasMany(Person, "supervisor");
  supervisor = c.manyHasOne(Person, "subordinates");
  profilePicture = c.manyHasOne(ProfilePicture, "person");
  role = c.enumColumn(personRole);
  personId = c.uuidColumn().unique();
  tenantPerson = c.oneHasOneInverse(TenantPerson, "person");

  phonePrefix = c.stringColumn();
  phoneNumber = c.stringColumn();

  customerPerson = c.oneHasOneInverse(Customer, "person");

  carRequestSalesRepresentative = c.oneHasOneInverse(
    CarRequest,
    "salesRepresentative"
  );
  carRequestLogSalesRepresentative = c.oneHasMany(
    CarRequestLog,
    "salesRepresentative"
  );

  carRequestStateLogs = c.oneHasMany(CarRequestStateLog, "changedBy");
  approvedPurchases = c.oneHasMany(CarRequestPurchase, "approvedBy");
  reactivatedPurchases = c.oneHasMany(CarRequestPurchase, "reactivatedBy");
}

@c.View(`
	SELECT tenant_person.id,
		   tenant_person.identity_id,
		   tenant_person.email,
		   content_person.id AS person_id,
		   STRING_AGG(DISTINCT project_membership.role, ', ') AS roles
	  FROM person AS content_person
		FULL OUTER JOIN tenant.person AS tenant_person ON tenant_person.id = content_person.person_id
		LEFT JOIN tenant.identity AS tenant_identity ON tenant_person.identity_id = tenant_identity.id
		LEFT JOIN tenant.project_membership AS project_membership ON tenant_identity.id = project_membership.identity_id
	WHERE tenant_person.id IS NOT NULL
	GROUP BY tenant_person.id, content_person.id
`)
export class TenantPerson {
  createdAt = c.dateTimeColumn().notNull().default("now");
  identityId = c.uuidColumn().notNull();
  email = c.stringColumn();
  otpUri = c.stringColumn();
  otpActivatedAt = c.stringColumn();
  idpOnly = c.stringColumn();
  roles = c.stringColumn();
  person = c.oneHasOne(Person, "tenantPerson");
}
