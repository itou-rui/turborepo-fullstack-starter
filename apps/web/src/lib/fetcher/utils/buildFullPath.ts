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
  if (!relativeURL) return baseURL;
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
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
