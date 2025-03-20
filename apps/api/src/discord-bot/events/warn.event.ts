import { Injectable, Logger, UseFilters } from '@nestjs/common';
import { Context, On, type ContextOf } from 'necord';
import { DiscordExceptionFilter } from 'utils/filters';

@Injectable()
@UseFilters(DiscordExceptionFilter)
export class WarnEvent {
  private readonly logger = new Logger(WarnEvent.name);

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}
