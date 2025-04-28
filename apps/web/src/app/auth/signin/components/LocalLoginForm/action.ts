'use server';

import { redirect } from 'next/navigation';
import { localLogin } from '@/lib/internal/login';

export async function handleSubmit(_: string, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const result = await localLogin(email, password);
  if (result.ok === false) {
    return result.message;
  }
  redirect('/dashboard');
}
