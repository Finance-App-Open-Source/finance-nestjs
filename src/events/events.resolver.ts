import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { EventService } from './event.service';
import { Event } from './models/event.model';
import { NotFoundException } from '@nestjs/common';

const pubSub = new PubSub();
@Resolver((of) => Event)
export class EventsResolver {
  constructor(private readonly eventService: EventService) {}

  @Query((returns) => Event)
  async event(@Args('id') id: number): Promise<Event> {
    const event = await this.eventService.event({
      id,
    });
    if (!event) {
      throw new NotFoundException(id);
    }
    return event;
  }

  @Query((returns) => [Event])
  async events(): Promise<Event[]> {
    return await this.eventService.events({});
  }

  @Mutation((returns) => Event)
  async createEvent(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('startTime') startTime: Date,
  ): Promise<Event> {
    const newEvent = await this.eventService.createEvent({
      name,
      description,
      startTime,
    });
    pubSub.publish('eventCreated', { eventCreated: newEvent });
    return newEvent;
  }

  @Mutation((returns) => Event)
  async deleteEvent(@Args('id') id: number): Promise<Event> {
    try {
      return await this.eventService.deleteEvent({ id });
    } catch (e) {
      throw new NotFoundException(id);
    }
  }

  @Subscription((returns) => Event)
  eventCreated() {
    return pubSub.asyncIterator('eventCreated');
  }
}
