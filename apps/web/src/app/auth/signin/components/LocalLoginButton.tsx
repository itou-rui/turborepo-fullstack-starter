'use client';

import { Button } from '@workspace/ui/components/button';
import { useFormStatus } from 'react-dom';

export function LocalLoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending} className='w-full'>
      {pending ? 'in process...' : 'Login'}
    </Button>
  );
}
