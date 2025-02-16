import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { RESTAPISuccessResult } from '@workspace/types';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, RESTAPISuccessResult<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<RESTAPISuccessResult<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        status: context.switchToHttp().getResponse().statusCode,
        message: 'Success',
        timestamp: new Date().toISOString(),
        path: context.switchToHttp().getRequest().url,
      })),
    );
  }
}
