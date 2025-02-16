import type { RESTAPIResult } from './APIResult';

export interface RESTAPISuccessResult<T> extends RESTAPIResult {
  data: T;
}
