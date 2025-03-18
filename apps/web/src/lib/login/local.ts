'use server';

import type { RESTPostAPIAuthLocalLoginJSON } from '@workspace/types';
import * as fetcher from '../fetcher';
import * as session from '../session';

export async function local(email: string, password: string) {
  const result = await fetcher.post<RESTPostAPIAuthLocalLoginJSON>('/api/auth/login', {
    email,
    password,
  });

  if (result.ok === true) {
    const setCookie = result.headers.getSetCookie();
    if (setCookie && setCookie.length > 0) {
      await session.set(setCookie[0]);
    }
  }

  return result;
}
