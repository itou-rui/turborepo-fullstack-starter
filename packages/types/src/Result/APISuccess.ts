import type { RESTAPIBaseResult } from './APIBase';

/**
 * Interface representing a successful REST API response.
 * @template T - The type of the data in the response.
 */
export interface RESTAPISuccessResult<T> extends RESTAPIBaseResult {
  /**
   * The data returned in the response.
   */
  data: T;
}
