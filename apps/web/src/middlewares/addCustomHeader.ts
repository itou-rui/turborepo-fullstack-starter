import { type NextFetchEvent, type NextMiddleware, NextRequest } from 'next/server';

/**
 * Middleware to add custom headers to the request.
 *
 * @param middleware - The next middleware function.
 * @returns A function that handles the request and adds custom headers.
 */
export function addCustomHeader(middleware: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);
    return middleware(new NextRequest(request, { headers: requestHeaders }), event);
  };
}
