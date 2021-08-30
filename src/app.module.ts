import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersResolver } from './users/users.resolver';
import { AccountsResolver } from './accounts/accounts.resolver';
import { AccountsService } from './accounts/accounts.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
      },
      installSubscriptionHandlers: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersResolver, AccountsResolver, AccountsService],
})
export class AppModule {}
