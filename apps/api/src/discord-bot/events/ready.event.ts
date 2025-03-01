import { Injectable, Logger } from '@nestjs/common';
import { Context, Once, type ContextOf } from 'necord';
import { CommandService } from '../services';

@Injectable()
export class ReadyEvent {
  private readonly logger = new Logger(ReadyEvent.name);

  constructor(private readonly commandService: CommandService) {}

  @Once('ready')
  public async onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);

    await this.commandService.onApplicationBootstrap();
  }
}
