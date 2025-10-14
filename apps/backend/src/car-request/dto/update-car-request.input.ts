import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCarRequestInput } from './create-car-request.input';

/**
 * Update Car Request Input
 * All fields from CreateCarRequestInput are optional
 */
@InputType()
export class UpdateCarRequestInput extends PartialType(CreateCarRequestInput) {
  // All fields inherited as optional
}
