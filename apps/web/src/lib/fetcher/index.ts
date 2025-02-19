import { type RESTAPISuccessResult, type RESTAPIErrorResult } from '@workspace/types';
import { buildCredentials, buildFullPath, buildHeaders, buildPathWithSearchParams, buildRequestBody } from './utils';

/**
 * Interface representing a successful fetch result.
 * @template T - The type of the data returned in the success result.
 */
export interface FetchSuccessResult<T> extends RESTAPISuccessResult<T> {
  ok: true;
}

/**
 * Interface representing an error fetch result.
 */
export interface FetchErrorResult extends RESTAPIErrorResult {
  ok: false;
}

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
 * Makes an HTTP request to the specified path with the given configuration.
 *
 * @template T - The expected response type.
 * @param {string} path - The API endpoint path.
 * @param {RequestInit} config - The request configuration.
 * @param {number} [revalidate=0] - The revalidation time in seconds.
 * @returns {Promise<FetchSuccessResult<T> | FetchErrorResult>} - The result of the fetch operation.
 */
async function http<T>(
  path: string,
  config: RequestInit,
  revalidate = 0,
): Promise<T extends void ? FetchSuccessResult<void> : FetchSuccessResult<T> | FetchErrorResult> {
  const baseUrl = process.env.BASE_URL as string;
  const fullPath = buildFullPath(baseUrl, path);

  const url = new URL(fullPath);
  if (url.origin !== new URL(baseUrl).origin) {
    throw new Error('Absolute URLs with different origins are not allowed.');
  }

  const request = new Request(fullPath, config);
  const res = await fetch(request, { next: { revalidate } });
  const data = await res.json().catch(() => null);

  if (res.ok) {
    return {
      ...data,
      ok: true,
    } as T extends void ? FetchSuccessResult<void> : FetchSuccessResult<T> | FetchErrorResult;
  }

  return {
    ...data,
    ok: false,
  } as T extends void ? FetchSuccessResult<void> : FetchSuccessResult<T> | FetchErrorResult;
}

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
    headers: buildHeaders(options?.headers),
    body: buildRequestBody(body),
    credentials: buildCredentials(options?.credentials),
  });
}

/**
 * Sends a PUT request to the specified path with the given body.
 *
 * @template T - The type of the request body.
 * @template U - The expected response type.
 * @param {string} path - The API endpoint path.
 * @param {T} body - The request body.
 * @param {Options<U>} [options] - The request options.
 * @returns {Promise<FetchSuccessResult<U> | FetchErrorResult>} - The result of the fetch operation.
 */
export async function put<T, U = object>(
  path: string,
  body: T,
  options?: Options<U>,
): Promise<U extends void ? FetchSuccessResult<void> : FetchSuccessResult<U> | FetchErrorResult> {
  return http<U>(path, {
    method: 'PUT',
    body: buildRequestBody(body),
    headers: buildHeaders(options?.headers),
    credentials: buildCredentials(options?.credentials),
  });
}

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
    headers: buildHeaders(options?.headers),
    credentials: buildCredentials(options?.credentials),
  });
}

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

export const fetcher = { get, post, put, patch, destroy };
