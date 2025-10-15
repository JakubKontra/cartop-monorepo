import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsEnum } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';
import { CarRequestLogAction } from '../enums/car-request-log-action.enum';

/**
 * Input type for creating a car request log entry
 */
@InputType()
export class CreateCarRequestLogInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  carRequestId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  message: string;

  @Field(() => CarRequestLogAction)
  @IsNotEmpty()
  @IsEnum(CarRequestLogAction)
  actionType: CarRequestLogAction;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  metadata?: Record<string, any>;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  authorId?: string;
}
