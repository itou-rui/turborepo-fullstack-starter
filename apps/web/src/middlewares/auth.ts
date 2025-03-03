import { type NextFetchEvent, type NextMiddleware, NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to add custom headers to the request.
 *
 * @param middleware - The next middleware function.
 * @returns A function that handles the request and adds custom headers.
 */
export function auth(middleware: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const accessToken = request.cookies.get('session_token');
    if (accessToken) return middleware(request, event);

    if (request.nextUrl.pathname.startsWith('/auth/signin')) {
      return middleware(request, event);
    }

    if (request.nextUrl.pathname.startsWith('/auth/signup')) {
      return middleware(request, event);
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  };
}
