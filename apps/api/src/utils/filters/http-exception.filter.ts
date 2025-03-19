import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type RESTErrorData, type RESTAPIErrorResult } from '@workspace/types';
import { type LogFormat } from '@workspace/logger';
import { APIException, type APIExceptionDetails } from '../exceptions';
import { StructuredLogger } from '../logger';

type HttpExceptionGetResponse = {
  message: string | object | object[];
  error: string;
  statusCode: number;
};

/**
 * Exception filter to handle HTTP exceptions and format error responses.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<APIException> {
  private readonly logger = new StructuredLogger({
    name: HttpExceptionFilter.name,
    level: 'warn',
    format: process.env.LOG_FORMAT as LogFormat,
  });

  private static readonly agents: string[] = [
    'Chrome',
    'Firefox',
    'Safari',
    'Edge',
    'OPR',
    'Python-Requests',
    'Python',
    'Curl',
    'Postman',
    'Axios',
    'Node-Fetch',
    'Insomnia',
    'Googlebot',
    'Bingbot',
    'Twitterbot',
  ];

  /**
   * Formats the user agent string by matching it against known agents.
   * If a match is found, it returns the agent name and version.
   * If no match is found, it returns the first part of the user agent string.
   * @param {string} userAgent - The user agent string to format.
   */
  formatUserAgent(userAgent?: string) {
    if (userAgent === undefined) {
      return 'Unknown';
    }
    for (const agent of HttpExceptionFilter.agents) {
      const match = userAgent.match(new RegExp(`${agent}/(\\d+)`));
      if (match) {
        return `${agent} ${match[1]}`;
      }
    }
    return userAgent.split(' ')[0];
  }

  /**
   * Logs the HTTP request details and error information.
   *
   * @param {Request} request - The HTTP request object.
   * @param {any} error - The error object.
   */
  printLog(request: Request, status: number, error: APIExceptionDetails) {
    const shortUserAgent = this.formatUserAgent(request.headers['user-agent']);
    const message = `${request.method} ${status} ${shortUserAgent} ${request.url}`;
    this.logger.warn(message, { error, body: request.body, query: request.query, params: request.params });
  }

  /**
   * Creates a JSON response object for an API error.
   *
   * @param {APIExceptionDetails} details - The details of the API exception.
   * @param {number} status - The HTTP status code.
   * @param {string} requestUrl - The URL of the request that caused the error.
   * @returns {RESTAPIErrorResult} - The JSON response object.
   */
  createErrorResponseJson(details: APIExceptionDetails, status: number, requestUrl: string): RESTAPIErrorResult {
    return {
      ...details,
      status,
      timestamp: new Date().toISOString(),
      path: requestUrl,
    };
  }

  /**
   * Converts the given exception response to a REST API error data format.
   * @param exceptionResponse - The exception response object to convert.
   * @returns The converted REST API error data.
   */
  private convertToRESTAPIErrorData(exceptionResponse: object): RESTErrorData {
    // array of errors
    if (Array.isArray(exceptionResponse)) {
      return {
        _errors: exceptionResponse.map((item) => {
          const [code, message] = Object.values(item);
          return {
            code: String(code) || 'UNKNOWN_ERROR',
            message: String(message) || 'Unknown error',
          };
        }),
      };
    }
    // object of errors
    else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const response = exceptionResponse as Record<string, unknown>;

      // Handle array in message property
      if (Array.isArray(response.message)) {
        return {
          _errors: response.message.map((item) => {
            const [code, message] = Object.values(item);
            return {
              code: String(code) || 'UNKNOWN_ERROR',
              message: String(message) || 'Unknown error',
            };
          }),
        };
      }

      return {
        code: 'UNKNOWN_ERROR',
        message: String(response.message || 'Unknown error'),
      };
    }
    // fallback
    return {
      code: 'UNKNOWN_ERROR',
      message: String(exceptionResponse),
    };
  }

  /**
   * Method to catch and handle HTTP exceptions.
   * @param exception - The caught HttpException.
   * @param host - The ArgumentsHost containing request and response objects.
   */
  catch(exception: APIException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const errorDetails =
      exception instanceof APIException
        ? (exceptionResponse as APIExceptionDetails)
        : typeof exceptionResponse === 'string'
          ? { code: RESTAPIErrorJSONCodes.General, message: exceptionResponse }
          : {
              code: RESTAPIErrorJSONCodes.General,
              message: 'An error occurred.',
              errors: this.convertToRESTAPIErrorData(exceptionResponse as HttpExceptionGetResponse),
            };

    this.printLog(request, status, errorDetails);

    const responseJson = this.createErrorResponseJson(errorDetails, status, request.url);
    response.status(status).json(responseJson);
  }
}
