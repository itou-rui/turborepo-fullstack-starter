import { type Metadata } from 'next';
import { type LayoutProps } from '@/types';
import { TurbelightNavBar } from '@/components/Navbar';
import { SimpleFooter } from '@/components/Footer';
import { navbarDatail, footerDatail } from './details';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export const metadata: Metadata = {
  title: 'Turborepo Fullstack Starter',
  description: 'Turborepo Fullstack Starter Next.js App',
};

export default async function RootPageLayout(props: LayoutProps) {
  return (
    <div className='relative min-h-screen bg-gradient-to-b from-white dark:from-black to-white dark:to-black'>
      <TurbelightNavBar {...navbarDatail} />
      <div className='flex flex-col min-h-screen'>
        <main className='flex-1 container mx-auto md:px-4 sm:pt-24 pb-32'>{props.children}</main>
      </div>
      <SimpleFooter {...footerDatail} />
    </div>
  );
}
