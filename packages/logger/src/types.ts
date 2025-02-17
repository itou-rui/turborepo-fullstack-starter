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
export interface PrintMessageArgs {
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
}

/**
 * Represents the options for configuring a logger.
 */
export interface LoggerOptions {
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
}

export interface SourceLocation {
  /**
   * The file where the log entry was generated.
   */
  file: string;

  /**
   * The line number in the file where the log entry was generated.
   */
  line: string;

  /**
   * The function name where the log entry was generated.
   */
  function: string;
}

export interface HttpRequest {
  /**
   * The HTTP method of the request (e.g., GET, POST).
   */
  requestMethod: string;

  /**
   * The URL of the request.
   */
  requestUrl: string;

  /**
   * The size of the request in bytes.
   */
  requestSize: number;

  /**
   * The HTTP status code of the response.
   */
  status: number;

  /**
   * The size of the response in bytes.
   */
  responseSize: number;

  /**
   * The user agent string of the client making the request.
   */
  userAgent: string;

  /**
   * The IP address of the client making the request.
   */
  remoteIp: string;

  /**
   * The IP address of the server handling the request.
   */
  serverIp: string;

  /**
   * The latency of the request in seconds.
   */
  latency: string;

  /**
   * Whether the response was served from cache.
   */
  cacheLookup: boolean;

  /**
   * Whether the response was a cache hit.
   */
  cacheHit: boolean;

  /**
   * Whether the response was validated with the origin server.
   */
  cacheValidatedWithOriginServer: boolean;

  /**
   * The number of bytes returned from cache.
   */
  cacheFillBytes: number;

  /**
   * The protocol used for the request (e.g., HTTP/1.1, HTTP/2).
   */
  protocol: string;
}

export interface Operation {
  /**
   * The unique identifier for the operation.
   */
  id: string;

  /**
   * The producer of the operation.
   */
  producer: string;

  /**
   * Indicates if this is the first operation.
   */
  first: boolean;

  /**
   * Indicates if this is the last operation.
   */
  last: boolean;
}

/**
 * Represents the context of a log message.
 */
export interface LogContext {
  /**
   * HTTP request information.
   */
  httpRequest?: HttpRequest;

  /**
   * Source location information.
   */
  sourceLocation?: SourceLocation;

  /**
   * Trace information.
   */
  trace?: string;

  /**
   * Span ID information.
   */
  spanId?: string;

  /**
   * Indicates if the trace is sampled.
   */
  trace_sampled?: boolean;

  /**
   * Timestamp of the log entry.
   */
  time?: string;

  /**
   * Additional labels for the log entry.
   */
  labels?: Record<string, string>;

  /**
   * Unique identifier for the log entry.
   */
  insertId?: string;

  /**
   * Operation information.
   */
  operation?: Operation;

  [key: string]: unknown;
}

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
