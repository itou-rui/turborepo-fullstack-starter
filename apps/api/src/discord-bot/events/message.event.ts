import { Injectable, Logger, UseFilters } from '@nestjs/common';
import { Context, On, type ContextOf } from 'necord';
import { DiscordExceptionFilter } from 'utils/filters';

@Injectable()
@UseFilters(DiscordExceptionFilter)
export class MessageEvent {
  private readonly logger = new Logger(MessageEvent.name);

  @On('messageCreate')
  public onMessageCreate(@Context() [message]: ContextOf<'messageCreate'>) {
    if (message.author.bot) return;
    this.logger.log(message.content, { author: message.author.username });
  }
}
