/**
 * Represents the color names used for logging.
 */
export type ColorName = 'bold' | 'green' | 'yellow' | 'red' | 'magentaBright' | 'cyanBright' | 'cyan' | 'gray' | 'plain';

/**
 * Represents the log levels.
 */
export type LogLevel = 'verbose' | 'debug' | 'info' | 'log' | 'error' | 'warn' | 'fatal';

/**
 * Represents the severity levels of log messages.
 */
export type Severity = 'verbose' | 'debug' | 'info' | 'error' | 'warn' | 'fatal';

/**
 * Represents the format of log messages.
 */
export type LogFormat = 'text' | 'json';

/**
 * Represents the arguments for printing a log message.
 */
export type PrintMessageArgs = {
  /**
   * The log message.
   */
  message: string;
  /**
   * Additional parameters for the log message.
   */
  params: unknown[];
  /**
   * The context of the log message.
   */
  context: string | null;
  /**
   * The severity level of the log message.
   */
  severity: Severity;
  /**
   * The stack trace of the log message.
   */
  stack?: string | null;
};

/**
 * Represents the options for configuring a logger.
 */
export type LoggerOptions = {
  /**
   * The name of the logger.
   */
  name?: string;
  /**
   * The logging level.
   */
  level?: LogLevel;
  /**
   * The format of the log messages.
   */
  format?: LogFormat;
  /**
   * Whether the logger is enabled.
   * @default true
   */
  enabled?: boolean;
};

/**
 * Represents the context of a log message.
 */
export type LogContext = {
  [key: string]: unknown;
};

/**
 * Interface for a structured logger.
 */
export interface IStructuredLogger {
  log(message: string, context?: LogContext): void;
  error(message: string | Error, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
  verbose(message: string, context?: LogContext): void;
  fatal(message: string | Error, context?: LogContext): void;
}
