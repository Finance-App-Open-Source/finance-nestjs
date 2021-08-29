import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Transaction, TransactionType } from '@prisma/client';

@ObjectType()
export class TransactionModel implements Transaction {
  @Field(() => ID)
  id: number;
  @Field()
  amount: number;
  @Field()
  type: TransactionType;
  @Field()
  userId: number | null;
  @Field()
  categoryId: number;
  @Field()
  accountId: number;
  @Field()
  currencyId: number;
  @Field()
  dateTime: Date;
  @Field()
  createdAt: Date;
  @Field()
  paymentMethodId: number;
}
