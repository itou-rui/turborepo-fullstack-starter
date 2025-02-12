import { type Metadata } from 'next';
import { type LayoutProps } from '@/types';
import { TurbelightNavBar } from '@/components/Navbar';
import { Home, User, Briefcase, FileText } from '@/components/Icons';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export const metadata: Metadata = {
  title: 'Turborepo Fullstack Starter',
  description: 'Turborepo Fullstack Starter Next.js App',
};

export default async function RootPageLayout(props: LayoutProps) {
  return (
    <div className='relative min-h-screen bg-gradient-to-b from-zinc-900 dark:from-zinc-900 from-zinc-50 dark:to-black to-white'>
      <TurbelightNavBar
        className='fixed'
        items={[
          { name: 'Home', url: '#', icon: Home },
          { name: 'About', url: '#', icon: User },
          { name: 'Projects', url: '#', icon: Briefcase },
          { name: 'Resume', url: '#', icon: FileText },
        ]}
      />
      <div className='flex flex-col min-h-screen'>
        <main className='flex-1 container mx-auto md:px-4 sm:pt-24 pb-32'>{props.children}</main>
      </div>
    </div>
  );
}
