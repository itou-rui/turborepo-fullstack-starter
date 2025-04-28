import { type NextFetchEvent, type NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/internal/session';

/**
 * Middleware to add custom headers to the request.
 *
 * @param middleware - The next middleware function.
 * @returns A function that handles the request and adds custom headers.
 */
export function auth(middleware: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const sessionUser = await getSession({ enableLogging: false });

    if (request.nextUrl.pathname.startsWith('/auth/signin')) {
      if (!sessionUser) return middleware(request, event);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/auth/signup')) {
      if (!sessionUser) return middleware(request, event);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!sessionUser) return NextResponse.redirect(new URL('/auth/signin', request.url));
      return middleware(request, event);
    }

    return NextResponse.redirect(new URL('/auth/signin', request.url));
  };
}
