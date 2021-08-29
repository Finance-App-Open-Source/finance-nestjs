import { Resolver, Query } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { PrismaService } from 'src/prisma.service';
@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany();
  }
}
