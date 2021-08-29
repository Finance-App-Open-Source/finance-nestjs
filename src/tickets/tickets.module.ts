import { Module } from '@nestjs/common';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [TicketService, TicketResolver, PrismaService],
})
export class TicketsModule {}
