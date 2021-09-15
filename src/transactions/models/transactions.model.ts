
import { Field, ID, ObjectType, registerEnumType, InputType, Float } from '@nestjs/graphql';
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
  @Field(() => ID, { nullable: true })
  categoryId: number;
  @Field(() => ID)
  accountId: number;
}

@InputType()
export class TransactionInput{
  @Field(() => Float, { defaultValue: 0 })
  amount: number;
  @Field(() => TransactionType)
  type: TransactionType;
  @Field(() => ID, { nullable: true })
  categoryId: number;
  @Field(() => ID)
  userId: number;
  @Field(() => ID)
  accountId: number;
}
