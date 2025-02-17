import {
  type ColorName,
  type LogLevel,
  type Severity,
  type LogFormat,
  type PrintMessageArgs,
  HttpRequest,
  SourceLocation,
  Operation,
} from './types';

const logLevels: Record<LogLevel, number> = {
  verbose: 0,
  debug: 1,
  log: 2,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
};

function isPlainObject(obj: unknown): obj is Record<string, unknown> {
  return obj != null && Object.getPrototypeOf(obj) === Object.prototype;
}

export abstract class BaseLogger {
  /**
   * The logging level.
   */
  protected logLevel: LogLevel;

  /**
   * The format of the log messages.
   */
  protected format: LogFormat;

  /**
   * The name of the logger.
   */
  protected name: string;

  /**
   * Creates an instance of the logger.
   * @param options - The options for the logger.
   * @param options.logLevel - The logging level.
   * @param options.format - The format of the log messages.
   * @param options.name - The name of the logger.
   */
  constructor(options: { logLevel: LogLevel; format: LogFormat; name: string }) {
    this.logLevel = options.logLevel;
    this.format = options.format;
    this.name = options.name;
  }

  /**
   * Checks if the specified log level is enabled.
   * @param level - The log level to check.
   * @returns True if the log level is enabled, false otherwise.
   */
  protected isLevelEnabled(level: LogLevel): boolean {
    return logLevels[level] >= logLevels[this.logLevel];
  }

  /**
   * Prints the log message based on the specified format.
   * @param args - The arguments for the log message.
   */
  protected printMessage(args: PrintMessageArgs): void {
    switch (this.format) {
      case 'json':
        this.printJson(args);
        break;
      case 'text':
        this.printText(args);
        break;
    }
  }

  protected printJson({ message, params, context, severity, stack }: PrintMessageArgs) {
    const output: {
      severity: string;
      time: string;
      message: string;
      name: string;
      stack_trace?: string;
      context?: unknown;
      params?: unknown[];
      httpRequest?: HttpRequest;
      'logging.googleapis.com/sourceLocation'?: SourceLocation;
      'logging.googleapis.com/trace'?: string;
      'logging.googleapis.com/spanId'?: string;
      'logging.googleapis.com/trace_sampled'?: boolean;
      'logging.googleapis.com/labels'?: Record<string, string>;
      'logging.googleapis.com/insertId'?: string;
      'logging.googleapis.com/operation'?: Operation;
      [key: string]: unknown;
    } = {
      severity: severity.toUpperCase(),
      time: new Date().toISOString(),
      name: this.name,
      message,
    };

    if (stack) {
      output.stack_trace = stack;
    }
    if (context) {
      output.context = context;
    }

    for (const param of params) {
      if (isPlainObject(param)) {
        for (const [k, v] of Object.entries(param)) {
          if (k === 'sourceLocation' && isPlainObject(v)) {
            output['logging.googleapis.com/sourceLocation'] = v as unknown as SourceLocation;
          } else if (k === 'trace' && typeof v === 'string') {
            output['logging.googleapis.com/trace'] = v;
          } else if (k === 'spanId' && typeof v === 'string') {
            output['logging.googleapis.com/spanId'] = v;
          } else if (k === 'trace_sampled' && typeof v === 'boolean') {
            output['logging.googleapis.com/trace_sampled'] = v;
          } else if (k === 'labels' && isPlainObject(v)) {
            output['logging.googleapis.com/labels'] = v as Record<string, string>;
          } else if (k === 'insertId' && typeof v === 'string') {
            output['logging.googleapis.com/insertId'] = v;
          } else if (k === 'operation' && isPlainObject(v)) {
            output['logging.googleapis.com/operation'] = v as unknown as Operation;
          } else if (k === 'httpRequest' && isPlainObject(v)) {
            output.httpRequest = v as unknown as HttpRequest;
          } else {
            output[k] = v;
          }
        }
      } else if (param) {
        if (!output.params) output.params = [];
        output.params?.push(param);
      }
    }

    this.print(this.formatJson(output));
  }

  /**
   * Prints the log message in JSON format.
   * @param message - The log message.
   * @param params - Additional parameters for the log message.
   * @param context - The context of the log message.
   * @param severity - The severity level of the log message.
   * @param stack - The stack trace of the log message.
   */
  protected formatJson(output: Record<string, unknown>): string {
    return JSON.stringify(output);
  }

  /**
   * Prints the log message in text format.
   * @param message - The log message.
   * @param params - Additional parameters for the log message.
   * @param context - The context of the log message.
   * @param severity - The severity level of the log message.
   * @param stack - The stack trace of the log message.
   */
  protected printText({ message, params, context, severity, stack }: PrintMessageArgs) {
    const output: string[] = [
      this.colorize(severity.toUpperCase(), this.getColorNameByLogLevel(severity)),
      this.colorize(`[${this.name}]`, 'gray'),
      context ? this.colorize(`[${context}]`, 'yellow') : '',
      severity === 'error' ? this.colorize(message, this.getColorNameByLogLevel(severity)) : message,
    ];

    for (const param of params) {
      if (isPlainObject(param)) {
        output.push(`${this.formatObject(param)}`);
      } else if (param) {
        output.push(`${this.colorize(`${param}`, 'bold')}`);
      }
    }

    this.print(output.filter((t) => t).join(' '));

    if (severity === 'error' && stack) {
      this.print(stack);
    }
  }

  protected print(str: string) {
    process.stdout.write(str + '\n');
  }

  /**
   * Formats an object into a string representation.
   * @param obj - The object to format.
   * @param parentKey - The parent key for nested objects.
   * @returns The formatted string representation of the object.
   */
  protected formatObject(obj: Record<string, unknown>, parentKey = ''): string {
    const values: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      if (isPlainObject(value)) {
        values.push(this.formatObject(value, `${parentKey}${key}.`));
      } else {
        const k = this.colorize(`${parentKey}${key}`, 'cyan');
        if (value === null) {
          values.push(`${k}=${this.colorize('null', 'gray')}`);
        } else if (value !== undefined) {
          values.push(`${k}=${value}`);
        }
      }
    }

    return values.join(' ');
  }

  protected extractMessages(messages: unknown[]): {
    message: string;
    params: unknown[];
    context: string | null;
  } {
    let message = '';
    let params: unknown[] = [];
    if (typeof messages[0] === 'string') {
      message = messages[0];
      params = messages.slice(1);
    } else {
      params = messages;
    }

    if (params.length === 0) {
      return { message, params, context: null };
    }

    const last = params[params.length - 1];
    if (typeof last === 'string') {
      return {
        message,
        params: params.slice(0, params.length - 1),
        context: last,
      };
    } else {
      return { message, params, context: null };
    }
  }

  /**
   * Extracts the message, parameters, and context from the provided messages.
   * @param messages - The array of messages to extract from.
   * @returns An object containing the extracted message, parameters, and context.
   */
  protected extractMessagesWithStack(args: unknown[]): {
    message: string;
    params: unknown[];
    context: string | null;
    stack?: string | null;
  } {
    if (args[0] instanceof Error) {
      const [err, ...params] = args;
      const last = params[params.length - 1];
      if (typeof last === 'string') {
        return {
          message: err.message,
          stack: err.stack,
          context: last,
          params: params.slice(0, params.length - 1),
        };
      } else {
        return {
          message: err.message,
          stack: err.stack,
          context: null,
          params,
        };
      }
    }

    if (args.length > 1 && typeof args[0] === 'string' && args[1] instanceof Error) {
      const message = args[0];
      const err = args[1];
      const params = args.slice(2);
      const last = params[params.length - 1];
      if (typeof last === 'string') {
        return {
          message,
          stack: err.stack,
          context: last,
          params: params.slice(0, -1).concat([{ error: err.toString() }]),
        };
      } else {
        return {
          message,
          stack: err.stack,
          context: null,
          params: params.concat([{ error: err.toString() }]),
        };
      }
    }

    if (args.length === 2) {
      const last = args[1];
      if (this.isStackFormat(last)) {
        if (typeof args[0] === 'string') {
          return {
            message: args[0],
            params: [],
            context: null,
            stack: last,
          };
        } else {
          return {
            message: '',
            params: [args[0]],
            context: null,
            stack: last,
          };
        }
      } else {
        return this.extractMessages(args);
      }
    }

    if (args.length === 3) {
      const [first, second, last] = args;
      if (!this.isStackFormat(second)) {
        return this.extractMessages(args);
      }

      let message = '';
      let params: unknown[] = [];
      if (typeof first === 'string') {
        message = first;
        params = [];
      } else {
        params = [first];
      }

      if (typeof last === 'string') {
        return {
          message,
          params,
          context: last,
          stack: second,
        };
      } else if (last === undefined) {
        return {
          message,
          params,
          context: null,
          stack: second,
        };
      } else {
        return this.extractMessages(args);
      }
    }

    return this.extractMessages(args);
  }

  protected isStackFormat(stack: unknown): stack is string {
    if (typeof stack !== 'string') {
      return false;
    }

    return /^(.)+\n\s+at .+:\d+:\d+/.test(stack);
  }

  protected colorize(text: string, colorName: ColorName) {
    if (!text) return '';

    switch (colorName) {
      case 'bold':
        return `\x1B[1m${text}\x1B[0m`;
      case 'green':
        return `\x1B[32m${text}\x1B[39m`;
      case 'yellow':
        return `\x1B[33m${text}\x1B[39m`;
      case 'red':
        return `\x1B[31m${text}\x1B[39m`;
      case 'magentaBright':
        return `\x1B[95m${text}\x1B[39m`;
      case 'cyanBright':
        return `\x1B[96m${text}\x1B[39m`;
      case 'cyan':
        return `\x1B[36m${text}\x1B[39m`;
      case 'gray':
        return `\x1B[90m${text}\x1B[39m`;
      case 'plain':
        return text;
    }
  }

  protected getColorNameByLogLevel(severity: Severity): ColorName {
    switch (severity) {
      case 'verbose':
        return 'cyanBright';
      case 'info':
        return 'green';
      case 'debug':
        return 'magentaBright';
      case 'warn':
        return 'yellow';
      case 'error':
        return 'red';
      case 'fatal':
        return 'bold';
      default:
        return 'plain';
    }
  }
}
