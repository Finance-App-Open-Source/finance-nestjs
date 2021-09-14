import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { PubSub } from 'apollo-server-express';
import { AuthService } from './auth.service';
import { CreateUserInput, UserModel } from '../users/models/user.model';
import {
  LoginInput,
  LoginResponse,
  RegisterResponse,
} from './models/auth.model';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    const { email, password } = loginInput;
    return this.authService.login({ email, password });
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerInput: CreateUserInput,
  ): Promise<RegisterResponse> {
    const { name, nickname, email, password } = registerInput;
    return this.authService.register({
      name,
      nickname,
      email,
      password,
    });
  }
}
