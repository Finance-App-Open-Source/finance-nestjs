import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../users/models/user.model';
import { IsEmail } from 'class-validator';

@ObjectType()
export class LoginResponse {
  @Field()
  success: boolean;

  @Field()
  accessToken: string;

  @Field()
  user: UserModel;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field({ nullable: true })
  accessToken: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  name: string;
  @Field()
  surname: string;
  @Field()
  @IsEmail({}, { message: 'Is not a valid email!' })
  email: string;
  @Field()
  password: string;
}
