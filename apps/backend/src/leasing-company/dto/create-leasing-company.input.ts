import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength, IsUUID, IsUrl } from 'class-validator';

/**
 * Create Leasing Company Input
 */
@InputType()
export class CreateLeasingCompanyInput {
  @Field()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  link?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  logoId?: string;
}
