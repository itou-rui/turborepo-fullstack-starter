export type ColorName = 'bold' | 'green' | 'yellow' | 'red' | 'magentaBright' | 'cyanBright' | 'cyan' | 'gray' | 'plain';

export type LogLevel = 'verbose' | 'debug' | 'info' | 'log' | 'error' | 'warn' | 'fatal';

export type Severity = 'verbose' | 'debug' | 'info' | 'error' | 'warn' | 'fatal';

export type LogFormat = 'text' | 'json';

export type PrintMessageArgs = {
  message: string;
  params: unknown[];
  context: string | null;
  severity: Severity;
  stack?: string | null;
};

export type LoggerOptions = {
  name?: string;
  level?: LogLevel;
  format?: LogFormat;
  enabled?: boolean;
};

export type LogContext = {
  [key: string]: unknown;
};

export interface IStructuredLogger {
  log(message: string, context?: LogContext): void;
  error(message: string | Error, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
  verbose(message: string, context?: LogContext): void;
  fatal(message: string | Error, context?: LogContext): void;
}
