/**
 * Exception Factories Index
 * Central export point for all exception factories
 *
 * Usage:
 * import { UserExceptions, NewsletterExceptions } from '@/common/exceptions/factories';
 *
 * throw UserExceptions.duplicateEmail('user@example.com');
 * throw NewsletterExceptions.alreadySubscribed('user@example.com');
 */

export { UserExceptions } from './user.exceptions';
export { NewsletterExceptions } from './newsletter.exceptions';
export { BrandExceptions } from './brand.exceptions';
export { ModelExceptions } from './model.exceptions';
export { OfferExceptions } from './offer.exceptions';
export { LeasingCompanyExceptions } from './leasing-company.exceptions';
export { AuthExceptions } from './auth.exceptions';
