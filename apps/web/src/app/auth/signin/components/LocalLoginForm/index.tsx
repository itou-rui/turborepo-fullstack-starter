'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { handleSubmit } from './action';

export function LocalLoginForm() {
  const [message, signIn] = useActionState(handleSubmit, '');
  const { pending } = useFormStatus();

  return (
    <form action={signIn}>
      <div className='grid gap-6'>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='m@example.com' name='email' required />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
              <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
                Forgot your password?
              </a>
            </div>
            <Input id='password' type='password' name='password' required />
          </div>
          <p className='text-sm text-red-500'>{message}</p>
          <Button type='submit' disabled={pending} className='w-full'>
            {pending ? 'in process...' : 'Login'}
          </Button>
        </div>
        <div className='text-center text-sm'>
          Don&apos;t have an account?{' '}
          <a href='#' className='underline underline-offset-4'>
            Sign up
          </a>
        </div>
      </div>
    </form>
  );
}
