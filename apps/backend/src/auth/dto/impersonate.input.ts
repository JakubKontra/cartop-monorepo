import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

/**
 * Input for user impersonation
 * Only admins can use this to impersonate other users
 */
@InputType()
export class ImpersonateInput {
  @Field()
  @IsUUID()
  targetUserId: string;
}
