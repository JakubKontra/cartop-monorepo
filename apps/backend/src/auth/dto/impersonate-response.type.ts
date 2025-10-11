import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../model/user/user.entity';

/**
 * Response type for impersonation requests
 * Contains tokens and information about both the admin and impersonated user
 */
@ObjectType()
export class ImpersonateResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => User)
  impersonatedUser: User;

  @Field(() => User)
  originalUser: User;
}
