/**
 * Builds the headers for a fetch request.
 * @template T - The type of the headers object.
 * @param headers - Optional headers to include in the request.
 * @returns The combined headers.
 */
export function buildHeaders<T = HeadersInit>(headers?: T): HeadersInit {
  const defaultHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (!headers) {
    return defaultHeaders;
  }

  if (headers instanceof Headers) {
    return {
      ...defaultHeaders,
      ...Object.fromEntries(headers.entries()),
    };
  }

  return { ...defaultHeaders, ...headers };
}
