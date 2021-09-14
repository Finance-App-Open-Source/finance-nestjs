
import { Field, ID, ObjectType, registerEnumType, InputType } from '@nestjs/graphql';
import { Account, Transaction, TransactionType } from '@prisma/client';

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

@InputType()
export class TransactionInput{
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
  @Field(() => ID)
  paymentMethodId: number;
}
