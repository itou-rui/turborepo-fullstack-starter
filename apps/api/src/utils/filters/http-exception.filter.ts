import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { RESTAPIErrorJSONCodes, RESTAPIErrorResult } from '@workspace/types';
import { StructuredLogger } from '../logger';
import { type LogFormat } from '@workspace/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new StructuredLogger({
    name: HttpExceptionFilter.name,
    level: 'warn',
    format: process.env.LOG_FORMAT as LogFormat,
  });

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    this.logger.warn(exception.message, {
      status,
      path: request.url,
      method: request.method,
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
