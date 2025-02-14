import { BaseLogger } from './base';
import type { LogContext, LoggerOptions, LogLevel, IStructuredLogger, LogFormat } from './types';

/**
 * A structured logger for NestJS applications.
 */
export class NestStructuredLogger extends BaseLogger implements IStructuredLogger {
  private enabled: boolean;

  /**
   * Creates an instance of NestStructuredLogger.
   * @param options - The options for the logger.
   * @param options.name - The name of the logger.
   * @param options.level - The log level of the logger.
   * @param options.format - The format of the log messages.
   * @param options.enabled - Whether the logger is enabled.
   */
  constructor(options: LoggerOptions = {}) {
    super({
      name: options.name || 'NestJS',
      logLevel: options.level || 'info',
      format: options.format || 'text',
    });
    this.enabled = options.enabled ?? true;
  }

  /**
   * Logs a message with 'info' severity.
   * @param message - The message to log.
   * @param optionalParams - Additional parameters for the log message.
   */
  log(message: any, ...optionalParams: any[]): void {
    if (!this.enabled || !this.isLevelEnabled('log')) return;
    const { message: msg, params, context } = this.extractMessages([message, ...optionalParams]);
    this.printMessage({ message: msg, params, context, severity: 'info' });
  }

  /**
   * Logs an error message.
   * @param message - The error message or Error object.
   * @param context - The context of the log message.
   */
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

  /**
   * Logs a warning message.
   * @param message - The warning message.
   * @param context - The context of the log message.
   */
  warn(message: string, context?: LogContext): void {
    if (!this.enabled || !this.isLevelEnabled('warn')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'warn' });
  }

  /**
   * Logs a debug message.
   * @param message - The debug message.
   * @param context - The context of the log message.
   */
  debug(message: string, context?: LogContext): void {
    if (!this.enabled || !this.isLevelEnabled('debug')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'debug' });
  }

  /**
   * Logs a verbose message.
   * @param message - The verbose message.
   * @param context - The context of the log message.
   */
  verbose(message: string, context?: LogContext): void {
    if (!this.enabled || !this.isLevelEnabled('verbose')) return;
    const { message: msg, params } = this.extractMessages([message, context]);
    this.printMessage({ message: msg, params, context: null, severity: 'verbose' });
  }

  /**
   * Logs a fatal error message.
   * @param message - The fatal error message or Error object.
   * @param context - The context of the log message.
   */
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

  /**
   * Sets the log levels.
   * @param levels - The log levels to set.
   */
  setLogLevels(levels: LogLevel[]): void {
    this.logLevel = levels[0] || 'info';
  }

  /**
   * Sets the format of the log messages.
   * @param format - The format to set.
   */
  setFormat(format: LogFormat): void {
    this.format = format;
  }

  /**
   * Enables or disables the logger.
   * @param enabled - True to enable the logger, false to disable it.
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}
