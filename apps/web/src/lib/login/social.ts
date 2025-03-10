'use server';

import { redirect } from 'next/navigation';
import { type ProviderType } from '@workspace/constants';

export async function social(provider: ProviderType) {
  redirect(process.env.BASE_URL + `/api/auth/${provider}/login`);
}
