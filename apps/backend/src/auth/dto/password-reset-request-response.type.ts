import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PasswordResetRequestResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
