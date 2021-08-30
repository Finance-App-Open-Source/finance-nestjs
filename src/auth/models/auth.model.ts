import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { UserModel } from '../../users/models/user.model';

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
