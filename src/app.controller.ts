import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';

import { Event as EventModel } from '@prisma/client';
import { EventService } from './events/event.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventService: EventService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('events/:id')
  async getEventById(@Param('id') id: string): Promise<EventModel> {
    return this.eventService.event({ id: Number(id) });
  }

  @Get('events')
  async getEvents(): Promise<EventModel[]> {
    return this.eventService.events({});
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

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getProfile(@Request() req) {
    return req.user;
  }
}
