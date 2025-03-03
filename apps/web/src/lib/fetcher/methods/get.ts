import { buildCredentials, buildHeaders, buildPathWithSearchParams } from '../utils';
import { http, type FetchResult } from '../http';
import { type PostOptions } from './post';

export interface GetOptions<T> extends PostOptions<T> {
  next?: NextFetchRequestConfig;
}

/**
 * Sends a GET request to the specified path.
 *
 * @template T - The expected response type.
 * @template U - The type of the options object.
 * @param {string} path - The API endpoint path.
 * @param {GetOptions<U>} [options] - The request options.
 */
export async function get<T, U = object>(path: string, options?: GetOptions<U>): Promise<FetchResult<T>> {
  return http<T>(
    buildPathWithSearchParams(path, options?.params ?? undefined),
    {
      headers: buildHeaders(options?.headers),
      credentials: buildCredentials(options?.credentials),
    },
    { next: options?.next },
  );
}
