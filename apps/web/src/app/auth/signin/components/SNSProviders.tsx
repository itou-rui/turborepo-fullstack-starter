'use client';

import { Button } from '@workspace/ui/components/button';
import { ProviderType } from '@workspace/constants';

interface BaseProviderButtonPropsimport {
  children: React.ReactNode;
  provider: ProviderType;
}

export const BaseProviderButton = ({ children, provider }: BaseProviderButtonPropsimport) => {
  return (
    <Button variant='outline' className='w-full'>
      {children}
      Login with {provider.charAt(0).toUpperCase() + provider.slice(1).toLowerCase()}
    </Button>
  );
};

export const GoogleButton = () => {
  return (
    <BaseProviderButton provider={ProviderType.Google}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path
          d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
          fill='currentColor'
        />
      </svg>
    </BaseProviderButton>
  );
};

export const DiscordButton = () => {
  return (
    <BaseProviderButton provider={ProviderType.Discord}>
      <svg xmlns='http://www.w3.org/2000/svg' enableBackground='new 0 0 100 100' viewBox='0 0 100 100' id='discord'>
        <path
          id='Layer_2'
          d='M85.778,24.561c-11.641-8.71-22.793-8.466-22.793-8.466s-1.14,1.302-1.14,1.302c13.839,4.152,20.27,10.257,20.27,10.257
		c-19.799-10.901-45.019-10.823-65.613,0c0,0,6.675-6.431,21.328-10.583c0,0-0.814-0.977-0.814-0.977s-11.071-0.244-22.793,8.466
		c0,0-11.722,21.084-11.722,47.052c0,0,6.838,11.722,24.829,12.292c0,0,3.012-3.582,5.454-6.675
		c-10.339-3.093-14.246-9.524-14.246-9.524c6.495,4.064,13.063,6.608,21.247,8.222c13.316,2.741,29.879-0.077,42.249-8.222
		c0,0-4.07,6.594-14.734,9.606c2.442,3.012,5.373,6.512,5.373,6.512C90.662,83.254,97.5,71.532,97.5,71.613
		C97.5,45.645,85.778,24.561,85.778,24.561z M34.818,64.043c-4.559,0-8.303-3.989-8.303-8.955c0.333-11.892,16.357-11.855,16.607,0
		C43.121,60.054,39.458,64.043,34.818,64.043z M64.531,64.043c-4.559,0-8.303-3.989-8.303-8.955c0.366-11.869,16.19-11.874,16.607,0
		C72.834,60.054,69.171,64.043,64.531,64.043z'
          fill='currentColor'
        />
      </svg>
    </BaseProviderButton>
  );
};
