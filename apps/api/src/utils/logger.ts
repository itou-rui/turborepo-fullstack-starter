import { Injectable, LoggerService } from '@nestjs/common';
import { NestStructuredLogger, type LoggerOptions } from '@workspace/logger';

@Injectable()
export class StructuredLogger extends NestStructuredLogger implements LoggerService {
  constructor(options: LoggerOptions = {}) {
    super({ name: 'API', ...options });
  }

  log(message: any, ...optionalParams: any[]): void {
    const context = this.getContext(optionalParams);
    if (typeof message === 'string') {
      super.log(message, { context });
    } else {
      super.log(JSON.stringify(message), { context });
    }
  }

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

  warn(message: any, ...optionalParams: any[]): void {
    const context = this.getContext(optionalParams);
    if (typeof message === 'string') {
      super.warn(message, { context });
    } else {
      super.warn(JSON.stringify(message), { context });
    }
  }

  debug(message: any, ...optionalParams: any[]): void {
    const context = this.getContext(optionalParams);
    if (typeof message === 'string') {
      super.debug(message, { context });
    } else {
      super.debug(JSON.stringify(message), { context });
    }
  }

  private getContext(params: any[]): string | undefined {
    if (params.length > 0) {
      const lastParam = params[params.length - 1];
      if (typeof lastParam === 'string') {
        return lastParam;
      }
    }
    return undefined;
  }

  private getTraceAndContext(params: any[]): { trace?: string; context?: string } {
    if (params.length === 0) return {};
    if (params.length === 1) return { trace: typeof params[0] === 'string' ? params[0] : undefined };
    return {
      trace: typeof params[0] === 'string' ? params[0] : undefined,
      context: typeof params[1] === 'string' ? params[1] : undefined,
    };
  }
}
