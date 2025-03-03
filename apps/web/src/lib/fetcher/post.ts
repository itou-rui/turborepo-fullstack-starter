import type { FetchErrorResult, FetchSuccessResult, Options } from './types';
import { buildCredentials, buildHeaders, buildRequestBody } from './utils';
import { http } from './http';

/**
 * Sends a POST request to the specified path with the given body.
 *
 * @template T - The type of the request body.
 * @template U - The expected response type.
 * @template V - The type of the options object.
 * @param {string} path - The API endpoint path.
 * @param {T} body - The request body.
 * @param {Options<V>} [options] - The request options.
 * @returns {Promise<FetchSuccessResult<U> | FetchErrorResult>} - The result of the fetch operation.
 */
export async function post<T, U, V = object>(
  path: string,
  body: T,
  options?: Options<V>,
): Promise<U extends void ? FetchSuccessResult<void> : FetchSuccessResult<U> | FetchErrorResult> {
  return http<U>(path, {
    method: 'POST',
    headers: buildHeaders({ ...options?.headers, 'Content-Type': 'application/json' }),
    body: buildRequestBody(body),
    credentials: buildCredentials(options?.credentials),
  });
}
