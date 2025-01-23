import { type NextFetchEvent, type NextMiddleware, type NextRequest, NextResponse } from 'next/server';

/**
 * @param middleware - The next middleware function.
 */
export function inlineCss(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  };
}
