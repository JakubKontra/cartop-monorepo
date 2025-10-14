import { registerEnumType } from '@nestjs/graphql';

/**
 * Cancellation Reason Enum
 * Represents various reasons why a car request was cancelled
 */
export enum CancellationReason {
  // General reasons
  OTHER = 'other', // jiný důvod (upřesněn v cancellationNote)
  NO_INTEREST = 'no_interest', // ztratil zájem
  NO_TIME = 'no_time', // nemá čas to řešit
  NO_MONEY = 'no_money', // nedostatek financí
  NO_NEED = 'no_need', // už auto nepotřebuje
  NO_OPPORTUNITY = 'no_opportunity', // nevhodné načasování
  NO_OTHER = 'no_other', // jiný nevymezený důvod

  // Specific reasons for lease/purchase rejection
  REJECTED_BY_FINANCE = 'rejected_by_finance', // neschváleno financováním (např. leasing)
  BAD_CREDIT_SCORE = 'bad_credit_score', // špatná bonita / scoring
  INELIGIBLE_CUSTOMER = 'ineligible_customer', // zákazník nesplňuje podmínky
  PRICE_TOO_HIGH = 'price_too_high', // nabídka byla příliš drahá
  CAR_UNAVAILABLE = 'car_unavailable', // vozidlo již není dostupné
  WAIT_TIME_TOO_LONG = 'wait_time_too_long', // dlouhá dodací lhůta
  COMPETITOR_OFFER = 'competitor_offer', // vybral konkurenci
  CHANGED_MIND = 'changed_mind', // změna rozhodnutí

  // Internal / system reasons
  INVALID_CONTACT = 'invalid_contact', // neplatný kontakt / zákazník nedostupný
  DUPLICATE_REQUEST = 'duplicate_request', // duplicitní poptávka
  INTERNAL_ERROR = 'internal_error', // interní chyba / chyba v procesu
}

// Register enum for GraphQL
registerEnumType(CancellationReason, {
  name: 'CancellationReason',
  description: 'Reason why a car request was cancelled',
});
