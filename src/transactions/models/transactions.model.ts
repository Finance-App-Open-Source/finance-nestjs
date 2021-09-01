import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Transaction, TransactionType } from '@prisma/client';

registerEnumType(TransactionType, {
  name: 'TransactionType',
});

@ObjectType()
export class TransactionModel implements Transaction {
  @Field(() => ID)
  id: number;
  amount: number;
  @Field(() => TransactionType)
  type: TransactionType;
  @Field(() => ID, { nullable: true })
  userId: number;
  @Field(() => ID)
  categoryId: number;
  @Field(() => ID)
  accountId: number;
  @Field(() => ID)
  currencyId: number;
  dateTime: Date;
  createdAt: Date;
  @Field(() => ID)
  paymentMethodId: number;
}
