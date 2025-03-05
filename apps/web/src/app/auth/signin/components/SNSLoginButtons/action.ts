'use server';

// import { redirect } from 'next/navigation';
import { type ProviderType } from '@workspace/constants';

export async function handleAuth(provider: ProviderType) {
  console.log(`Logging in with ${provider}`);
}
