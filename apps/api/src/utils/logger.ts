import { Injectable, LoggerService } from '@nestjs/common';
import { NestStructuredLogger, type LoggerOptions } from '@workspace/logger';

@Injectable()
export class StructuredLogger extends NestStructuredLogger implements LoggerService {
  /**
   * Creates an instance of StructuredLogger.
   * @param options - The options for the logger.
   * @param options.name - The name of the logger.
   * @param options.level - The log level of the logger.
   * @param options.format - The format of the log messages.
   * @param options.enabled - Whether the logger is enabled.
   */
  constructor(options: LoggerOptions = {}) {
    super(options);
  }

  /**
   * Logs a message at the 'log' level.
   * @param message - The message to log.
   * @param optionalParams - Additional parameters.
   */
  log(message: any, ...optionalParams: any[]): void {
    const lastParam = optionalParams[optionalParams.length - 1];
    const context = typeof lastParam === 'string' ? lastParam : undefined;
    const params = context ? optionalParams.slice(0, -1) : optionalParams;

    if (typeof message === 'string') {
      super.log(message, ...(params.length > 0 ? [...params] : []), context);
    } else {
      super.log(JSON.stringify(message), ...(params.length > 0 ? [...params] : []), context);
    }
  }

  /**
   * Logs a message at the 'error' level.
   * @param message - The message to log.
   * @param optionalParams - Additional parameters.
   */
  error(message: any, ...optionalParams: any[]): void {
    const lastParam = optionalParams[optionalParams.length - 1];
    const context = typeof lastParam === 'string' ? lastParam : undefined;
    const params = context ? optionalParams.slice(0, -1) : optionalParams;

    if (message instanceof Error) {
      super.error(message, ...(params.length > 0 ? [...params] : []), context);
    } else if (typeof message === 'string') {
      super.error(message, ...(params.length > 0 ? [...params] : []), context);
    } else {
      super.error(JSON.stringify(message), ...(params.length > 0 ? [...params] : []), context);
    }
  }

  /**
   * Logs a message at the 'warn' level.
   * @param message - The message to log.
   * @param optionalParams - Additional parameters.
   */
  warn(message: any, ...optionalParams: any[]): void {
    const lastParam = optionalParams[optionalParams.length - 1];
    const context = typeof lastParam === 'string' ? lastParam : undefined;
    const params = context ? optionalParams.slice(0, -1) : optionalParams;

    if (typeof message === 'string') {
      super.warn(message, ...(params.length > 0 ? [...params] : []), context);
    } else {
      super.warn(JSON.stringify(message), ...(params.length > 0 ? [...params] : []), context);
    }
  }

  /**
   * Logs a message at the 'debug' level.
   * @param message - The message to log.
   * @param optionalParams - Additional parameters.
   */
  debug(message: any, ...optionalParams: any[]): void {
    const lastParam = optionalParams[optionalParams.length - 1];
    const context = typeof lastParam === 'string' ? lastParam : undefined;
    const params = context ? optionalParams.slice(0, -1) : optionalParams;

    if (typeof message === 'string') {
      super.debug(message, ...(params.length > 0 ? [...params] : []), context);
    } else {
      super.debug(JSON.stringify(message), ...(params.length > 0 ? [...params] : []), context);
    }
  }
}
