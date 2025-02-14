import { Geist, Geist_Mono } from 'next/font/google';
import { type JSX } from 'react';
import { Toaster } from '@workspace/ui/components/sonner';
import { type LayoutProps } from '@/types';
import { ReduxProvider, ThemeProvider } from '@/components/Providers';
import '../../styles/globals.css';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

/**
 * The root layout component for the application.
 * @param {LayoutProps} props - The layout properties.
 * @returns {JSX.Element} - The root layout component.
 */
export default async function RootLayout(props: LayoutProps): Promise<JSX.Element> {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ReduxProvider>
            {props.children}
            <Toaster />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
