import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { PubSub } from 'apollo-server-express';
import { AuthService } from './auth.service';
import { UserModel } from '../users/models/user.model';
import { LoginResponse, RegisterResponse } from './models/auth.model';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<{
    success: boolean;
    message: string;
    accessToken: string;
    user: UserModel;
  }> {
    return this.authService.login({ email, password });
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Args('name') name: string,
    @Args('surname') surname: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.register({
      name,
      email,
      password,
    });
  }
}
