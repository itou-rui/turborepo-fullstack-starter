import { buildCredentials, buildHeaders, buildPathWithSearchParams } from './utils';
import type { FetchErrorResult, FetchSuccessResult } from './types';
import { http } from './http';

/**
 * Type representing the options for a fetch request.
 * @template T - The type of the params object.
 */
type Options<T = object> = {
  params?: T;
  headers?: HeadersInit;
  credentials?: Request['credentials'];
  revalidate?: number;
};

/**
 * Sends a GET request to the specified path.
 *
 * @template T - The expected response type.
 * @template U - The type of the options object.
 * @param {string} path - The API endpoint path.
 * @param {Options<U>} [options] - The request options.
 * @returns {Promise<FetchSuccessResult<T> | FetchErrorResult>} - The result of the fetch operation.
 */
export async function get<T, U = object>(
  path: string,
  options?: Options<U>,
): Promise<T extends void ? FetchSuccessResult<void> : FetchSuccessResult<T> | FetchErrorResult> {
  return http<T>(
    buildPathWithSearchParams(path, options?.params ? options.params : undefined),
    {
      headers: buildHeaders(options?.headers),
      credentials: buildCredentials(options?.credentials),
    },
    options?.revalidate,
  );
}
