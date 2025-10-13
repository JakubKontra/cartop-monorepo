import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Base Exception Error
 * GraphQL type for error details
 */
@ObjectType({
  description: 'Detailed error information for validation and business logic errors',
})
export class BaseExceptionError {
  @Field({
    nullable: true,
    description: 'Translation key for this specific field error (e.g., VALIDATION_EMAIL_INVALID)',
  })
  key?: string;

  @Field({
    description: 'Human-readable error message (in English, for debugging)',
  })
  message: string;

  @Field({
    nullable: true,
    description: 'Optional JSON payload with additional error context',
  })
  jsonPayload?: string;

  @Field({
    nullable: true,
    description: 'Parent field path for nested validation errors (e.g., "address.street")',
  })
  parent?: string;
}
