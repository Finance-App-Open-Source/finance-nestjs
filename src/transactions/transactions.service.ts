import { PrismaService } from './../prisma.service';

import { TransactionInput } from './models/transactions.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserModel } from 'src/users/models/user.model';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}
  async create(
    @CurrentUser() user: UserModel,
    createTransaction: TransactionInput,
  ) {
    try {
      createTransaction['userId'] = user.id;
      const account = await this.prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      });
      createTransaction['accountId'] = account.id;
      createTransaction['categoryId'] = Number(createTransaction['categoryId'])
      console.log(createTransaction);
      
      
      const transaction = await this.prisma.transaction.create({
        data: createTransaction,
      });
      return transaction;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
