import { TransactionModel } from 'src/transactions/models/transactions.model';
import { InputType, ObjectType } from "@nestjs/graphql";
import { PaymentMethod } from "@prisma/client";


@ObjectType()
export class PaymentMethodModel implements PaymentMethod{
  id: number;
  name:string;
  transactions?: TransactionModel[];
}


@InputType()
export class PaymentMethodInput{
  name:string;
}