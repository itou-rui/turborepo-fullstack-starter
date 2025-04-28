'use server';

import { cookies } from 'next/headers';

export async function setCookie(setCookieString: string) {
  const match = setCookieString.match(/^([^=]+)=([^;]+)/);
  if (!match) throw new Error('Invalid Set-Cookie header');

  const [, name, value] = match;

  const options: { [key: string]: string | boolean | number } = {};
  setCookieString
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
