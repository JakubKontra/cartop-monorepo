import { InputType, PartialType } from '@nestjs/graphql';
import { CreateLeasingCompanyInput } from './create-leasing-company.input';

/**
 * Update Leasing Company Input
 * All fields from CreateLeasingCompanyInput are optional
 */
@InputType()
export class UpdateLeasingCompanyInput extends PartialType(CreateLeasingCompanyInput) {
  // All fields inherited as optional
}
