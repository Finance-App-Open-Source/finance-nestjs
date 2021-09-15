import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';
import { CreateUserInput, UserModel } from 'src/users/models/user.model';
import { LoginInput } from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, pass: string): Promise<UserModel | null> {
    const user = await this.usersService.findOne(email);
    if (user && bcrypt.compare(pass, user.password)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  _createToken(payload) {
    return this.jwtService.sign(payload);
  }

  async login(loginUserInput: LoginInput) {
    const user = await this.usersService.findByLogin(loginUserInput);
    const accessToken = this._createToken({ email: user.email, id: user.id });
    return {
      success: true,
      message: 'User login',
      accessToken: accessToken,
      user,
    };
  }

  async register(registerInput: CreateUserInput) {
    const status = {
      success: true,
      message: 'User registered',
      accessToken: null,
    };

    try {
      const email_in_use = await this.usersService.findOne(registerInput.email);
      if (!email_in_use) {
        const { email, id } = await this.usersService.create(registerInput);
        const accessToken = this.jwtService.sign({ email, id });
        status.accessToken = accessToken;
      } else {
        status.message = 'email is ready in use..';
        status.success = false;
        status.accessToken = null;
      }
    } catch (err) {
      status.message = err.message;
      status.success = false;
      status.accessToken = null;
    }
    return status;
  }

  async verify(token: string): Promise<UserModel> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });

    const user = await this.usersService.findOne(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }
}
