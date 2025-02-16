import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { type LogFormat } from '@workspace/logger';
import { RESTAPIErrorJSONCodes, RESTAPIErrorResult } from '@workspace/types';
import { StructuredLogger } from '../logger';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new StructuredLogger({
    name: AllExceptionsFilter.name,
    level: 'error',
    format: process.env.LOG_FORMAT as LogFormat,
  });

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return super.catch(exception, host);
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof Error) {
      this.logger.error(exception.message, {
        error: exception,
        path: request.url,
        method: request.method,
        requestId: request.id,
        body: request.body,
        query: request.query,
        params: request.params,
      });
    } else {
      this.logger.error('Unknown error occurred', {
        error: String(exception),
        path: request.url,
        method: request.method,
      });
    }

    const errorResponse: RESTAPIErrorResult = {
      code: RESTAPIErrorJSONCodes.GeneralError,
      message: 'An internal server error occurred',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
