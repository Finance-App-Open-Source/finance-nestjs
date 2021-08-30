import { Field, ObjectType } from '@nestjs/graphql';
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
