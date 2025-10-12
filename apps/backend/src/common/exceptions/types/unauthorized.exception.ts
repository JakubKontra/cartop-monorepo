import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../base';
import { BaseExceptionError } from '../base/base-exception-error';
import { ExceptionKeysEnum } from '../keys';

/**
 * Unauthorized Exception (401)
 * Used for authentication failures
 */
export class UnauthorizedException extends BaseException {
  constructor(
    key: ExceptionKeysEnum,
    errors: BaseExceptionError | BaseExceptionError[],
  ) {
    super(key, HttpStatus.UNAUTHORIZED, errors);
  }
}
