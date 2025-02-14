import { BaseLogger } from './base';
import type { LogContext, LoggerOptions } from './types';

export class NextStructuredLogger extends BaseLogger {
  constructor(options: LoggerOptions = {}) {
    super({
      name: options.name || 'NextJS',
      logLevel: options.level || 'info',
      format: options.format || 'text',
    });
  }

  log(message: string, context?: LogContext): void {
    if (!this.isLevelEnabled('log')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'info' });
  }

  debug(message: string, context?: LogContext): void {
    if (!this.isLevelEnabled('debug')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'debug' });
  }

  info(message: string, context?: LogContext): void {
    if (!this.isLevelEnabled('info')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'info' });
  }

  warn(message: string, context?: LogContext): void {
    if (!this.isLevelEnabled('warn')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'warn' });
  }

  error(message: string | Error, context?: LogContext): void {
    if (!this.isLevelEnabled('error')) return;

    if (message instanceof Error) {
      const { message: msg, stack, params } = this.extractMessagesWithStack([message, context]);
      this.printMessage({ message: msg, stack, params, context: null, severity: 'error' });
    } else {
      const { message: msg, params } = this.extractMessages([message, context]);
      this.printMessage({ message: msg, params, context: null, severity: 'error' });
    }
  }

  fatal(message: string | Error, context?: LogContext): void {
    if (!this.isLevelEnabled('fatal')) return;

    if (message instanceof Error) {
      const { message: msg, stack, params } = this.extractMessagesWithStack([message, context]);
      this.printMessage({ message: msg, stack, params, context: null, severity: 'fatal' });
    } else {
      const { message: msg, params } = this.extractMessages([message, context]);
      this.printMessage({ message: msg, params, context: null, severity: 'fatal' });
    }
  }
}
