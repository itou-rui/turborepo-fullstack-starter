import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type LogFormat } from '@workspace/logger';
import { type RESTAPIErrorResult } from '@workspace/types';
import { StructuredLogger } from '../logger';

/**
 * Exception filter to handle all uncaught exceptions and format error responses.
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new StructuredLogger({
    name: AllExceptionsFilter.name,
    level: 'error',
    format: process.env.LOG_FORMAT as LogFormat,
  });

  /**
   * Method to catch and handle all uncaught exceptions.
   * @param exception - The caught exception.
   * @param host - The ArgumentsHost containing request and response objects.
   */
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return super.catch(exception, host);
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof Error) {
      this.logger.error(`${request.method} ${HttpStatus.INTERNAL_SERVER_ERROR}  ${request.url}`, {
        error: exception,
        body: request.body,
        query: request.query,
        params: request.params,
      });
    } else {
      this.logger.error(`${request.method} ${HttpStatus.INTERNAL_SERVER_ERROR}  ${request.url}`, {
        error: String(exception),
      });
    }

    const errorResponse: RESTAPIErrorResult = {
      code: RESTAPIErrorJSONCodes.General,
      message: 'An internal server error occurred',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
