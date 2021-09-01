import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAccountInput } from './models/account.model';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}
  async createAccount(createAccountInput: CreateAccountInput, userId: number) {
    try {
      console.log(
        '🚀 ~ file: accounts.service.ts ~ line 6 ~ AccountsService ~ createAccount ~ payload',
        createAccountInput,
        userId,
      );

      const account = await this.prisma.account.create({
        data: createAccountInput,
      });
      return account;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
