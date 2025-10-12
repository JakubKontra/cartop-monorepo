import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsInt,
  IsOptional,
  MinLength,
  Min,
  MaxLength,
} from 'class-validator';

/**
 * Create File Input
 * Used when manually registering a file in the system
 */
@InputType()
export class CreateFileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  relativePath: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  extension: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  size: number;

  @Field()
  @IsString()
  @MaxLength(100)
  mimeType: string;

  @Field()
  @IsString()
  @MinLength(64)
  @MaxLength(64)
  checksum: string;

  // Image-specific fields (optional)

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  width?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  height?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  alt?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  thumbnailPath?: string;
}
