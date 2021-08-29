import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body() req) {
    return this.authService.login(req);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('auth/register')
  async register(@Body() req) {
    return this.authService.register(req);
  }
}
