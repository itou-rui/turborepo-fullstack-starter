import { BaseLogger } from './base';
import type { LogContext, LoggerOptions, LogLevel, IStructuredLogger, LogFormat } from './types';

export class NestStructuredLogger extends BaseLogger implements IStructuredLogger {
  private enabled: boolean;

  constructor(options: LoggerOptions = {}) {
    super({
      name: options.name || 'NestJS',
      logLevel: options.level || 'info',
      format: options.format || 'text',
    });
    this.enabled = options.enabled ?? true;
  }

  log(message: any, ...optionalParams: any[]): void {
    if (!this.enabled || !this.isLevelEnabled('log')) return;
    const { message: msg, params, context } = this.extractMessages([message, ...optionalParams]);
    this.printMessage({ message: msg, params, context, severity: 'info' });
  }

  error(message: string | Error, context?: LogContext): void {
    if (!this.enabled || !this.isLevelEnabled('error')) return;

    if (message instanceof Error) {
      const { message: msg, stack, params } = this.extractMessagesWithStack([message, context]);
      this.printMessage({ message: msg, stack, params, context: null, severity: 'error' });
    } else {
      const { message: msg, params } = this.extractMessages([message, context]);
      this.printMessage({ message: msg, params, context: null, severity: 'error' });
    }
  }

  warn(message: string, context?: LogContext): void {
    if (!this.enabled || !this.isLevelEnabled('warn')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'warn' });
  }

  debug(message: string, context?: LogContext): void {
    if (!this.enabled || !this.isLevelEnabled('debug')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'debug' });
  }

  verbose(message: string, context?: LogContext): void {
    if (!this.enabled || !this.isLevelEnabled('verbose')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'verbose' });
  }

  fatal(message: string | Error, context?: LogContext): void {
    if (!this.enabled || !this.isLevelEnabled('fatal')) return;

    if (message instanceof Error) {
      const { message: msg, stack, params } = this.extractMessagesWithStack([message, context]);
      this.printMessage({ message: msg, stack, params, context: null, severity: 'fatal' });
    } else {
      const { message: msg, params } = this.extractMessages([message, context]);
      this.printMessage({ message: msg, params, context: null, severity: 'fatal' });
    }
  }

  setLogLevels(levels: LogLevel[]): void {
    this.logLevel = levels[0] || 'info';
  }

  setFormat(format: LogFormat): void {
    this.format = format;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}
