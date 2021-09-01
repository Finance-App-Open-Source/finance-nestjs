import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { UserModel } from '../../users/models/user.model';

@ObjectType()
export class LoginResponse {
  success: boolean;
  accessToken: string;
  @Field(() => UserModel)
  user: UserModel;
}

@ObjectType()
export class RegisterResponse {
  success: boolean;
  message: string;
  @Field({ nullable: true })
  accessToken: string;
}

@InputType()
export class LoginInput {
  @IsEmail()
  email: string;
  password: string;
}
