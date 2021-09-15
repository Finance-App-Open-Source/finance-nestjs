import { PrismaService } from './../prisma.service';

import { TransactionInput } from './models/transactions.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}
  async create(
    createTransaction: TransactionInput
  ) {
    console.log(createTransaction);
    try {
      const transaction = await this.prisma.transaction.create({
        data: createTransaction,
      });

      return transaction;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
