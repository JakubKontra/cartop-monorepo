import { InputType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateCalculationItemInput {
  @Field()
  itemType: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  catalogColorId?: string;

  @Field({ nullable: true })
  priceImpact?: number;

  @Field({ nullable: true })
  isRequired?: boolean;

  @Field({ nullable: true })
  isIncluded?: boolean;

  @Field(() => Int, { nullable: true })
  displayOrder?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any>;
}

@InputType()
export class CreateCalculationInput {
  @Field()
  carRequestId: string;

  @Field({ nullable: true })
  brandId?: string;

  @Field({ nullable: true })
  modelId?: string;

  @Field({ nullable: true })
  modelGenerationId?: string;

  @Field({ nullable: true })
  leasingCompanyId?: string;

  @Field(() => Int)
  durationMonths: number;

  @Field(() => Int)
  annualMileageKm: number;

  @Field({ nullable: true })
  deliveryExpectedAt?: Date;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  internalNotes?: string;

  @Field(() => [CreateCalculationItemInput], { nullable: true })
  items?: CreateCalculationItemInput[];

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any>;
}
