'use server';

import { headers } from 'next/headers';
import { type APISession } from '@workspace/types';
import * as fetcher from '../fetcher';

export async function get(): Promise<APISession | null> {
  const headerList = await headers();

  const result = await fetcher.get<APISession>('/api/auth/session', {
    headers: new Headers(headerList),
    credentials: 'include',
  });

  if (result.ok) {
    return result.data;
  }

  return null;
}
