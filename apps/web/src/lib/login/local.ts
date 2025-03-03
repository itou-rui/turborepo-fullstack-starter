'use server';

import { cookies } from 'next/headers';
import * as fetcher from '../fetcher';
import type { APISession, RESTPostAPIAuthLocalLoginJSONBody } from '@workspace/types';

export async function local(email: string, password: string) {
  const result = await fetcher.post<RESTPostAPIAuthLocalLoginJSONBody, APISession>('/api/auth/login', { email, password });

  if (result.ok === true) {
    const setCookie = result.headers.getSetCookie();
    if (setCookie && setCookie.length > 0) {
      const cookieString = setCookie[0];
      const match = cookieString.match(/^([^=]+)=([^;]+)/);
      if (match) {
        const [, name, value] = match;

        const options: { [key: string]: string | boolean | number } = {};
        cookieString
          .split(';')
          .slice(1)
          .forEach((part) => {
            const [key, val] = part.trim().split('=');
            if (val === undefined) {
              options[key.toLowerCase()] = true;
            } else {
              options[key.toLowerCase()] = val;
            }
          });

        const cookie = await cookies();

        cookie.set(name, value, {
          httpOnly: options.httponly === true,
          secure: options.secure === true,
          sameSite: (options.samesite as 'lax' | 'strict' | 'none') || 'lax',
          path: typeof options.path === 'string' ? options.path : '/',
          maxAge: options['max-age'] ? parseInt(options['max-age'] as string) : undefined,
          expires: options.expires ? new Date(options.expires as string) : undefined,
        });
      }
    }
  }

  return result;
}
