import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { RESTAPIResult } from '@workspace/types';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, RESTAPIResult<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<RESTAPIResult<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        status: context.switchToHttp().getResponse().statusCode,
        message: 'Response',
      })),
    );
  }
}
