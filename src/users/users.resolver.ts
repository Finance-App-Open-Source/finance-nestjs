import { Resolver, Query } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';
import { PrismaService } from 'src/prisma.service';
@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [UserModel])
  async users() {
    return this.prisma.user.findMany();
  }
}
