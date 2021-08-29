import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Category } from './category.model';
@ObjectType()
export class Event {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;

  // @Field(type => [Category], { nullable: true })
  // categories: Category[];

  @Field()
  startTime: Date;
}
