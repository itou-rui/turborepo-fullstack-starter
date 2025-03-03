import { buildFullPath } from './utils';
import type { FetchErrorResult, FetchSuccessResult } from './types';

/**
 * Makes an HTTP request to the specified path with the given configuration.
 *
 * @template T - The expected response type.
 * @param {string} path - The API endpoint path.
 * @param {RequestInit} config - The request configuration.
 * @param {number} [revalidate=0] - The revalidation time in seconds.
 * @returns {Promise<FetchSuccessResult<T> | FetchErrorResult>} - The result of the fetch operation.
 */
export async function http<T>(
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
  const res = await fetch(request, { credentials: 'include', next: { revalidate } });
  const data = await res.json().catch(() => null);

  if (res.ok) {
    return {
      ...data,
      ok: true,
      headers: res.headers,
    } as T extends void ? FetchSuccessResult<void> : FetchSuccessResult<T> | FetchErrorResult;
  }

  return {
    ...data,
    ok: false,
    headers: res.headers,
  } as T extends void ? FetchSuccessResult<void> : FetchSuccessResult<T> | FetchErrorResult;
}
