import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Request, Response } from 'express';
import type { RESTAPISuccessResult } from '@workspace/types';
import { type LogFormat } from '@workspace/logger';
import { StructuredLogger } from 'utils/logger';

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T, RESTAPISuccessResult<T>> {
  private readonly logger = new StructuredLogger({
    name: HttpResponseInterceptor.name,
    level: 'info',
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

  formatUserAgent(userAgent?: string) {
    if (userAgent === undefined) {
      return 'Unknown';
    }
    for (const agent of HttpResponseInterceptor.agents) {
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
   */
  printLog(request: Request, status: number, context?: any) {
    const shortUserAgent = this.formatUserAgent(request.headers['user-agent']);
    this.logger.log(`${request.method} ${status} ${shortUserAgent} ${request.url}`, context);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<RESTAPISuccessResult<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        this.printLog(request, status, data);
        return { data, status, message: 'Success', timestamp: new Date().toISOString(), path: request.url };
      }),
    );
  }
}
