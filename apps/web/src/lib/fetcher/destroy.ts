import type { FetchErrorResult, FetchSuccessResult, Options } from './types';
import { buildCredentials, buildHeaders, buildPathWithSearchParams } from './utils';
import { http } from './http';

/**
 * Sends a DELETE request to the specified path.
 *
 * @template T - The expected response type.
 * @param {string} path - The API endpoint path.
 * @param {Options<T>} [options] - The request options.
 * @returns {Promise<FetchSuccessResult<T> | FetchErrorResult>} - The result of the fetch operation.
 */
export async function destroy<T = object>(
  path: string,
  options?: Options<T>,
): Promise<T extends void ? FetchSuccessResult<void> : FetchSuccessResult<T> | FetchErrorResult> {
  return http<T>(buildPathWithSearchParams(path, options?.params ? options.params : undefined), {
    method: 'DELETE',
    headers: buildHeaders(options?.headers),
    credentials: buildCredentials(options?.credentials),
  });
}
