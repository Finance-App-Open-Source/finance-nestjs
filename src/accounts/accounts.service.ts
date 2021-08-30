import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './models/account.model';

@Injectable()
export class AccountsService {
  async createAccount(createAccountInput: CreateAccountInput, userId: number) {
    console.log(
      '🚀 ~ file: accounts.service.ts ~ line 6 ~ AccountsService ~ createAccount ~ payload',
      createAccountInput,
      userId,
    );
  }
}
