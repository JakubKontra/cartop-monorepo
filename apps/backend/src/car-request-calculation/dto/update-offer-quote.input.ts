import { InputType, Field, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateOfferQuoteInput {
  @Field(() => Float, { nullable: true })
  monthlyPayment?: number;

  @Field(() => Float, { nullable: true })
  downPayment?: number;

  @Field(() => Float, { nullable: true })
  totalPrice?: number;

  @Field(() => Float, { nullable: true })
  interestRate?: number;

  @Field(() => Float, { nullable: true })
  adminFee?: number;

  @Field({ nullable: true })
  includesService?: boolean;

  @Field({ nullable: true })
  includesWinterTires?: boolean;

  @Field({ nullable: true })
  includesGap?: boolean;

  @Field({ nullable: true })
  includesAssistance?: boolean;

  @Field({ nullable: true })
  termsAndConditions?: string;

  @Field({ nullable: true })
  validUntil?: Date;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any>;
}
