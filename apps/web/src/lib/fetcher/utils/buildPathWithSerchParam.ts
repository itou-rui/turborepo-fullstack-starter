/**
 * Builds a URL path with search parameters.
 * @template T - The type of the params object.
 * @param path - The base URL path.
 * @param params - Optional search parameters to include in the URL.
 * @returns The URL path with search parameters.
 */
export function buildPathWithSearchParams<T = object>(path: string, params?: T): string {
  if (!params || Object.keys(params).length === 0) {
    return path;
  }

  for (const key in params) {
    if (params[key] === undefined) {
      delete params[key];
    }
  }

  const urlSearchParams = new URLSearchParams(params as any);
  return `${path}?${urlSearchParams.toString()}`;
}
