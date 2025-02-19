/**
 * Checks if a given URL is an absolute URL.
 * @param url - The URL to check.
 * @returns True if the URL is absolute, false otherwise.
 */
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Combines a base URL and a relative URL into a single URL.
 * @param baseURL - The base URL.
 * @param relativeURL - The relative URL.
 * @returns The combined URL.
 */
export function combineUrls(baseURL: string, relativeURL: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

/**
 * Builds the full URL path from a base URL and a requested URL.
 * @param baseURL - The base URL.
 * @param requestedURL - The requested URL.
 * @returns The full URL path.
 */
export function buildFullPath(baseURL: string, requestedURL: string): string {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineUrls(baseURL, requestedURL);
  }
  return requestedURL;
}

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
    return {
      ...defaultHeaders,
    };
  }

  return {
    ...defaultHeaders,
    ...headers,
  };
}

/**
 * For security reasons, credentials is set to the default value (“same-origin”) except in the local environment.
 * @see https://developer.mozilla.org/ja/docs/Web/API/Request/credentials
 */
export function buildCredentials(credentials?: Request['credentials']): Request['credentials'] | undefined {
  if (process.env.NODE_ENV !== 'development') {
    return undefined;
  }

  return credentials;
}

/**
 * Builds the request body for a fetch request.
 * @template T - The type of the body object.
 * @param body - The body object to be included in the request.
 * @returns The request body as a string, FormData, or null.
 */
export function buildRequestBody<T = object>(body: T): string | FormData | null {
  if (body instanceof FormData) return body;
  if (!body) return null;
  return JSON.stringify(body);
}

/**
 * Builds a URL path with search parameters.
 * @template T - The type of the params object.
 * @param path - The base URL path.
 * @param params - Optional search parameters to include in the URL.
 * @returns The URL path with search parameters.
 */
export function buildPathWithSearchParams<T = object>(path: string, params?: T): string {
  if (!params || Object.keys(params).length === 0) return path;

  for (const key in params) {
    if (params[key] === undefined) {
      delete params[key];
    }
  }

  const urlSearchParams = new URLSearchParams(params as any);
  return `${path}?${urlSearchParams.toString()}`;
}
