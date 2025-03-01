import { Injectable, Logger } from '@nestjs/common';
import { Context, On, type ContextOf } from 'necord';

@Injectable()
export class MessageEvent {
  private readonly logger = new Logger(MessageEvent.name);

  @On('messageCreate')
  public onMessageCreate(@Context() [message]: ContextOf<'messageCreate'>) {
    if (message.author.bot) return;
    this.logger.log(message.content, { author: message.author.username });
  }
}
