import { type RESTAPISuccessResult, type RESTAPIErrorResult } from '@workspace/types';

/**
 * Interface representing a successful fetch result.
 * @template T - The type of the data returned in the success result.
 */
export interface FetchSuccessResult<T> extends RESTAPISuccessResult<T> {
  ok: true;
  headers: Headers;
}

/**
 * Interface representing an error fetch result.
 */
export interface FetchErrorResult extends RESTAPIErrorResult {
  ok: false;
  headers: Headers;
}

/**
 * Type representing the options for a fetch request.
 * @template T - The type of the params object.
 */
export type Options<T = object> = {
  params?: T;
  headers?: HeadersInit;
  credentials?: Request['credentials'];
  revalidate?: number;
};
