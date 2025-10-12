import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';

/**
 * File Filters Input
 * Used for filtering and searching files
 */
@InputType()
export class FileFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  mimeType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  extension?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string; // Partial match

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  minSize?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxSize?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  minWidth?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  minHeight?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  onlyImages?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  onlyOrphaned?: boolean; // Files not referenced by any entity

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;
}
