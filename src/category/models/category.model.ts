import { InputType, ObjectType } from "@nestjs/graphql";
import { Category } from '@prisma/client';

@ObjectType()
export class CategoryModel implements Category{
  id: number;
  name:string;
}


@InputType()
export class CategoryInput{
  name:string;
}