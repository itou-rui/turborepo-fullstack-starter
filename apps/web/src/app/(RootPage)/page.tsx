import Image from 'next/image';
import { SparklesText } from '@/components/Text';
import { Feature, BentoGrid, BentoCard } from '@/components/Card';
import {
  BellIcon,
  CalendarIcon,
  GlobeIcon,
  Code,
  Cog,
  PanelTop,
  GitForkIcon,
  PackageIcon,
  DatabaseIcon,
} from '@/components/Icons';

const bentoFeatures = [
  {
    Icon: GitForkIcon,
    name: 'Monorepo Structure',
    description: 'All your packages and apps in one place, managed with Turborepo for optimal development workflow.',
    href: '#',
    cta: 'Read more',
    background: (
      <Image src='/turborepo.svg' width={200} height={200} className='absolute -right-20 -top-20 opacity-60' alt='Turborepo' />
    ),
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
  },
  {
    Icon: PackageIcon,
    name: 'Shared Packages',
    description: 'Common UI components, configurations, and utilities shared across your applications.',
    href: '#',
    cta: 'Explore packages',
    background: (
      <Image src='/package.svg' width={200} height={200} className='absolute -right-20 -top-20 opacity-60' alt='Packages' />
    ),
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: DatabaseIcon,
    name: 'Full Stack Ready',
    description: 'NestJS backend with TypeORM, ready to connect with your Next.js frontend.',
    href: '#',
    cta: 'View setup',
    background: (
      <Image src='/stack.svg' width={200} height={200} className='absolute -right-20 -top-20 opacity-60' alt='Full Stack' />
    ),
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    Icon: CalendarIcon,
    name: 'Development Tools',
    description: 'ESLint, Prettier, Jest, and more preconfigured for optimal development.',
    href: '#',
    cta: 'View tools',
    background: <Image src='/tools.svg' width={200} height={200} className='absolute -right-20 -top-20 opacity-60' alt='Tools' />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    Icon: BellIcon,
    name: 'CI/CD Ready',
    description: 'GitHub Actions workflows and Docker configurations ready for deployment.',
    href: '#',
    cta: 'Learn more',
    background: <Image src='/cicd.svg' width={200} height={200} className='absolute -right-20 -top-20 opacity-60' alt='CI/CD' />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
  },
];

const cardFeatures = [
  {
    title: 'Next.js 14',
    description: 'Built with the latest Next.js features including App Router and Server Components.',
    icon: PanelTop,
  },
  {
    title: 'NestJS Backend',
    description: 'Enterprise-ready backend with TypeORM, OpenAPI, and more.',
    icon: Cog,
  },
  {
    title: 'TailwindCSS',
    description: 'Modern UI with shadcn/ui components and TailwindCSS.',
    icon: Code,
  },
  {
    title: 'Cloud Ready',
    description: 'Deployment configurations for Google Cloud Run and other platforms.',
    icon: GlobeIcon,
  },
];

export default async function RootPage() {
  return (
    <main className='min-h-screen'>
      <section className='flex flex-col items-center justify-center space-y-8 pt-24 pb-16 px-4'>
        <SparklesText text='Turborepo Starter Kit' className='text-5xl sm:text-7xl mb-4 px-4' />
        <p className='text-muted-foreground text-center max-w-lg text-lg sm:text-xl'>
          Production-ready full-stack monorepo starter with Next.js, NestJS, and TailwindCSS. Built for modern web development.
        </p>
        <div className='flex gap-4'>
          <a
            href='https://github.com/itou-rui/turborepo-fullstack-starter'
            className='rounded-full px-6 py-3 bg-primary text-primary-foreground hover:opacity-90 transition'
          >
            Get Started
          </a>
          <a href='#' className='rounded-full px-6 py-3 bg-secondary text-secondary-foreground hover:opacity-90 transition'>
            Documentation
          </a>
        </div>
      </section>

      <section className='mx-auto mb-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 mx-auto'>
          {cardFeatures.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </section>

      <section className='mx-auto'>
        <BentoGrid className='lg:grid-rows-3'>
          {bentoFeatures.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </section>
    </main>
  );
}
