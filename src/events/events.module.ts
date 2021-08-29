import { Module } from '@nestjs/common';
import { EventsResolver } from './events.resolver';
import { EventService } from './event.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [EventService, EventsResolver, PrismaService],
})
export class EventsModule {}
