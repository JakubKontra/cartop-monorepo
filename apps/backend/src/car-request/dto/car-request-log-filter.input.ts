import { InputType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID, IsEnum, IsDateString, IsArray } from 'class-validator';
import { CarRequestLogAction } from '../enums/car-request-log-action.enum';

/**
 * Filter input for querying car request logs
 * Supports filtering by action type, date range, and author
 */
@InputType()
export class CarRequestLogFilterInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  carRequestId?: string;

  @Field(() => [CarRequestLogAction], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsEnum(CarRequestLogAction, { each: true })
  actionTypes?: CarRequestLogAction[];

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  authorId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
