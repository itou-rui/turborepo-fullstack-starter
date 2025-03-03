import { buildCredentials, buildHeaders, buildRequestBody } from '../utils';
import { http, type FetchResult } from '../http';

export interface PostOptions<T> {
  params?: T;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
}

/**
 * Sends a POST request to the specified path with the given body.
 *
 * @template T - The type of the request body.
 * @template U - The expected response type.
 * @template V - The type of the options object.
 * @param {string} path - The API endpoint path.
 * @param {T} body - The request body.
 * @param {Options<V>} [options] - The request options.
 */
export async function post<T, U = null, V = object>(path: string, body: T, options?: PostOptions<V>): Promise<FetchResult<U>> {
  return http<U>(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...buildHeaders(options?.headers),
    },
    body: buildRequestBody(body),
    credentials: buildCredentials(options?.credentials),
  });
}
