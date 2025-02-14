import { BaseLogger } from './base';
import type { LogContext, LoggerOptions } from './types';

/**
 * A structured logger for NextJS applications.
 */
export class NextStructuredLogger extends BaseLogger {
  /**
   * Creates an instance of NextStructuredLogger.
   * @param options - The options for the logger.
   */
  constructor(options: LoggerOptions = {}) {
    super({
      name: options.name || 'NextJS',
      logLevel: options.level || 'info',
      format: options.format || 'text',
    });
  }

  /**
   * Logs a message with 'info' severity.
   * @param message - The message to log.
   * @param context - The context of the log message.
   */
  log(message: string, context?: LogContext): void {
    if (!this.isLevelEnabled('log')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'info' });
  }

  /**
   * Logs a debug message.
   * @param message - The debug message.
   * @param context - The context of the log message.
   */
  debug(message: string, context?: LogContext): void {
    if (!this.isLevelEnabled('debug')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'debug' });
  }

  /**
   * Logs an info message.
   * @param message - The info message.
   * @param context - The context of the log message.
   */
  info(message: string, context?: LogContext): void {
    if (!this.isLevelEnabled('info')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'info' });
  }

  /**
   * Logs a warning message.
   * @param message - The warning message.
   * @param context - The context of the log message.
   */
  warn(message: string, context?: LogContext): void {
    if (!this.isLevelEnabled('warn')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'warn' });
  }

  /**
   * Logs an error message.
   * @param message - The error message or Error object.
   * @param context - The context of the log message.
   */
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

  /**
   * Logs a fatal error message.
   * @param message - The fatal error message or Error object.
   * @param context - The context of the log message.
   */
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
