'use server';

import type { RESTPostAPIAuthLocalLoginJSON } from '@workspace/types';
import { fetcher } from '../../fetcher';
import { setCookie } from '../session';

export async function localLogin(email: string, password: string) {
  const result = await fetcher.post<RESTPostAPIAuthLocalLoginJSON>('/api/internal/auth/local/login', {
    email,
    password,
  });

  if (result.ok === true) {
    const setCookieArray = result.headers.getSetCookie();
    if (setCookieArray && setCookie.length > 0) {
      await setCookie(setCookieArray[0]);
    }
  }

  return result;
}
