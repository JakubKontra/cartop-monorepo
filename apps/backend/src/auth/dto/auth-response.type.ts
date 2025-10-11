import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../model/user/user.entity';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => User)
  user: User;
}
