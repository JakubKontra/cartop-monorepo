import { c } from "@contember/schema-definition";
import { CarRequest } from "./CarRequest";
import { CarRequestPurchase } from "./CarRequestPurchase";
import { Image } from "./Image";
import { LeasingOfferVariant } from "./Offer/LeasingOffer";
import { OfferLeasingDetails } from "./OfferLeasingDetails";
import { VisitorEvent } from "./Visitor";

export class LeasingCompany {
  name = c.stringColumn().notNull();
  image = c.manyHasOne(Image, "leasingCompanyImage");

  link = c.stringColumn();
  carRequests = c.oneHasMany(CarRequest, "leasingCompany");
  leasingDetails = c.oneHasMany(OfferLeasingDetails, "leasingCompany");
  carRequestPurchases = c.oneHasMany(CarRequestPurchase, "leasingCompany");
  leasingOfferVariants = c.oneHasMany(LeasingOfferVariant, "leasingCompany");
}

/**
 * 
@c.View(`
  SELECT 
    cr.created_at::date AS full_date,
    CONCAT(p.first_name, ' ', p.last_name) AS sales_representative_name,
    p.phone_number AS sales_representative_phone,
    lc.name AS leasing_company,
    COUNT(cr.id) AS successful_requests
FROM stage_live.car_request cr
JOIN stage_live.car_request_status crs ON cr.status_id = crs.id
LEFT JOIN stage_live.person p ON cr.sales_representative_id = p.id
LEFT JOIN stage_live.leasing_company lc ON cr.leasing_company_id = lc.id
WHERE crs.code IN ('relayed-to-dealer', 'purchased')
GROUP BY full_date, sales_representative_name, sales_representative_phone, leasing_company
ORDER BY full_date DESC;
`)
export class LeasingCompanySalesReport {
  fullDate = c.dateColumn();
  salesRepresentativeName = c.stringColumn();
  salesRepresentativePhone = c.stringColumn();
  leasingCompany = c.stringColumn();
  successfulRequests = c.intColumn();
}


 */
