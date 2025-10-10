import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { AuditAction } from '../../../common/interfaces/audit.interface';

@InputType()
export class AuditQueryInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  entityName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  entityId?: string;

  @Field(() => AuditAction, { nullable: true })
  @IsOptional()
  @IsEnum(AuditAction)
  action?: AuditAction;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @Field({ nullable: true, defaultValue: 50 })
  @IsOptional()
  limit?: number;

  @Field({ nullable: true, defaultValue: 0 })
  @IsOptional()
  skip?: number;
}
