import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Account } from '@prisma/client';

@InputType()
export class CreateAccountInput {
  @Field()
  name: string;

  @Field()
  amount: number;
}
@ObjectType()
export class AccountModel implements Account {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  amount: number;

  @Field({ nullable: true })
  userId: number | null;
}
