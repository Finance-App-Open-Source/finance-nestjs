import { Module } from '@nestjs/common';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';

@Module({
  providers: [AccountsService, AccountsResolver],
})
export class AccountsModule {}
