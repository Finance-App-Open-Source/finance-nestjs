import { Module } from '@nestjs/common';
import { PaymentMethodResolver } from './payment-method.resolver';
import { PaymentmethodService } from './paymentmethod.service';

@Module({
  providers: [PaymentMethodResolver, PaymentmethodService]
})
export class PaymentMethodModule {}
