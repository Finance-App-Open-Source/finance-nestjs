import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Gender, User } from '@prisma/client';
import { AccountModel } from 'src/accounts/models/account.model';
import { TransactionModel } from 'src/transactions/models/transactions.model';
@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  gender: Gender;

  @Field()
  email: string;

  @Field({ nullable: true })
  verifiedAt: Date;

  @Field({ nullable: true })
  createdAt: Date;

  @Field()
  @HideField()
  password: string;

  @Field(() => [AccountModel], { nullable: true })
  accounts?: AccountModel[];

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[];
}
