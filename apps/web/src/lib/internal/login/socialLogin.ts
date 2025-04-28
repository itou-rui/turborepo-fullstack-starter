'use server';

import { redirect } from 'next/navigation';
import { type ProviderType } from '@workspace/constants';

export async function socialLogin(provider: ProviderType) {
  redirect(process.env.BASE_URL + `/api/internal/auth/${provider}/login`);
}
