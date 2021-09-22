import { InputType, ObjectType } from "@nestjs/graphql";
import { PaymentMethod } from "@prisma/client";


@ObjectType()
export class PaymentMethodModel implements PaymentMethod{
  id: number;
  name:string;
}


@InputType()
export class PaymentMethodInput{
  name:string;
}