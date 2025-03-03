import { type RESTAPISuccessResult, type RESTAPIErrorResult } from '@workspace/types';
import { buildFullPath } from './utils';

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
 * Represents the result of a fetch operation.
 * If the generic type T is void, it returns a FetchSuccessResult with void.
 * Otherwise, it returns either a FetchSuccessResult with T or a FetchErrorResult.
 */
export type FetchResult<T> = T extends void ? FetchSuccessResult<void> : FetchSuccessResult<T> | FetchErrorResult;

/**
 * Options for HTTP requests.
 */
export interface HttpOptions {
  next?: NextFetchRequestConfig;
}

/**
 * Makes an HTTP request to the specified path with the given configuration.
 *
 * @template T - The expected response type.
 * @param {string} path - The API endpoint path.
 * @param {RequestInit} config - The request configuration.
 */
export async function http<T>(path: string, config: RequestInit, options?: HttpOptions): Promise<FetchResult<T>> {
  const baseUrl = process.env.BASE_URL as string;

  if (baseUrl === undefined) {
    throw new Error('BASE_URL is not defined');
  }
  if (typeof baseUrl !== 'string') {
    throw new TypeError('BASE_URL is not a string');
  }

  const fullPath = buildFullPath(baseUrl, path);

  const url = new URL(fullPath);
  if (url.origin !== new URL(baseUrl).origin) {
    throw new Error('Absolute URLs with different origins are not allowed.');
  }

  const response = await fetch(new Request(fullPath, config), options);
  const data = await response.json().catch(() => null);

  if (response.ok) {
    return {
      ...data,
      ok: true,
      headers: response.headers,
    } as FetchResult<T>;
  }

  return {
    ...data,
    ok: false,
    headers: response.headers,
  } as FetchResult<T>;
}
