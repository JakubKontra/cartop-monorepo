import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionKeysEnum } from '../keys';
import { BaseExceptionError } from './base-exception-error';

/**
 * Base Exception
 * All custom exceptions extend this class
 * Provides consistent error structure with error keys for frontend translation
 */
export class BaseException extends HttpException {
  private readonly errors: BaseExceptionError[];

  constructor(
    public readonly key: ExceptionKeysEnum,
    status: HttpStatus,
    errors: BaseExceptionError | BaseExceptionError[],
  ) {
    super(key, status);

    this.errors = Array.isArray(errors) ? errors : [errors];
  }

  /**
   * Get the exception key for frontend translation
   */
  public getKey(): ExceptionKeysEnum {
    return this.key;
  }

  /**
   * Get detailed error information
   */
  public getErrors(): BaseExceptionError[] {
    return this.errors;
  }

  /**
   * Get the error payload for GraphQL responses
   */
  public getPayload(): {
    key: ExceptionKeysEnum;
    errors: BaseExceptionError[];
  } {
    return {
      key: this.key,
      errors: this.errors,
    };
  }
}
