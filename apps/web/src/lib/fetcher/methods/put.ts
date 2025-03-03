import { buildCredentials, buildHeaders, buildRequestBody } from '../utils';
import { http, type FetchResult } from '../http';
import { type PostOptions } from './post';

/**
 * Sends a PUT request to the specified path with the given body.
 *
 * @template T - The type of the request body.
 * @template U - The expected response type.
 * @param {string} path - The API endpoint path.
 * @param {T} body - The request body.
 * @param {Options<U>} [options] - The request options.
 */
export async function put<T, U = object>(path: string, body: T, options?: PostOptions<U>): Promise<FetchResult<U>> {
  return http<U>(path, {
    method: 'PUT',
    body: buildRequestBody(body),
    headers: {
      'Content-Type': 'application/json',
      ...buildHeaders(options?.headers),
    },
    credentials: buildCredentials(options?.credentials),
  });
}
