import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../base';
import { BaseExceptionError } from '../base/base-exception-error';
import { ExceptionKeysEnum } from '../keys';

/**
 * Forbidden Exception (403)
 * Used for authorization failures (user is authenticated but lacks permission)
 */
export class ForbiddenException extends BaseException {
  constructor(
    key: ExceptionKeysEnum,
    errors: BaseExceptionError | BaseExceptionError[],
  ) {
    super(key, HttpStatus.FORBIDDEN, errors);
  }
}
