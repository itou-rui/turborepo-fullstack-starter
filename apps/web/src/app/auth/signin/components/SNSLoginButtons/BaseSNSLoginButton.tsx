'use client';

import { Button } from '@workspace/ui/components/button';
import { ProviderType } from '@workspace/constants';
import { login } from '@/lib';

interface BaseProviderButtonProps {
  children: React.ReactNode;
  provider: ProviderType;
}

export const BaseSNSLoginButton = ({ children, provider }: BaseProviderButtonProps) => {
  const handleClick = async () => login.social(provider);
  return (
    <Button variant='outline' className='w-full' onClick={handleClick}>
      {children}
      Login with {provider.charAt(0).toUpperCase() + provider.slice(1).toLowerCase()}
    </Button>
  );
};
