import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Account } from '@prisma/client';
@ObjectType()
export class AccountModel implements Account {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  amount: number;

  @Field()
  userId: number | null;
}
