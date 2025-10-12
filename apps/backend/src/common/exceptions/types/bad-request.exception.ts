import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../base';
import { BaseExceptionError } from '../base/base-exception-error';
import { ExceptionKeysEnum } from '../keys';

/**
 * Bad Request Exception (400)
 * Used for validation errors and invalid input
 */
export class BadRequestException extends BaseException {
  constructor(
    key: ExceptionKeysEnum,
    errors: BaseExceptionError | BaseExceptionError[],
  ) {
    super(key, HttpStatus.BAD_REQUEST, errors);
  }
}
