'use client';

import { type ThemeProviderProps } from 'next-themes';
import dynamic from 'next/dynamic';

const NextThemesProvider = dynamic(() => import('next-themes').then((e) => e.ThemeProvider), {
  ssr: true,
});

export const ThemeProvider = (props: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute={props.attribute || 'class'}
      defaultTheme={props.defaultTheme || 'system'}
      enableSystem={props.enableSystem || true}
      disableTransitionOnChange={props.disableTransitionOnChange || true}
      enableColorScheme={props.enableColorScheme || true}
    >
      {props.children}
    </NextThemesProvider>
  );
};
