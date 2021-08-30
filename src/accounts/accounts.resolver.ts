import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { AccountModel, CreateAccountInput } from './models/account.model';

@Resolver()
export class AccountsResolver {
  constructor(private accountService: AccountsService) {}
  @Mutation(() => AccountModel)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    console.log(
      '🚀 ~ file: accounts.resolver.ts ~ line 10 ~ AccountsResolver ~ createAccountInput',
      createAccountInput,
    );
    const userId = 1;
    this.accountService.createAccount(createAccountInput, userId);
    return null;
  }
}
