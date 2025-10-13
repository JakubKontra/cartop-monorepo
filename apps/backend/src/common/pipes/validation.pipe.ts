import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ValidationError,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '../exceptions/types';
import { ExceptionKeysEnum } from '../exceptions/keys';
import { BaseExceptionError } from '../exceptions/base/base-exception-error';
import { getFieldSpecificErrorKey } from './validation-error-keys';

/**
 * Enhanced Validation Pipe for GraphQL
 * Validates DTOs and throws type-safe exceptions with error keys
 * Skips validation for null/undefined values (valid for optional fields)
 */
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype, data } = metadata;

    // IMPORTANT: Skip validation for GraphQL field resolvers
    // Field resolvers receive parent object and context, not input DTOs
    // We detect field resolvers by checking if the parameter name is common for GraphQL decorators
    // that should NOT be validated (@Parent, @Context, @Info, @Root)
    const isFieldResolverParam = data && ['parent', 'context', 'info', 'root'].includes(data.toLowerCase());

    if (isFieldResolverParam) {
      // This is a field resolver parameter - skip validation entirely
      return value;
    }

    // Skip validation if no metatype or if it's a native JavaScript type
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // CRITICAL: Skip validation for entity classes (TypeORM entities)
    // Entity classes should NEVER be validated as they are database models, not input DTOs
    // We detect entities by checking if the class has TypeORM decorators or entity naming patterns
    if (this.isEntityClass(metatype)) {
      return value;
    }

    // Skip validation for undefined/null values (they might be valid return values or optional fields)
    // Only validate actual input data
    if (value === undefined || value === null) {
      return value;
    }

    // Transform plain object to class instance
    const object = plainToInstance(metatype, value);

    // Validate the object
    const errors = await validate(object, {
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties exist
      transform: true, // Automatically transform payloads to DTO instances
    });

    if (errors.length > 0) {
      // Format validation errors into BaseExceptionError format
      const formattedErrors = this.formatValidationErrors(errors);

      throw new BadRequestException(
        ExceptionKeysEnum.VALIDATION_ERROR,
        formattedErrors,
      );
    }

    return object;
  }

  /**
   * Check if metatype should be validated
   */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  /**
   * Check if metatype is a TypeORM entity class
   * Entity classes should NOT be validated as they are database models, not input DTOs
   */
  private isEntityClass(metatype: Function): boolean {
    // Check if class name follows entity naming patterns
    // Entities typically don't have "Input", "Dto", or "Args" suffixes
    const className = metatype.name;

    // Skip validation for classes that look like entities (not DTOs)
    // DTOs typically end with: Input, Dto, Args, Params, Query, Body
    const isDtoPattern = /^.*?(Input|Dto|Args|Params|Query|Body)$/i.test(className);

    if (!isDtoPattern) {
      // This looks like an entity class, not a DTO
      // Examples: CatalogBrand, User, NewsletterSubscription
      return true;
    }

    return false;
  }

  /**
   * Format class-validator errors into BaseExceptionError format
   */
  private formatValidationErrors(
    errors: ValidationError[],
    parentPath = '',
  ): BaseExceptionError[] {
    const formattedErrors: BaseExceptionError[] = [];

    for (const error of errors) {
      const propertyPath = parentPath
        ? `${parentPath}.${error.property}`
        : error.property;

      // Handle nested validation errors
      if (error.children && error.children.length > 0) {
        formattedErrors.push(
          ...this.formatValidationErrors(error.children, propertyPath),
        );
      }

      // Handle direct validation errors
      if (error.constraints) {
        const constraintKeys = Object.keys(error.constraints);

        for (const constraintKey of constraintKeys) {
          // Get error key instead of hardcoded message
          const errorKey = getFieldSpecificErrorKey(
            error.property,
            constraintKey,
          );

          formattedErrors.push({
            key: errorKey,
            message: error.constraints[constraintKey], // Keep English message for debugging
            parent: propertyPath,
            jsonPayload: JSON.stringify({
              property: error.property,
              value: error.value,
              constraint: constraintKey,
            }),
          });
        }
      }
    }

    return formattedErrors;
  }
}
