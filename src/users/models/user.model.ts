import {
  Field,
  HideField,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Gender, User } from '@prisma/client';
import { IsEmail } from 'class-validator';
import { AccountModel } from 'src/accounts/models/account.model';
import { TransactionModel } from 'src/transactions/models/transactions.model';

registerEnumType(Gender, {
  name: 'Gender',
});
@InputType()
export class CreateUserInput {
  name: string;
  nickname: string;
  @IsEmail({}, { message: 'Is not a valid email!' })
  email: string;
  password: string;
}
@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  id: number;
  name: string;
  @Field({ nullable: true })
  nickname: string;
  @Field(() => Gender, { nullable: true })
  gender: Gender;
  email: string;
  @Field({ nullable: true })
  verifiedAt: Date;
  createdAt: Date;
  @HideField()
  password: string;
  accounts?: AccountModel[];
  transactions?: TransactionModel[];
}
