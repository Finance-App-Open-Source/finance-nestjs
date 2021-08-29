import { Resolver, Query } from '@nestjs/graphql';
import { User } from 'src/auth/models/user.model';
import { PrismaService } from 'src/prisma.service';
@Resolver(() => User)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany();
  }
}
