import { type NextMiddleware, NextResponse } from 'next/server';

/**
 * A factory function type that takes a middleware and returns a middleware.
 */
export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

/**
 * Chains an array of middleware functions into a single middleware.
 * @param {MiddlewareFactory[]} functions - An array of middleware factory functions.
 * @param {number} [index=0] - The current index in the middleware array.
 * @returns {NextMiddleware} - The chained middleware.
 */
export function chain(functions: MiddlewareFactory[], index = 0): NextMiddleware {
  if (!functions[index]) return () => NextResponse.next();
  const next = chain(functions, index + 1);
  return functions[index](next);
}
