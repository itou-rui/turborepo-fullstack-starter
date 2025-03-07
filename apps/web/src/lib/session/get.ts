'use server';

import { headers } from 'next/headers';
import { type RESTGetAPISessionResult } from '@workspace/types';
import * as fetcher from '../fetcher';

export async function get<T>() {
  const headerList = await headers();

  const result = await fetcher.get<RESTGetAPISessionResult<T> | null>('/api/auth/session', {
    headers: new Headers(headerList),
    credentials: 'include',
  });

  if (result.ok) {
    return result.data;
  }

  return null;
}
