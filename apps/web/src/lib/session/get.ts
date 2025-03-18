'use server';

import { cookies } from 'next/headers';
import { type LocalAuthProfile } from '@workspace/types';
import * as fetcher from '../fetcher';

export async function get<T = LocalAuthProfile>() {
  const cookieStore = await cookies();
  const token = cookieStore.get('connect.sid');
  if (!token) return null;

  const result = await fetcher.get<T | null>('/api/auth/me', {
    headers: {
      Cookie: `connect.sid=${token.value}`,
    },
    next: { revalidate: 5 },
  });

  if (!result.ok) return null;
  return result.data;
}
