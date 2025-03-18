import { chain, auth } from './middlewares';

/**
 * Configuration object for middleware.
 *
 * The `matcher` property defines an array of match conditions.
 * Each match condition can specify a `source` path and a `missing` array.
 * The `missing` array contains objects that define conditions for missing headers.
 *
 * - `source`: The path pattern to match.
 * - `missing`: An array of conditions for missing headers.
 *   - `type`: The type of condition (e.g., "header").
 *   - `key`: The header key to check.
 *   - `value` (optional): The expected value of the header.
 */
export const config = {
  matcher: [
    {
      source: '/dashboard/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    {
      source: '/auth/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

export default chain([auth]);
