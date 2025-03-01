import { Injectable, Logger } from '@nestjs/common';
import { Context, On, type ContextOf } from 'necord';

@Injectable()
export class WarnEvent {
  private readonly logger = new Logger(WarnEvent.name);

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}
