import { CategoryInput } from './../category/models/category.model';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserModel } from 'src/users/models/user.model';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CategoryModel } from './models/category.model';
import { PrismaService } from '../prisma.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class CategoryResolver {
    constructor(private prisma: PrismaService){}
    @Query(() => [CategoryModel])
    async categories(){
        return this.prisma.category.findMany();
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CategoryModel)
    async createCategory(
        @CurrentUser() user: UserModel,
        @Args('CategoryInput') categoryInput: CategoryInput,
    ){
        const category = this.prisma.category.create({
            data:categoryInput
        })
        return category;
    }
}
