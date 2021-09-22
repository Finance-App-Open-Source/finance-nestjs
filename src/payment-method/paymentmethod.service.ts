import { PrismaService } from './../prisma.service';
import { PaymentMethodInput } from './models/paymentMethod.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentmethodService {
  constructor(private prisma: PrismaService) {}
  async create(paymentMethod: PaymentMethodInput) {
    const payment_method = this.prisma.paymentMethod.create({
      data: paymentMethod,
    });
    return payment_method;
  }
}
