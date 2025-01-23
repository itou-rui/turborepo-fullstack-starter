'use client';

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

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
