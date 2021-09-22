import { PaymentMethodModel, PaymentMethodInput } from './models/paymentMethod.model';
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserModel } from './../users/models/user.model';
import { PrismaService } from 'src/prisma.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentmethodService } from './paymentmethod.service';

@Resolver()
export class PaymentMethodResolver {
  constructor(private prisma: PrismaService, private paymentmethodService: PaymentmethodService) {}
  @Query(() => [PaymentMethodModel])
  async paymentMethods() {
    return this.prisma.paymentMethod.findMany();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PaymentMethodModel)
  async createPaymentMethod(
    @CurrentUser() user: UserModel,
    @Args('paymentMethodInput') paymentMethodInput: PaymentMethodInput,
  ){
    const paymentMethod = await this.paymentmethodService.create(
        paymentMethodInput
      );
      return paymentMethod;
  };
}
