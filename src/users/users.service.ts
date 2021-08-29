import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    // return this.users.find((user) => user.username === username);
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(createUserInput: {
    email: string;
    password: string;
    name: string;
  }) {
    const { name, password, email } = createUserInput;
    const userInDb = await this.findOne(email);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByLogin({ email, password }) {
    const user = await this.findOne(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = user.password === password;

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
