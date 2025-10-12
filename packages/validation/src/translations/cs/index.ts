/**
 * Czech (cs) Translations Index
 * Central export point for all Czech error message translations
 */

import { userTranslations } from './user';
import { newsletterTranslations } from './newsletter';
import { brandTranslations } from './brand';
import { modelTranslations } from './model';
import { offerTranslations } from './offer';
import { leasingCompanyTranslations } from './leasing-company';
import { authTranslations } from './auth';
import { validationTranslations } from './validation';
import { genericTranslations } from './generic';

/**
 * All Czech translations combined into a single object
 * Keys match ExceptionKeysEnum from backend
 */
export const csTranslations = {
  ...userTranslations,
  ...newsletterTranslations,
  ...brandTranslations,
  ...modelTranslations,
  ...offerTranslations,
  ...leasingCompanyTranslations,
  ...authTranslations,
  ...validationTranslations,
  ...genericTranslations,
};

// Re-export individual translation objects for direct access if needed
export {
  userTranslations,
  newsletterTranslations,
  brandTranslations,
  modelTranslations,
  offerTranslations,
  leasingCompanyTranslations,
  authTranslations,
  validationTranslations,
  genericTranslations,
};
