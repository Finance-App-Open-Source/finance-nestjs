import { Field, HideField, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Account } from '@prisma/client';

@InputType()
export class CreateAccountInput {
  name: string;
  amount: number;
}
@ObjectType()
export class AccountModel implements Account {
  @Field(() => ID)
  id: number;
  name: string;
  amount: number;
  @HideField()
  userId: number | null;
}
