/**
 * Builds the request body for a fetch request.
 * @template T - The type of the body object.
 * @param body - The body object to be included in the request.
 * @returns The request body as a string, FormData, or null.
 */
export function buildRequestBody<T = object>(body: T): string | FormData | null {
  if (body instanceof FormData) {
    return body;
  }

  if (!body) {
    return null;
  }

  return JSON.stringify(body);
}
