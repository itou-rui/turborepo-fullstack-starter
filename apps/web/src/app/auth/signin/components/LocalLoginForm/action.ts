'use server';

import { login } from '@/lib';
import { redirect } from 'next/navigation';

export async function handleSubmit(_: string, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const result = await login.local(email, password);
  if (result.ok === false) {
    return result.message;
  }
  redirect('/dashboard');
}
