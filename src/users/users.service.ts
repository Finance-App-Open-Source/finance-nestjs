import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInput, UserModel } from './models/user.model';
import { LoginInput } from 'src/auth/models/auth.model';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<UserModel | undefined> {
    // return this.users.find((user) => user.username === username);
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }


  async create(createUserInput: CreateUserInput): Promise<UserModel> {
    const { name, password, email, nickname } = createUserInput;
    const userInDb = await this.findOne(email);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const saltOrRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltOrRounds);
      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          password: passwordHash,
          nickname,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByLogin({ email, password }: LoginInput): Promise<UserModel> {
    const user = await this.findOne(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
