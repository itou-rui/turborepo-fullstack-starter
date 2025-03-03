import { buildCredentials, buildHeaders, buildPathWithSearchParams } from '../utils';
import { http, type FetchResult } from '../http';
import { type PostOptions } from './post';

/**
 * Sends a DELETE request to the specified path.
 *
 * @template T - The expected response type.
 * @param {string} path - The API endpoint path.
 * @param {Options<T>} [options] - The request options.
 */
export async function destroy<T = object>(path: string, options?: PostOptions<T>): Promise<FetchResult<T>> {
  return http<T>(buildPathWithSearchParams(path, options?.params ? options.params : undefined), {
    method: 'DELETE',
    headers: buildHeaders(options?.headers),
    credentials: buildCredentials(options?.credentials),
  });
}
