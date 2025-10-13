import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsOptional, IsEnum, Matches } from 'class-validator';
import { PASSWORD_STRONG } from '@cartop/validation';
import { UserRole } from '../../../common/enums/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(2)
  firstName: string;

  @Field()
  @IsString()
  @MinLength(2)
  lastName: string;

  @Field()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_STRONG)
  password: string;

  @Field(() => [UserRole], { nullable: true })
  @IsOptional()
  @IsEnum(UserRole, { each: true })
  roles?: UserRole[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;
}
