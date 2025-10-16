import { InputType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { CreateCalculationItemInput } from './create-calculation.input';

@InputType()
export class UpdateCalculationInput {
  @Field(() => Int, { nullable: true })
  durationMonths?: number;

  @Field(() => Int, { nullable: true })
  annualMileageKm?: number;

  @Field({ nullable: true })
  deliveryExpectedAt?: Date;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  internalNotes?: string;

  @Field({ nullable: true })
  assignedToId?: string;

  @Field(() => [CreateCalculationItemInput], { nullable: true })
  items?: CreateCalculationItemInput[];

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any>;
}
