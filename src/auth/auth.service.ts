import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/users/models/user.model';

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

  async login(loginUserInput: any) {
    const user = await this.usersService.findByLogin(loginUserInput);
    const accessToken = this._createToken({ email: user.email, id: user.id });
    return {
      success: true,
      message: 'User login',
      accessToken: accessToken,
      user,
    };
  }

  async register(user: { email: string; password: string; name: string }) {
    let status = {
      success: true,
      message: 'User registered',
    };

    try {
      const { email, id } = await this.usersService.create(user);
      const accessToken = this.jwtService.sign({ email, id });
      status['accessToken'] = accessToken;
    } catch (err) {
      status = {
        success: false,
        message: err.message,
      };
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
