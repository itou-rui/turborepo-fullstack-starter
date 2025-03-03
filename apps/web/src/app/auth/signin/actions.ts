'use server';

import { login } from '@/lib';
import { redirect } from 'next/navigation';

/* eslint typescript-eslint/no-explicit-any: off */
export async function handleSubmit(prev: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const result = await login.local(email, password);
  if (result.ok === false) {
    return {
      message: result.message,
      status: result.status,
    };
  }
  redirect('/dashboard');
  return {};
}
