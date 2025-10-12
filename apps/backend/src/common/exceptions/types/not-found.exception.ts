import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../base';
import { BaseExceptionError } from '../base/base-exception-error';
import { ExceptionKeysEnum } from '../keys';

/**
 * Not Found Exception (404)
 * Used when a requested resource doesn't exist
 */
export class NotFoundException extends BaseException {
  constructor(
    key: ExceptionKeysEnum,
    errors: BaseExceptionError | BaseExceptionError[],
  ) {
    super(key, HttpStatus.NOT_FOUND, errors);
  }
}
