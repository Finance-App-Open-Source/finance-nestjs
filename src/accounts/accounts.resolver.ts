import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserModel } from 'src/users/models/user.model';
import { AccountsService } from './accounts.service';
import { AccountModel, CreateAccountInput } from './models/account.model';

@Resolver()
export class AccountsResolver {
  constructor(private accountService: AccountsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AccountModel, { nullable: true })
  async createAccount(
    @CurrentUser() user: UserModel,
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    const userId = user.id;
    this.accountService.createAccount(createAccountInput, userId);
    return null;
  }
}
