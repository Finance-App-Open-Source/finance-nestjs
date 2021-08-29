import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';
import { AccountModel } from 'src/accounts/models/account.model';
import { TransactionModel } from 'src/transactions/models/transactions.model';
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  gender: Gender;

  @Field()
  email: string;

  @Field(() => [AccountModel])
  accounts: AccountModel[];

  @Field(() => [TransactionModel])
  transactions: TransactionModel[];
}
