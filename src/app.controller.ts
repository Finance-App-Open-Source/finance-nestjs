import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req){
    return this.appService.googleLogin(req);
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
