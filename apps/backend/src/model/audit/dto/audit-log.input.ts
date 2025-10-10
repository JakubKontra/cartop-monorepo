import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString, IsOptional, IsObject } from 'class-validator';
import { AuditAction } from '../../../common/interfaces/audit.interface';

@InputType()
export class CreateAuditLogInput {
  @Field()
  @IsString()
  entityName: string;

  @Field()
  @IsString()
  entityId: string;

  @Field(() => AuditAction)
  @IsEnum(AuditAction)
  action: AuditAction;

  @Field({ nullable: true })
  @IsOptional()
  @IsObject()
  oldValue?: Record<string, any>;

  @Field({ nullable: true })
  @IsOptional()
  @IsObject()
  newValue?: Record<string, any>;

  @Field({ nullable: true })
  @IsOptional()
  @IsObject()
  changes?: Record<string, { old: any; new: any }>;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  userEmail?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
