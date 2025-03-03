import type { FetchErrorResult, FetchSuccessResult, Options } from './types';
import { buildCredentials, buildHeaders, buildRequestBody } from './utils';
import { http } from './http';

/**
 * Sends a PATCH request to the specified path with the given body.
 *
 * @template T - The type of the request body.
 * @template U - The expected response type.
 * @param {string} path - The API endpoint path.
 * @param {T} body - The request body.
 * @param {Options<U>} [options] - The request options.
 * @returns {Promise<FetchSuccessResult<U> | FetchErrorResult>} - The result of the fetch operation.
 */
export async function patch<T, U = object>(
  path: string,
  body: T,
  options?: Options<U>,
): Promise<U extends void ? FetchSuccessResult<void> : FetchSuccessResult<U> | FetchErrorResult> {
  return http<U>(path, {
    method: 'PATCH',
    body: buildRequestBody(body),
    headers: buildHeaders({ ...options?.headers, 'Content-Type': 'application/json' }),
    credentials: buildCredentials(options?.credentials),
  });
}
