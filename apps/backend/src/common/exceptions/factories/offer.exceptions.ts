import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '../types';
import { ExceptionKeysEnum } from '../keys';

/**
 * Offer Exception Factory
 * Provides type-safe exception creation for offer-related operations
 */
export const OfferExceptions = {
  /**
   * Thrown when offer is not found by ID
   */
  notFound: (offerId: string) =>
    new NotFoundException(ExceptionKeysEnum.OFFER_NOT_FOUND, {
      message: 'Offer not found',
      jsonPayload: JSON.stringify({ offerId }),
    }),

  /**
   * Thrown when user doesn't have access to offer
   */
  noAccess: (offerId: string, userId?: string) =>
    new ForbiddenException(ExceptionKeysEnum.OFFER_NO_ACCESS, {
      message: 'You do not have access to this offer',
      jsonPayload: JSON.stringify({ offerId, userId }),
    }),

  /**
   * Thrown when attempting to edit offer in non-editable state
   */
  notInEditableState: (offerId: string, currentState: string) =>
    new BadRequestException(ExceptionKeysEnum.OFFER_NOT_IN_EDITABLE_STATE, {
      message: 'Offer is not in an editable state',
      jsonPayload: JSON.stringify({ offerId, currentState }),
    }),

  /**
   * Thrown when attempting to modify already finished offer
   */
  alreadyFinished: (offerId: string) =>
    new BadRequestException(ExceptionKeysEnum.OFFER_ALREADY_FINISHED, {
      message: 'Offer has already been finished',
      jsonPayload: JSON.stringify({ offerId }),
    }),
};
