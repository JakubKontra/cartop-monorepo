import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsString()
  @MinLength(1)
  refreshToken: string;
}
