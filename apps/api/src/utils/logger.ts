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
    super({ name: 'API', ...options });
  }

  /**
   * Logs a message at the 'log' level.
   * @param message - The message to log.
   * @param optionalParams - Additional parameters.
   */
  log(message: any, ...optionalParams: any[]): void {
    const context = this.getContext(optionalParams);
    if (typeof message === 'string') {
      super.log(message, { context });
    } else {
      super.log(JSON.stringify(message), { context });
    }
  }

  /**
   * Logs a message at the 'error' level.
   * @param message - The message to log.
   * @param optionalParams - Additional parameters.
   */
  error(message: any, ...optionalParams: any[]): void {
    const { trace, context } = this.getTraceAndContext(optionalParams);
    if (message instanceof Error) {
      super.error(message, { context });
    } else if (typeof message === 'string') {
      super.error(message, { trace, context });
    } else {
      super.error(JSON.stringify(message), { trace, context });
    }
  }

  /**
   * Logs a message at the 'warn' level.
   * @param message - The message to log.
   * @param optionalParams - Additional parameters.
   */
  warn(message: any, ...optionalParams: any[]): void {
    const context = this.getContext(optionalParams);
    if (typeof message === 'string') {
      super.warn(message, { context });
    } else {
      super.warn(JSON.stringify(message), { context });
    }
  }

  /**
   * Logs a message at the 'debug' level.
   * @param message - The message to log.
   * @param optionalParams - Additional parameters.
   */
  debug(message: any, ...optionalParams: any[]): void {
    const context = this.getContext(optionalParams);
    if (typeof message === 'string') {
      super.debug(message, { context });
    } else {
      super.debug(JSON.stringify(message), { context });
    }
  }

  /**
   * Extracts the context from the optional parameters.
   * @param params - The optional parameters.
   * @returns The context if present, otherwise undefined.
   */
  private getContext(params: any[]): string | undefined {
    if (params.length > 0) {
      const lastParam = params[params.length - 1];
      if (typeof lastParam === 'string') {
        return lastParam;
      }
    }
    return undefined;
  }

  /**
   * Extracts the trace and context from the optional parameters.
   * @param params - The optional parameters.
   * @returns An object containing the trace and context if present.
   */
  private getTraceAndContext(params: any[]): { trace?: string; context?: string } {
    if (params.length === 0) return {};
    if (params.length === 1) return { trace: typeof params[0] === 'string' ? params[0] : undefined };
    return {
      trace: typeof params[0] === 'string' ? params[0] : undefined,
      context: typeof params[1] === 'string' ? params[1] : undefined,
    };
  }
}
