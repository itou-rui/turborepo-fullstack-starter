import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { RESTAPIErrorJSONCodes, RESTAPIErrorResult } from '@workspace/types';
import { type LogFormat } from '@workspace/logger';
import { StructuredLogger } from '../logger';
import { formatUserAgent } from '../formats';

/**
 * Exception filter to handle HTTP exceptions and format error responses.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new StructuredLogger({
    name: HttpExceptionFilter.name,
    level: 'warn',
    format: process.env.LOG_FORMAT as LogFormat,
  });

  /**
   * Method to catch and handle HTTP exceptions.
   * @param exception - The caught HttpException.
   * @param host - The ArgumentsHost containing request and response objects.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;
    const shortUserAgent = formatUserAgent(request.headers['user-agent']);

    this.logger.warn(`${request.method} ${status} ${shortUserAgent} ${request.url}`, {
      error: exceptionResponse,
      body: request.body,
      query: request.query,
      params: request.params,
    });

    const errorResponse: RESTAPIErrorResult = {
      code: exceptionResponse?.code || RESTAPIErrorJSONCodes.GeneralError,
      message: exceptionResponse?.message || 'An unknown error occurred',
      errors: exceptionResponse?.errors,
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
