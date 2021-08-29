import { Prisma } from '.prisma/client';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { TicketService } from './ticket.service';

const pubSub = new PubSub();
@Resolver('Ticket')
export class TicketResolver {
  constructor(private readonly eventService: TicketService) {}

  /**
   * Find many eventss
   * @returns Promise<Event[]>
   */
  @Query()
  async events(
    @Args('skip') skip?: number,
    @Args('where') where?: Prisma.EventWhereInput,
    @Args('orderBy') orderBy?: Prisma.EventOrderByInput,
    @Args('cursor') cursor?: Prisma.EventWhereUniqueInput,
  ) {
    return this.eventService.tickets({
      skip,
      where,
      orderBy,
      cursor,
    });
  }
  @Query()
  async event(@Args('id') id?: number) {
    return this.eventService.ticket({
      id,
    });
  }
  /**
   * Create event resolver for events mutation
   * @param input EventCreateInput
   * @returns Promise<Event>
   */
  /**
   *  If the name of the function is the same of the mutation no need add name to decorator
   */
  @Mutation()
  async createEvent(@Args('input') input: Prisma.EventCreateInput) {
    const newEvent = this.eventService.createTicket(input);
    pubSub.publish('ticket', { eventCreated: newEvent });
    return newEvent;
  }

  /**
   *
   * @returns
   */
  @Subscription('eventCreated')
  eventCreated() {
    return pubSub.asyncIterator('eventCreated');
  }
}
