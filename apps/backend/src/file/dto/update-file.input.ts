import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFileInput } from './create-file.input';

/**
 * Update File Input
 * All fields from CreateFileInput are optional
 */
@InputType()
export class UpdateFileInput extends PartialType(CreateFileInput) {
  // All fields inherited as optional
}
