import { Injectable, Logger, UseFilters } from '@nestjs/common';
import { Context, Once, type ContextOf } from 'necord';
import { DiscordExceptionFilter } from 'utils/filters';
import { ReadyService } from './ready.service';

@Injectable()
@UseFilters(DiscordExceptionFilter)
export class ReadyEvent {
  private readonly logger = new Logger(ReadyEvent.name);

  constructor(private readonly readyService: ReadyService) {}

  @Once('ready')
  public async onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);

    await this.readyService.onApplicationBootstrap();
  }
}
