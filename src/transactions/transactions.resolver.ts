import { TransactionsService } from './transactions.service';
import { CurrentUser } from './../auth/current-user.decorator';
import { UserModel } from 'src/users/models/user.model';
import { TransactionModel, TransactionInput } from './models/transactions.model';
import { PrismaService } from 'src/prisma.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';


@Resolver()
export class TransactionsResolver {
 constructor(private prisma: PrismaService, private transactionsService:TransactionsService) {}

  @Query(() => [TransactionModel])
  async transactions() {
    return this.prisma.transaction.findMany();
  }
  @Mutation(() => TransactionModel)
  async makeTransaction(
    @CurrentUser() user: UserModel,
    @Args('transactionInput') transactionInput: TransactionInput,
  ){
    console.log('--------------------');
    console.log(user);
    console.log('--------------------');

    const transaction = await this.transactionsService.create(
      transactionInput,
      user.id,
    );
    return transaction;
  }
}
